defmodule Backend.Accounts.Users do
  alias Backend.Repo
  alias Backend.Accounts.User
  alias Backend.Guardian

  def get_user_by(opts \\ []) when is_list(opts) do
    by_opts = Keyword.validate!(opts, [:email, :id])

    case Repo.get_by(User, by_opts) do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end
end
