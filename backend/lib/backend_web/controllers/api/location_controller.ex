defmodule BackendWeb.LocationController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  require Logger

  @mapbox_base_url "https://api.mapbox.com/geocoding/v5/mapbox.places"

  def search(conn, %{query: query}, _session) when byte_size(query) >= 3 do
    mapbox_token = System.get_env("MAPBOX_TOKEN")

    if is_nil(mapbox_token) or mapbox_token == "" do
      Logger.error("Mapbox token not configured or empty")

      conn
      |> put_status(:internal_server_error)
      |> json(%{error: "Mapbox token not configured"})
    else
      url =
        "#{@mapbox_base_url}/#{URI.encode(query)}.json?access_token=#{mapbox_token}&autocomplete=true&limit=5"

      Logger.info("Making request to URL: #{url}")

      case HTTPoison.get(url) do
        {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          case Jason.decode(body) do
            {:ok, %{"features" => features}} ->
              locations = parse_mapbox_features(features)
              Logger.info("Parsed #{length(locations)} locations from Mapbox response")
              json(conn, %{locations: locations})

            {:ok, response} ->
              Logger.error("Unexpected Mapbox response structure: #{inspect(response)}")

              conn
              |> put_status(:internal_server_error)
              |> json(%{error: "Failed to parse Mapbox response"})

            {:error, reason} ->
              Logger.error("Failed to decode JSON: #{inspect(reason)}")

              conn
              |> put_status(:internal_server_error)
              |> json(%{error: "Failed to parse Mapbox response"})
          end

        {:ok, %HTTPoison.Response{status_code: status_code, body: body}} ->
          Logger.error("Mapbox API returned status #{status_code}, body: #{body}")

          conn
          |> put_status(:bad_gateway)
          |> json(%{error: "Location service unavailable"})

        {:error, %HTTPoison.Error{reason: reason}} ->
          Logger.error("Mapbox API request failed: #{inspect(reason)}")

          conn
          |> put_status(:bad_gateway)
          |> json(%{error: "Failed to fetch locations"})
      end
    end
  end

  def search(conn, %{query: query}, _session) when byte_size(query) < 3 do
    json(conn, %{locations: []})
  end

  def search(conn, _params, _session) do
    conn
    |> put_status(:bad_request)
    |> json(%{error: "Query parameter required"})
  end

  defp parse_mapbox_features(features) do
    Enum.map(features, fn feature ->
      place_name = Map.get(feature, "place_name", "")
      [lon, lat] = Map.get(feature, "center", [0, 0])
      context = Map.get(feature, "context", [])

      country = extract_country(context)
      city = extract_city(context)

      %{
        country: country,
        city: city,
        lon: lon,
        lat: lat,
        place: place_name
      }
    end)
  end

  defp extract_country(context) when is_list(context) do
    context
    |> Enum.find(fn item -> String.starts_with?(item["id"], "country.") end)
    |> case do
      %{"text" => country} -> country
      _ -> ""
    end
  end

  defp extract_country(_), do: ""

  defp extract_city(context) when is_list(context) do
    # Try to find place (city) first, fallback to region
    city =
      Enum.find(context, fn item ->
        String.starts_with?(item["id"], "place.") or String.starts_with?(item["id"], "locality.")
      end)

    region =
      Enum.find(context, fn item -> String.starts_with?(item["id"], "region.") end)

    case city || region do
      %{"text" => name} -> name
      _ -> ""
    end
  end

  defp extract_city(_), do: ""
end
