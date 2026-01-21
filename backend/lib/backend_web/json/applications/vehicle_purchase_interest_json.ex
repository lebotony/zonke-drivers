defmodule BackendWeb.Applications.VehiclePurchaseInterestJSON do
  alias BackendWeb.UserJSON

  def index(%{interests: interests, paginate: paginate}) do
    %{data: Enum.map(interests, &data/1), paginate: paginate}
  end

  def show(%{interest: interest}) do
    data(interest)
  end

  defp data(interest) do
    user =
      if Map.has_key?(interest, :user) and Ecto.assoc_loaded?(interest.user) do
        UserJSON.show(%{user: interest.user})
      else
        nil
      end

    %{
      id: interest.id,
      vehicle_id: interest.vehicle_id,
      user_id: interest.user_id,
      seen: interest.seen,
      user: user,
      inserted_at: interest.inserted_at,
      updated_at: interest.updated_at
    }
  end
end
