import { Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Avatar } from "@components/visual/avatar";
import profilePic from "@assets/images/profile_pic.png";

import { styles } from "./styles";
import { Header } from "./ui/header";

export const Scene = () => {
  return (
    <SafeAreaView>
      {Platform.OS !== "web" && <Header />}

      <View style={styles.body}>
        <View style={styles.profilePic}>
          <Avatar source={profilePic} round width={125} />
          <Text style={styles.name}>Romeo Makota</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
