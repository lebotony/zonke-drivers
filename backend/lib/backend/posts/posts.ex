defmodule Backend.Posts.Posts do
  alias Backend.Assets.Assets
  alias Backend.Posts.Post
  alias Ecto.Multi
  alias Backend.Repo

  def create(params) do
    post_params = Map.delete(params, :asset)

    Multi.new()
    |> Multi.insert(
      :post,
      Post.changeset(%Post{}, post_params)
    )
    |> Multi.run(:asset, fn _repo, %{post: post} ->
        asset_params =
          params
          |> Map.get(:asset, %{})
          |> Map.put(:post_id, post.id)

        Assets.upload_and_save(asset_params)
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{post: post}} ->
        {:ok, post}

      {:error, step, reason, changes_so_far} ->
        {:error, step, reason}
    end
  end
end
