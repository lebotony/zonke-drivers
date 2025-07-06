import { FlatList, View } from "react-native";

import { Header } from "./ui/header";
import { QuickFilters } from "./ui/quickFilters";
import { DriverCard } from "./ui/driverCard";
import { styles } from "./styles/index";

export const Scene = () => {
  return (
    <>
      <Header />
      <QuickFilters />
      <View style={styles.drivers}>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          showsVerticalScrollIndicator={false}
          renderItem={(i) => <DriverCard key={`${i}`} />}
          contentContainerStyle={{ gap: 15, paddingVertical: 15 }}
        />
      </View>
    </>
  );
};
