defmodule Backend.Accounts.BusinessProfile.Policy do
  @behaviour Bodyguard.Policy

  alias Backend.Accounts.Memberships

  @actions [:show]

  def authorize(action, %{user_id: user_id}, %{user_id: user_id}) when action in @actions, do: :ok

  def authorize(action, %{id: business_profile_id}, %{user_id: user_id}) when action in @actions,
    do: authorize_member(business_profile_id, user_id)

  def authorize(:show_public, %{active: true}, _session), do: :ok

  def authorize(_, _, _), do: :error

  defp authorize_member(business_profile_id, user_id) do
    case Memberships.is_member?(business_profile_id, user_id) do
      {true, _} -> :ok
      _ -> :error
    end
  end
end
