import { debounce } from "lodash";
import { httpGet } from "@/src/requests";

export const fetchSuggestions = debounce(
  (text: string, onSetResults, onOpen) => {
    if (text.length < 3) {
      onSetResults([]);
      return;
    }

    httpGet("/locations/search", { query: text })
      .then((res) => {
        const locations = res.locations || [];
        onSetResults(locations);
        onOpen(true);
      })
      .catch((err) => {
        console.error("Location fetch error:", err.message);
        onSetResults([]);
      });
  },
  400,
);
