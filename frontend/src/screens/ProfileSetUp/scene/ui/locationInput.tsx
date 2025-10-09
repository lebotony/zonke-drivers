import React, { useCallback, useEffect, useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import axios from "axios";
import { debounce, isEmpty } from "lodash";

import { MAPBOX_TOKEN } from "@env";

export const AddAddressScreen = () => {
  const handleLocationSelect = (place) => {
    console.log("Selected location:", place);
    // place.center = [longitude, latitude]
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Your Address</Text>
      <LocationAutocomplete onSelect={handleLocationSelect} />
    </View>
  );
};

export const LocationAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchSuggestions = useCallback(
    debounce((text: string) => {
      if (text.length < 3) {
        setResults([]);
        return;
      }

      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            text
          )}.json`,
          {
            params: {
              access_token:
                "pk.eyJ1IjoibGVib3RvbnkiLCJhIjoiY21nZ3cwcWVhMGxraTJtc2NmYjA0N2k2dyJ9.gtCHGFWdu4aEBR1NAVhMeQ",
              autocomplete: true,
              country: "ZW",
              limit: 5,
            },
          }
        )
        .then((res) => {
          console.log("FFFFFFFFFFFFFFFFFFFFFFFFF", res.data);
          setResults(res.data.features || []);
        })
        .catch((err) => {
          console.error("Mapbox fetch error:", err.message);
          setResults([]);
        });
    }, 400),
    []
  );

  useEffect(() => {
    return () => {
      fetchSuggestions.cancel();
    };
  }, [fetchSuggestions]);

  const handleSelect = (place) => {
    setQuery(place.place_name);
    setResults([]);
    onSelect?.(place);
  };

  const handleChange = (text: string) => {
    setQuery(text); // immediately reflect input in UI
    fetchSuggestions(text); // debounce API call only
  };

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        value={query}
        onChangeText={handleChange}
        placeholder="Enter location..."
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
        }}
      />
      {!isEmpty(results) && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <Text>{item.place_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};
