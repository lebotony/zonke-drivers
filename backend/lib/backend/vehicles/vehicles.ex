defmodule Backend.Vehicles.Vehicles do
  alias Backend.Repo
  alias Backend.Vehicles.{Vehicle, Queries.VehicleBy}

  import Ecto.Query

  # defdelegate authorize(action, params, session), to: Policy

  def create(params, %{user_id: user_id}) do
    params = Map.put(params, :user_id, user_id)

    %Vehicle{}
    |> Vehicle.changeset(params)
    |> Repo.insert()
  end

  def update(%Vehicle{} = vehicle, params) do
    vehicle
    |> Vehicle.changeset(params)
    |> Repo.update()
  end

  def delete(%Vehicle{id: id} = vehicle) do
    Repo.delete(vehicle)
  end

  def get_vehicle(id) do
    Repo.get_by(Vehicle, id: id)
    |> format_vehicle()
  end

  def get_vehicle(id, :public) do
    VehicleBy.base_query()
    |> VehicleBy.by_id(id)
    |> VehicleBy.by_active_status()
    |> Repo.one()
    |> format_vehicle()
  end

  def get_vehicles(params) do
    data =
      VehicleBy.base_query()
      |> VehicleBy.by_business_profile(params.business_profile_id)
      |> Repo.all()
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  def get_vehicles(:public, params) do
    data =
      VehicleBy.base_query()
      |> VehicleBy.by_active_status()
      |> build_search(params)
      |> build_sort(params)
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  defp build_search(query, params) do
    filters = Map.get(params, :filters, %{})

    Enum.reduce(filters, query, fn
      {:search_term, value}, query when is_binary(value) and value != "" ->
        query
        |> select_merge([s], %{
          rank_value:
            fragment(
              "ts_rank(?, websearch_to_tsquery(?)) AS rank_value",
              s.searchable_document,
              ^filters.search_term
            )
        })
        |> where(
          [s],
          fragment("? @@ websearch_to_tsquery(?)", s.searchable_document, ^value)
        )

      _, query ->
        query
    end)
  end

  defp build_sort(query, params) do
    order_by_param = Map.get(params, :order_by, %{by: :relevance, direction: :desc})
    criteria = Map.get(order_by_param, :by)
    direction = Map.get(order_by_param, :direction)

    search_term = get_in(params, [:filters, :search_term])

    case criteria do
      :relevance when is_binary(search_term) and search_term != "" ->
        order_by(query, [s], [{^direction, fragment("rank_value")}, {:asc, s.id}])

      _ ->
        query
    end
  end

  defp format_vehicle(%Vehicle{} = vehicle), do: {:ok, vehicle}
  defp format_vehicle(nil), do: {:error, :not_found}
end
