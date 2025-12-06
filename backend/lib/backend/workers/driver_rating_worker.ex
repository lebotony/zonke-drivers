defmodule Backend.Workers.DriverRatingWorker do
  use Oban.Worker, queue: :default, max_attempts: 1

  alias Backend.Repo
  alias Backend.Drivers.{Driver, Rating}

  import Ecto.Query

  @impl Oban.Worker
  def perform(_job) do
    drivers = Repo.all(Driver)

    Enum.each(drivers, fn driver ->
      result = Rating.compute_driver_rating(driver.id)

      query = from(d in Driver, where: d.id == ^driver.id)
      Repo.update_all(query, set: [rating: result.driver_rating])
    end)

    :ok
  end
end
