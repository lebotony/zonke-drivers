import axios from "axios";
import { debounce } from "lodash";

export const fetchSuggestions = debounce(
  (text: string, onSetResults, onOpen) => {
    const mapboxToken = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;

    if (text.length < 3) {
      onSetResults([]);
      return;
    }

    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          text,
        )}.json`,
        {
          params: {
            access_token: mapboxToken,
            autocomplete: true,
            limit: 5,
            types: "country",
          },
        },
      )
      .then((res) => {
        const places = res.data.features.map(
          (feature: Record<string, any>) => ({
            address: feature.place_name,
            lon: feature.center[0],
            lat: feature.center[1],
          }),
        );

        onSetResults(places);
        onOpen(true);
      })
      .catch((err) => {
        console.error("Mapbox fetch error:", err.message);
        onSetResults([]);
      });
  },
  400,
);
