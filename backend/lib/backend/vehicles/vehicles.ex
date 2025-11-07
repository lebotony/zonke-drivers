defmodule Backend.Vehicles.Vehicles do
  alias Backend.Accounts.{BusinessProfiles, User, BusinessProfile}
  alias Backend.{Repo, PaginateHelper}
  alias Backend.Vehicles.{Vehicle, Payment, VehicleDriver}
  alias Backend.Vehicles.Queries.{VehicleDriverBy, VehicleBy}
  alias Backend.Applications.VehicleApplication
  alias Backend.Reviews.Review
  alias Backend.Assets.{Assets, Asset}
  alias Backend.Drivers.{Driver, Drivers}
  alias Ecto.Multi

  import Ecto.Query

  # defdelegate authorize(action, params, session), to: Policy

  def create(params, %{user_id: user_id}) do
    decoded_params =
      Map.update(params, :price_fixed, %{}, fn val ->
        if is_binary(val), do: Jason.decode!(val), else: val
      end)

    vehicle_params =
      decoded_params
      |> Map.delete(:asset)
      |> Map.put(:user_id, user_id)

    Multi.new()
    |> Multi.insert(
      :vehicle,
      Vehicle.changeset(%Vehicle{}, vehicle_params)
    )
    |> Multi.run(:asset, fn _repo, %{vehicle: vehicle} ->
      asset_params =
        params
        |> Map.get(:asset, %{})
        |> Map.put(:vehicle_id, vehicle.id)

      Assets.upload_and_save(asset_params)
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{vehicle: vehicle}} ->
        {:ok, Repo.preload(vehicle, :asset)}

      {:error, step, reason, changes_so_far} ->
        {:error, step, reason}
    end
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

  def get_vehicles(params, %{user_id: user_id}) do
    driver_query =
      from d in Driver,
        join: u in assoc(d, :user),
        select: %{
          id: d.id,
          first_name: u.first_name,
          last_name: u.last_name
        }

    data =
      VehicleBy.base_query()
      |> VehicleBy.by_user(user_id)
      |> join(:left, [v], vd in VehicleDriver,
        on: v.id == vd.vehicle_id and vd.active == true
      )
      |> preload([
        :asset,
        vehicle_drivers: [:driver]
      ])
      |> preload(vehicle_drivers: [driver: ^driver_query])
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  def get_vehicles(params, :public) do
    data =
      VehicleBy.base_query()
      |> VehicleBy.by_active_status()
      |> join(:inner, [vehicle: v], u in assoc(v, :user), as: :user)
      |> select_merge([vehicle: v, user: u], %{
        v
        | user_id: u.id
      })
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

      {:brands, val}, query ->
        where(query, [vehicle: v], v.brand in ^val)

      {:types, val}, query ->
        where(query, [vehicle: v], v.type in ^val)

      {:fuel_types, val}, query ->
        where(query, [vehicle: v], v.fuel_type in ^val)

      {:price_range, [min, max]}, query ->
        min = String.to_integer(min)
        max = String.to_integer(max)

        where(
          query,
          [vehicle: v],
          fragment("CAST((?->>'value') AS DECIMAL)", v.price_fixed) >= ^min and
            fragment("CAST((?->>'value') AS DECIMAL)", v.price_fixed) <= ^max
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
