// ...existing code...
import React from "react";
import { View, Image as RNImage, Pressable } from "react-native";
import carPic from "@/assets/images/car-test.jpg";
import { router } from "expo-router";
import { HorizontalDivider } from "../../../../components/shapes/divider";
import { CustomButton } from "../../../../components/elements/button";
import { Colors } from "../../../../../constants/ui";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../styles/card";
import { Text } from "react-native-paper";

type Props = {
  item: any;
};

export const VehicleCard = ({ item }: Props) => {
  return (
    <View style={styles.card}>
     <View style={styles.topSection}>
      <View style={styles.leftInfo}>
        <Text style={styles.carName}>Luxury sedan</Text>
        <Text style={styles.model}>Model year: 2020 </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}> $220</Text>
          <Text style={styles.perDay}> per day</Text>
        </View>

      </View>

      <View style={styles.rightInfo}>
        <Pressable style={styles.iconWrapper} onPress={()=> router.push("/vehicles/1")}>
          <Ionicons name="arrow-forward" size={20} color={Colors.white}/>
        </Pressable>

        <View style={styles.rating}>
          <AntDesign name="star" size={18} color={Colors.lightYellow} />
          <Text style={styles.ratingValue}> 4.5</Text>
        </View>
      </View>
     </View>

     <Pressable style={styles.imgContainer} onPress={()=> router.push("/vehicles/1")}>
      <RNImage source={carPic} style={{width: '100%', height: '100%', borderRadius: 12}}/>
      <View style={styles.leftFlap} />
      <View style={styles.rightFlap} />
     </Pressable>
     

     <View style={styles.footer}>

     </View>
      
    </View>
  );
};