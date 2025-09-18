import { FlatList, View } from "react-native";

import { Header } from "./ui/header";
import { QuickFilters } from "./ui/quickFilters";
import { DriverCard } from "./ui/driverCard";
import { styles } from "./styles/index";
import { router } from "expo-router";

{
  /* {router.push("/profileSetup")} */
}
{
  /* {router.push("/drivers/1")} */
}
{
  /* {router.push("/posts")} */
}

export const Scene = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <QuickFilters />
      <View style={styles.drivers}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <DriverCard />}
          contentContainerStyle={{ gap: 15, paddingVertical: 15 }}
        />
      </View>
    </View>
  );
};
