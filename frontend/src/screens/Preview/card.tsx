import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";

import { useQueryClient } from "@tanstack/react-query";

import { View } from "@/src/components/Themed";
import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";
import { Spinner } from "@/src/components/elements/Spinner";
import { useCustomQuery } from "@/src/useQueryContext";
import { BackArrow } from "@/src/components/BackArrow/header";

import { fetchDriverProfile } from "../ProfileSetUp/actions";
import { DriverCard } from "../Drivers/Scene/ui/driverCard";

export const PreviewCard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, any> | null>(null);

  const queryClient = useQueryClient();
  const { getCachedData } = useCustomQuery();
  const { driverProfile } = getCachedData(["driverProfile"]);

  useEffect(() => {
    if (!driverProfile) {
      setLoading(true);

      fetchDriverProfile()
        .then((profile) => {
          queryClient.setQueryData(["driverProfile"], profile);
        })
        .catch((err) => {
          if (err.response?.status === 404) {
            setError({ message: "Profile not found" });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [driverProfile]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.bg,
        }}
      >
        <Spinner />
      </View>
    );
  }

  if ((error || !driverProfile) && !loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.bg,
        }}
      >
        <Text style={{ fontSize: 18 }}>{error?.message}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: Colors.bg,
        flex: 1,
        ...topOffset,
      }}
    >
      <View style={{ alignItems: "center", backgroundColor: Colors.bg }}>
        <BackArrow left={12} />
        <Text style={{ fontSize: 20, marginBottom: 30 }}>Preview Card</Text>
      </View>
      <DriverCard driver={driverProfile} />
    </View>
  );
};
