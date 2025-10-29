import { Text } from "react-native-paper";

import { useQuery } from "@tanstack/react-query";

import { View } from "@/src/components/Themed";
import { Colors } from "@/constants/ui";
import { topOffset } from "@/src/components/appStyles";
import { Spinner } from "@/src/components/elements/Spinner";

import { fetchDriverProfile } from "../ProfileSetUp/actions";
import { DriverCard } from "../Drivers/Scene/ui/driverCard";

export const PreviewCard = () => {
  const {
    data: driverProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["driverProfile"],
    queryFn: fetchDriverProfile,
  });

  if (isLoading) {
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
        <Text style={{ marginTop: 10 }}>Loading driver profile...</Text>
      </View>
    );
  }

  if (isError || !driverProfile) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.bg,
        }}
      >
        <Text>Error loading driver profile</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: Colors.bg,
        paddingHorizontal: 10,
        flex: 1,
        alignItems: "center",
        ...topOffset,
      }}
    >
      <Text style={{ fontSize: 17, marginBottom: 20 }}>Preview Card</Text>
      <DriverCard driver={driverProfile} />
    </View>
  );
};
