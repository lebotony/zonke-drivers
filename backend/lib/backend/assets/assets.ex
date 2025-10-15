defmodule Backend.Assets.Assets do
  alias Backend.Repo
  alias Backend.Assets.Asset
  alias ExAws.S3
  alias Ecto.Multi

  @bucket "zonke-drivers-bucket"
  @expires_in 604000

  def upload_and_save(%{file: %Plug.Upload{path: path, filename: filename}} = params) do
    Multi.new()
    |> Multi.run(:s3_upload, fn _repo, _changes ->
      case put_object(path, filename) do
        {:ok, resp} -> {:ok, resp}
        {:error, reason} -> {:error, {:ex_aws_s3_upload_failed, reason}}
      end
    end)
    # |> Multi.on_rollback(:s3_upload_cleanup, fn _repo, %{s3_upload: s3_upload}, _error ->
    #   if s3_upload do
    #     case delete_object(s3_upload) do
    #       {:ok, _} -> :ok
    #       {:error, reason} -> Logger.error("Failed to delete S3 file on rollback: #{inspect(reason)}")
    #     end
    #   end
    #   :ok
    # end)
    |> Multi.run(:asset, fn _repo, _changes ->
      with {:ok, url} <- presigned_url(filename) do
        params
        |> Map.merge(%{url: url})
        |> Map.delete(:file)
        |> create_asset()
      else
        {:error, reason} -> {:error, {:presigned_url_failed, reason}}
      end
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{asset: asset}} ->
        {:ok, asset}

      {:error, :s3_upload, {:error, reason}, _changes} ->
        {:error, "Failed to upload file: #{inspect(reason)}"}

      {:error, :asset, {:error, reason}, _changes} ->
        {:error, "Failed to save file record: #{inspect(reason)}"}
    end
  end

  def create_asset(params) do
    %Asset{}
    |> Asset.changeset(params)
    |> Repo.insert()
  end

  def put_object(file_path, filename) do
    body = File.read!(file_path)

    ExAws.S3.put_object(@bucket, filename, body)
    |> ExAws.request(config: s3_config())
  end

  def delete_object(filename) do
    S3.delete_object(@bucket, filename)
    |> ExAws.request()
  end

  def presigned_url(filename) do
    case S3.presigned_url(s3_config(), :get, @bucket, filename, expires_in: @expires_in) do
      {:ok, url} -> {:ok, url}
      {:error, reason} -> {:error, reason}
    end
  end

  def s3_config() do
    if System.get_env("MIX_ENV") == "dev" do
      ExAws.Config.new(:s3,
        scheme: "http://",
        host: "localhost",
        port: 4566
      )
    else
      ExAws.Config.new(:s3)
    end
  end

  def ensure_bucket_exists() do
    case ExAws.S3.head_bucket(@bucket) |> ExAws.request() do
      {:ok, _} ->
        IO.puts("Bucket #{@bucket} already exists")
        :ok

      {:error, {:http_error, 404, _}} ->
        IO.puts("Bucket #{@bucket} not found — creating it now")
        ExAws.S3.put_bucket(@bucket, "us-east-1") |> ExAws.request()

      {:error, reason} ->
        IO.inspect(reason, label: "Unexpected S3 error when creating bucket")
    end
  end
end
