import React from "react";
import { Text, FlatList, SafeAreaView } from "react-native";
import { Card } from "./card";
import { styles } from "./styles";

export const ManageVehicles = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Management</Text>

      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => <Card />}
        contentContainerStyle={{ paddingVertical: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
