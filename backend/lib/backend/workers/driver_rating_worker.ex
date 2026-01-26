defmodule Backend.Workers.DriverRatingWorker do
  use Oban.Worker, queue: :default, max_attempts: 3

  alias Backend.Repo
  alias Backend.Drivers.{Driver, Rating}

  import Ecto.Query
  require Logger

  @batch_size 100

  @impl Oban.Worker
  def perform(_job) do
    Logger.info("Starting driver rating computation job")

    {total_processed, total_updated} =
      Repo.transaction(
        fn ->
          Driver
          |> select([:id])
          |> Repo.stream(max_rows: @batch_size)
          |> Stream.chunk_every(@batch_size)
          |> Enum.reduce({0, 0}, fn batch, {processed_acc, updated_acc} ->
            {batch_processed, batch_updated} = process_batch(batch)
            {processed_acc + batch_processed, updated_acc + batch_updated}
          end)
        end,
        timeout: :infinity
      )
      |> case do
        {:ok, result} -> result
        {:error, reason} -> raise "Transaction failed: #{inspect(reason)}"
      end

    Logger.info(
      "Driver rating computation completed. Processed: #{total_processed}, Updated: #{total_updated}"
    )

    {:ok, %{processed: total_processed, updated: total_updated}}
  end

  defp process_batch(driver_batch) do
    updates =
      driver_batch
      |> Enum.map(fn driver ->
        result = Rating.compute_driver_rating(driver.id)
        {driver.id, result.driver_rating}
      end)
      |> Enum.reject(fn {_id, rating} -> is_nil(rating) end)

    updated_count =
      Enum.reduce(updates, 0, fn {driver_id, rating}, acc ->
        query = from(d in Driver, where: d.id == ^driver_id)

        case Repo.update_all(query, set: [rating: rating]) do
          {1, _} -> acc + 1
          _ -> acc
        end
      end)

    {length(driver_batch), updated_count}
  end
end
