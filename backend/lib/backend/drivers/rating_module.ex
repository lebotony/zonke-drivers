defmodule Backend.Drivers.Rating do
  import Ecto.Query, warn: false
  alias Backend.Repo
  alias Backend.Vehicles.{VehicleDriver, Vehicle, Payment}

  @period_days 28
  @seconds_per_day 86400

  @doc """
  Compute the driver rating (per your multi-period rules).

  Returns:
    %{
      driver_id: id,
      vehicle_driver_ratings: [%{vehicle_driver_id: id, avg_rating: float, period_ratings: [...]}, ...],
      driver_rating: float  # average of vehicle_driver avg_ratings, rounded to 1 decimal
    }
  """
  def compute_driver_rating(driver_id) do
    # 1) load vehicle_drivers with vehicle
    vds =
      VehicleDriver
      |> where([vd], vd.driver_id == ^driver_id)
      |> join(:inner, [vd], v in assoc(vd, :vehicle))
      |> preload([vd, v], vehicle: v)
      |> Repo.all()

    vd_ids = Enum.map(vds, & &1.id)

    # 2) load payments for those vehicle_driver ids
    payments =
      if vd_ids == [],
        do: [],
        else:
          Payment
          |> where([p], p.vehicle_driver_id in ^vd_ids)
          |> select([p], %{
            id: p.id,
            vehicle_driver_id: p.vehicle_driver_id,
            inserted_at: p.inserted_at
          })
          |> Repo.all()

    payments_by_vd = Enum.group_by(payments, & &1.vehicle_driver_id)

    # 3) compute each vehicle_driver rating
    vd_results =
      Enum.map(vds, fn vd ->
        period_ratings = compute_period_ratings_for_vd(vd, Map.get(payments_by_vd, vd.id, []))

        avg =
          case period_ratings do
            [] -> nil
            ratings -> Enum.sum(ratings) / length(ratings)
          end

        %{vehicle_driver_id: vd.id, avg_rating: round1(avg), period_ratings: period_ratings}
      end)

    driver_rating =
      case vd_results do
        [] ->
          nil

        list ->
          # remove nil vehicle_driver avg_ratings
          filtered_list = Enum.reject(list, &is_nil(&1.avg_rating))

          case filtered_list do
            [] -> nil
            valid -> round1(Enum.sum(Enum.map(valid, & &1.avg_rating)) / length(valid))
          end
      end

    IO.inspect(vd_results, label: "RATING RATING RATING")

    %{
      driver_id: driver_id,
      vehicle_driver_ratings: vd_results,
      driver_rating: driver_rating
    }
  end

  defp compute_period_ratings_for_vd(vd, payments) do
    start_dt = vd.inserted_at

    end_dt =
      if vd.active == false and vd.inserted_at != vd.updated_at do
        vd.updated_at
      else
        NaiveDateTime.utc_now()
      end

    # total seconds driven (if negative or zero -> no periods)
    total_seconds = NaiveDateTime.diff(end_dt, start_dt)

    if total_seconds <= 0 do
      []
    else
      total_days = div(total_seconds, @seconds_per_day)

      # number of periods: full 28-day chunks plus one if remainder
      num_periods =
        if total_seconds < @seconds_per_day * @period_days,
          do: 1,
          else:
            div(total_days, @period_days) + if(rem(total_days, @period_days) > 0, do: 1, else: 0)

      0..(num_periods - 1)
      |> Enum.map(fn n ->
        period_start = NaiveDateTime.add(start_dt, n * @period_days * @seconds_per_day)
        candidate_end = NaiveDateTime.add(start_dt, (n + 1) * @period_days * @seconds_per_day)

        period_end =
          if NaiveDateTime.compare(candidate_end, end_dt) == :gt, do: end_dt, else: candidate_end

        # seconds and days in this period
        seconds_in_period = NaiveDateTime.diff(period_end, period_start)
        days_in_period = seconds_in_period / @seconds_per_day

        # payments made in this period (>= start, < end)
        payments_made =
          payments
          |> Enum.filter(fn p ->
            NaiveDateTime.compare(p.inserted_at, period_start) != :lt and
              NaiveDateTime.compare(p.inserted_at, period_end) == :lt
          end)
          |> length()

        # expected payments: floor( payments_per_month * (days_in_period / 28.0) )
        ppm = vd.vehicle.payments_per_month || 0
        value = ppm * (days_in_period / @period_days)

        expected =
          custom_round(value, ppm)
          |> max(0)
          |> trunc()

        # IO.inspect(total_days, label: "total_days total_days total_days")
        # IO.inspect(total_seconds, label: "total_seconds total_seconds total_seconds")
        # # IO.inspect(total_days, label: "total_days total_days total_days")
        # IO.inspect(ppm, label: "PPM PPM PPM")
        # IO.inspect(num_periods, label: "PERIODS PERIODS PERIODS")
        # IO.inspect(payments_made, label: "PAYMENTS_MADE PAYMENTS_MADE PAYMENTS_MADE")
        # IO.inspect(expected, label: "EXPECTED EXPECTED EXPECTED")

        cond do
          expected == 0 and payments_made > 0 -> 5.0
          expected == 0 and payments_made == 0 -> nil
          expected == 0 -> nil
          true ->
            rating = payments_made / expected * 5.0
            if rating > 5, do: 5, else: rating
        end
      end)
      |> Enum.reject(&is_nil/1)   # remove periods with rating nil
    end
  end

  defp custom_round(value, ppm) when ppm in [1, 2] do
    integer = trunc(value)
    decimal = value - integer

    if decimal >= 0.7 do
      integer + 1
    else
      integer
    end
  end

  defp custom_round(value, _ppm) do
    floor(value)
  end

  defp round1(x) when is_float(x) do
    Float.round(x, 1)
  end

  defp round1(x), do: x
end
