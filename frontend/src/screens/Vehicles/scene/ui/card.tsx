// ...existing code...
import React from "react";
import { View, Text, Image as RNImage, Pressable } from "react-native";
import carPic from "@/assets/images/car-test.jpg";
import { router } from "expo-router";
import { HorizontalDivider } from "../../../../components/shapes/divider";
import { CustomButton } from "../../../../components/elements/button";
import { Colors } from "../../../../../constants/ui";
import { Ionicons, AntDesign, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../styles/card";

type Props = {
  item: any;
};

export const VehicleCard = ({ item }: Props) => {
  return (
    <View style={styles.card}>
      {/* <View style={styles.cardTop}>

        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <View style= {styles.rating}>
            <AntDesign name="star" size={16} color={Colors.yellow} />
            <Text>
              {item.rating} 
            </Text>
            <Text style={styles.numReviews}>(122 reviews)</Text>
          </View>

          <View style={styles.location}>
            <MaterialIcons
                name="location-pin"
                size={17}
                color={Colors.mediumDarkGrey}
            />

            <Text style={styles.locationText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>

         
          <View style={styles.price}>
            <FontAwesome5
                  name="money-bill-wave"
                  size={14}
                  color={Colors.darkGreen}
                />
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          
        </View>

         <View style={styles.actions}>
          <Ionicons name="chatbubble-outline" size={24} color={Colors.mediumGrey}/>
          <MaterialCommunityIcons name="share-outline" size={30} color={Colors.mediumGrey} />
        </View>

      </View> */}
      

      <Pressable style={styles.imgContainer} onPress={() => router.push("/vehicles/1")}>
        <RNImage source={carPic} style={styles.image} />
        
      </Pressable>

      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.title}</Text>
          <FontAwesome5
                  name="heart"
                  size={18}
                  color={Colors.charcoalGray}
                />
        </View>
          
          <View style= {styles.rating}>
            <AntDesign name="star" size={16} color={Colors.yellow} />
            <Text>
              {item.rating} 
            </Text>
            <Text style={styles.numReviews}>(122 reviews)</Text>
          </View>

          <View style={styles.location}>
            <MaterialIcons
                name="location-pin"
                size={17}
                color={Colors.mediumDarkGrey}
            />

            <Text style={styles.locationText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>

         
          <View style={styles.price}>
            <FontAwesome5
                  name="money-bill-wave"
                  size={14}
                  color={Colors.darkGreen}
                />
            <Text style={styles.priceText}>{item.price}</Text>
            <Text style={styles.perDay}>/ day</Text>
          </View>
          
        </View>


      
    </View>
  );
};


{/* <View style={styles.card}>
      <View style={styles.cardTop}>

        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <View style= {styles.rating}>
            <AntDesign name="star" size={16} color={Colors.yellow} />
            <Text>
              {item.rating} 
            </Text>
            <Text style={styles.numReviews}>(122 reviews)</Text>
          </View>

          <View style={styles.location}>
            <MaterialIcons
                name="location-pin"
                size={17}
                color={Colors.mediumDarkGrey}
            />

            <Text style={styles.locationText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>

         
          <View style={styles.price}>
            <FontAwesome5
                  name="money-bill-wave"
                  size={14}
                  color={Colors.darkGreen}
                />
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          
        </View>

         <View style={styles.actions}>
          <Ionicons name="chatbubble-outline" size={24} color={Colors.mediumGrey}/>
          <MaterialCommunityIcons name="share-outline" size={30} color={Colors.mediumGrey} />
        </View>

      </View>

      <View style={styles.header}>
        <RNImage source={carPic} style={styles.image} />
        
      </View>


      <View style={styles.bottomRow}>
        <CustomButton
                onPress={() => router.push("/drivers/1")}
                customStyle={{ paddingTop: 8, paddingBottom: 12, backgroundColor: Colors.mrDBlue}}
              >
                <Text style={[styles.viewText, { fontWeight: 500, lineHeight: 17 }]}>
                  View Details
                </Text>
              </CustomButton>
      </View>
    </View> */}