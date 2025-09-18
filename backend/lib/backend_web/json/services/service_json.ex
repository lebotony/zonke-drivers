defmodule BackendWeb.Services.ServiceJSON do
  def index(%{services: services, pagination: pagination}) do
    %{
      pagination: %{
        after: pagination.after,
        total: pagination.total_count
      },
      data: for(service <- services, do: show(%{service: service}))
    }
  end

  def index(%{services: services}) do
    for(service <- services, do: show(%{service: service}))
  end

  def show(%{service: service}) do
    Map.take(service, [
      :id,
      :name,
      :description,
      :location,
      :location_options,
      :draft,
      :paused_at,
      :rate,
      :duration,
      :price_range,
      :price_fixed,
      :rating,
      :booking_count,
      :inserted_at,
      :updated_at
    ])
    |> Map.merge(%{rating: (:rand.uniform(39) + 10) / 10})
  end
end
