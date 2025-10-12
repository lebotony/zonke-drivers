defmodule Backend.Drivers.Drivers do
  alias Backend.{Repo, PaginateHelper}
  alias Backend.Drivers.{Driver, Policy, Queries.DriverBy}
  alias Backend.Vehicles.VehicleDriver

  import Ecto.Query

  defdelegate authorize(action, params, session), to: Policy

  def create(params, %{user_id: user_id}) do
    params =
      params
      |> Map.put(:user_id, user_id)
      |> Map.put(:draft, true)

    %Driver{}
    |> Driver.changeset(params)
    |> Repo.insert()
  end

  def update(%Driver{} = driver, params) do
    driver
    |> Driver.changeset(params)
    |> Repo.update()
  end

  def delete(%Driver{id: id} = driver) do
    # check if there's pending accepted booking
    # allow delete if 0 otherwise reject delete
    Repo.delete(driver)
  end

  def get_driver(id) do
    Repo.get_by(Driver, id: id)
    |> format_driver()
  end

  def get_driver(id, :public) do
    DriverBy.base_query()
    |> DriverBy.by_id(id)
    |> DriverBy.by_active_status()
    |> add_extra_fields()
    |> Repo.one()
    |> format_driver()
  end

  def get_drivers(params) do
    data =
      DriverBy.base_query()
      |> DriverBy.by_business_profile(params.business_profile_id)
      |> add_extra_fields()
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  def get_drivers(params, :public) do
    data =
      DriverBy.base_query()
      |> DriverBy.by_active_status()
      |> add_extra_fields()
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

      {:age_range, %{min: min, max: max}}, query ->
        where(query, [driver: d], d.age >= ^min and d.age <= ^max)

      {:experience_range, %{min: min, max: max}}, query ->
        where(query, [driver: d], d.experience >= ^min and d.experience <= ^max)

      {:rating_range, %{min: min, max: max}}, query ->
        where(query, [driver: d], d.rating >= ^min and d.rating <= ^max)

      {:platforms, val}, query when is_list(val) ->
        where(query, [driver: d], fragment("? && ?", d.platforms, ^val))

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

  def add_extra_fields(query) do
    subquery =
      from(vd in VehicleDriver,
        where: vd.driver_id == parent_as(:driver).id,
        select: %{
          previous_vehicles: count(vd.id),
          total_accidents: coalesce(sum(vd.accidents), 0)
        }
      )

    query
    |> join(:inner, [driver: d], u in assoc(d, :user), as: :user)
    |> join(:left_lateral, [driver: d], vd_stats in subquery(subquery), as: :vd_stats)
    |> select_merge([driver: d, user: u, vd_stats: vd_stats], %{
      d
      | email: u.email,
        first_name: u.first_name,
        last_name: u.last_name,
        username: u.username,
        location: u.location,
        previous_vehicles: vd_stats.previous_vehicles,
        total_accidents: vd_stats.total_accidents
    })
  end

  defp format_driver(%Driver{} = driver), do: {:ok, driver}
  defp format_driver(nil), do: {:error, :not_found}
end
