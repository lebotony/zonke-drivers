defmodule Backend.Services.Services do
  alias Backend.Repo
  alias Backend.Services.{Service, Policy, Queries.ServiceBy}

  import Ecto.Query

  defdelegate authorize(action, params, session), to: Policy

  def create(params, %{user_id: user_id}) do
    params =
      params
      |> Map.put(:user_id, user_id)
      |> Map.put(:draft, true)

    %Service{}
    |> Service.changeset(params)
    |> Repo.insert()
  end

  def update(%Service{} = service, params) do
    service
    |> Service.changeset(params)
    |> Repo.update()
  end

  def delete(%Service{id: id} = service) do
    # check if there's pending accepted booking
    # allow delete if 0 otherwise reject delete
    Repo.delete(service)
  end

  def get_service(id) do
    Repo.get_by(Service, id: id)
    |> format_service()
  end

  def get_service(id, :public) do
    ServiceBy.base_query()
    |> ServiceBy.by_id(id)
    |> ServiceBy.by_active_status()
    |> Repo.one()
    |> format_service()
  end

  def get_services(params) do
    ServiceBy.base_query()
    |> ServiceBy.by_business_profile(params.business_profile_id)
    |> Repo.all()
  end

  def get_services(:public, params) do
    %{entries: data, metadata: pagination} =
      ServiceBy.base_query()
      |> ServiceBy.by_active_status()
      |> build_search(params)
      |> build_sort(params)
      |> Repo.cursor_paginate(
        fetch_cursor_value_fun: fn
          # Here we build the rank_value for each returned row
          schema, {:rank_value, _} ->
            schema.rank_value

          schema, field ->
            Paginator.default_fetch_cursor_value(schema, field)
        end,
        cursor_fields: [
          {:rank_value, fn -> dynamic([s], s.rank_value) end},
          :id
        ]
      )

    {:ok, %{data: data, pagination: pagination}}
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

  defp format_service(%Service{} = service), do: {:ok, service}
  defp format_service(nil), do: {:error, :not_found}
end
