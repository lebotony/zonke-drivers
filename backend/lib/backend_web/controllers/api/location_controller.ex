defmodule BackendWeb.LocationController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  require Logger

  @geoapify_base_url "https://api.geoapify.com/v1/geocode/autocomplete"

  def search(conn, %{query: query}, _session) when byte_size(query) >= 3 do
    geoapify_api_key = System.get_env("GEOAPIFY_API_KEY")

    if is_nil(geoapify_api_key) or geoapify_api_key == "" do
      Logger.error("Geoapify API key not configured or empty")

      conn
      |> put_status(:internal_server_error)
      |> json(%{error: "Location service not configured"})
    else
      url =
        "#{@geoapify_base_url}?text=#{URI.encode(query)}&apiKey=#{geoapify_api_key}&limit=5"

      Logger.info("Making request to Geoapify API")

      case HTTPoison.get(url) do
        {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          case Jason.decode(body) do
            {:ok, %{"features" => features}} ->
              locations = parse_geoapify_features(features)
              Logger.info("Parsed #{length(locations)} locations from Geoapify response")
              json(conn, %{locations: locations})

            {:ok, response} ->
              Logger.error("Unexpected Geoapify response structure: #{inspect(response)}")

              conn
              |> put_status(:internal_server_error)
              |> json(%{error: "Failed to parse location response"})

            {:error, reason} ->
              Logger.error("Failed to decode JSON: #{inspect(reason)}")

              conn
              |> put_status(:internal_server_error)
              |> json(%{error: "Failed to parse location response"})
          end

        {:ok, %HTTPoison.Response{status_code: status_code, body: body}} ->
          Logger.error("Geoapify API returned status #{status_code}, body: #{body}")

          conn
          |> put_status(:bad_gateway)
          |> json(%{error: "Location service unavailable"})

        {:error, %HTTPoison.Error{reason: reason}} ->
          Logger.error("Geoapify API request failed: #{inspect(reason)}")

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

  defp parse_geoapify_features(features) do
    Enum.map(features, fn feature ->
      properties = Map.get(feature, "properties", %{})
      geometry = Map.get(feature, "geometry", %{})
      coordinates = Map.get(geometry, "coordinates", [0, 0])

      place_name = Map.get(properties, "formatted", "")
      [lon, lat] = coordinates
      country = Map.get(properties, "country", "")
      city = extract_city_from_properties(properties)

      %{
        country: country,
        city: city,
        lon: lon,
        lat: lat,
        place: place_name
      }
    end)
  end

  defp extract_city_from_properties(properties) do
    # Geoapify provides city in multiple possible fields
    # Try city first, then town, then village, then suburb
    Map.get(properties, "city") ||
      Map.get(properties, "town") ||
      Map.get(properties, "village") ||
      Map.get(properties, "suburb") ||
      Map.get(properties, "state") ||
      ""
  end
end
