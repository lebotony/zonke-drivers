defmodule Backend.Accounts.PushTokens do
  alias Backend.Repo
  alias Backend.Accounts.PushToken
  import Ecto.Query

  def upsert(params) do
    case Repo.get_by(PushToken, expo_push_token: params.expo_push_token) do
      nil ->
        %PushToken{}
        |> PushToken.changeset(params)
        |> Repo.insert()

      existing_token ->
        existing_token
        |> PushToken.changeset(params)
        |> Repo.update()
    end
  end

  def get_user_tokens(user_id) do
    from(pt in PushToken,
      where: pt.user_id == ^user_id and pt.active == true
    )
    |> Repo.all()
  end

  def mark_token_inactive(expo_push_token) do
    from(pt in PushToken,
      where: pt.expo_push_token == ^expo_push_token
    )
    |> Repo.update_all(set: [active: false])
  end

  def delete_token(expo_push_token) do
    case Repo.get_by(PushToken, expo_push_token: expo_push_token) do
      nil -> {:error, :not_found}
      token -> Repo.delete(token)
    end
  end
end
