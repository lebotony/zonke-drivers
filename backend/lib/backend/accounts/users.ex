defmodule Backend.Accounts.Users do
  alias Backend.Repo
  alias Backend.Accounts.User
  alias Backend.Guardian
  alias Backend.Assets.{Asset, Assets}
  alias Backend.EmptyFieldsHelper

  import Ecto.Query

  def get_user_by(opts \\ []) when is_list(opts) do
    by_opts = Keyword.validate!(opts, [:username, :id])

    case Repo.get_by(User, by_opts) do
      nil ->
        {:error, :not_found}

      user ->
        {:ok, Repo.preload(user, :asset)}
    end
  end

  def update(%User{} = user, params) do
    IO.inspect(params, label: "Update User Params")

    case user |> User.changeset(params) |> Repo.update() do
      {:ok, user} -> {:ok, Repo.preload(user, :asset)}
      {:error, error} -> {:error, error}
    end
  end

  def update_user_asset(params, %{user_id: user_id}) do
    case get_user_asset(user_id) do
      %Asset{} = asset ->
        Assets.update_asset_with_file(asset, params)

      nil ->
        Map.put_new(params, :user_id, user_id)
        |> Assets.upload_and_save()
    end
  end

  def get_user_asset(user_id) do
    from(a in Asset,
      where: a.user_id == ^user_id
    )
    |> Repo.one()
  end
end
