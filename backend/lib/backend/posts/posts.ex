defmodule Backend.Posts.Posts do
  alias Backend.Assets.Assets
  alias Backend.Posts.Post

  def create(params, session) do
    Multi.new()
    |> Multi.run(:asset, fn _repo, _changes ->
        Assets.upload_and_save(params.asset)
    end)
    |> Multi.insert(
      :post,
      Post.changeset(%Post{}, params)
    )
    |> Repo.transaction()
    |> case do
      {:ok, result} ->
        {:ok, result}

      {:error, step, reason, changes_so_far} ->
        {:error, step, reason, changes_so_far}
    end
  end
end
