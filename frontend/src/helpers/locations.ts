import { useCallback } from "react";

import axios from "axios";
import { debounce } from "lodash";
import { MAPBOX_TOKEN } from "@env";

  export const fetchSuggestions = useCallback(
    debounce((text: string, onSetResults, onOpen) => {
      if (text.length < 3) {
        onSetResults([]);
        return;
      }

      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            text
          )}.json`,
          {
            params: {
              access_token: MAPBOX_TOKEN,
              autocomplete: true,
              limit: 5,
            },
          }
        )
        .then((res) => {
          const places = res.data.features.map(
            (feature: Record<string, any>) => feature.place_name
          );
          console.log("FFFFFFFFFFFFFFFFFFFFFFFFF", places);
          onSetResults(places);
          onOpen(true);
        })
        .catch((err) => {
          console.error("Mapbox fetch error:", err.message);
          onSetResults([]);
        });
    }, 400),
    []
  );