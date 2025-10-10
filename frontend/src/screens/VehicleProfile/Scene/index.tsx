import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Image, TouchableOpacity, Dimensions, LayoutAnimation } from "react-native";
import { Ionicons, AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { Colors } from "../../../../constants/ui";
import carPic from "@/assets/images/car-test.jpg";
import { Avatar } from "../../../components/visual/avatar";
import { Circle } from "../../../components/shapes/circle";
import { router } from "expo-router";
import { styles } from "./styles/index";
import { Text } from "react-native-paper";

export const Scene = () => {

  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const width = Dimensions.get("window").width;
  const IMAGES = [carPic, carPic, carPic];
  const heroRef = useRef<any>(null);
  const modalRef = useRef<any>(null);

  useEffect(() => {
    if (expanded && modalRef.current) {
      setTimeout(() => {
        modalRef.current.scrollTo?.({ x: currentIndex * width, animated: false });
      }, 50);
    }
  }, [expanded, currentIndex, width]);

  const toggleDescription = () => {
    LayoutAnimation.easeInEaseOut();
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ position: "relative" }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={heroRef}
            onMomentumScrollEnd={(e) => {
              const idx = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentIndex(idx);
            }}
          >
            {IMAGES.map((img, i) => (
              <Image key={i} source={img} style={[styles.hero, { width }]} />
            ))}
          </ScrollView>

          <View
            style={{
              position: "absolute",
              top: 28,
              left: 12,
              right: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 6,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Circle size={30} borderColor={Colors.white}>
                <Ionicons name="arrow-back" size={18} color={Colors.white} />
              </Circle>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 8}}>

              <TouchableOpacity
                onPress={() => {
                  setExpanded(true);
                }}
              >
                <Circle size={30} borderColor={Colors.white}>
                  <Ionicons name="expand" size={18} color={Colors.white} />
                </Circle>
              </TouchableOpacity>

            </View>
          </View>

          <View style={{ position: "absolute", bottom: 12, left: 0, right: 0, alignItems: "center" }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {IMAGES.map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: currentIndex === i ? 18 : 6,
                    height: 6,
                    borderRadius: 6,
                    backgroundColor: currentIndex === i ? Colors.mrDBlue : "rgba(255,255,255,0.6)",
                  }}
                />
              ))}
            </View>
          </View>
        </View>

        <ScrollView style={styles.meta}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Audi RS7</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.white, paddingHorizontal:12, paddingVertical:4, borderRadius:20 }}>
              <Avatar round width={34} source={require('@/assets/images/profile_pic.png')} />
              <View style={styles.rating}>
                <AntDesign name="star" size={16} color={Colors.yellow} />
                <Text style={styles.ratingText}>4.5</Text>
              </View>
            </View>
          </View>

           <View style={styles.descriptionContainer}>
            <Text
              style={styles.descriptionText}
              numberOfLines={isDescriptionExpanded ? undefined : 2}
            >
              The Audi RS7 is a high-performance luxury sedan that combines sporty
              design with advanced technology and powerful performance. It features
              a sleek exterior, a luxurious interior, and a range of cutting-edge
              features to enhance the driving experience.
            </Text>
            
            {!isDescriptionExpanded && (
              <TouchableOpacity onPress={toggleDescription}>
                <Text style={styles.readText}>
                  Read more
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {isDescriptionExpanded && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.readText}>
                Read less
              </Text>
            </TouchableOpacity>
          )}



          <Text style={styles.title}>Overview</Text>
          
          <SafeAreaView style={styles.infoContainer}>
              <View style={styles.infoRow}>
              
                <View style={styles.infoItem}>
                  <View style={styles.xIconWrapper}>
                  <View style={styles.xsIconWrapper}>
                    <MaterialIcons name="local-gas-station" size={22} color={Colors.mrDBlue} />
                  </View>

                  </View>

                  <Text style={styles.infoTitle}>
                    Fuel Type
                  </Text>

                  <Text style={styles.infoText}>
                    Diesel
                  </Text>
                  
                </View>

                 
                <View style={styles.infoItem}>
                  <View style={styles.xIconWrapper}>
                  <View style={styles.xsIconWrapper}>
                    <MaterialIcons name="event-seat" size={22} color={Colors.mrDBlue} />
                  </View>

                  </View>

                  <Text style={styles.infoTitle}>
                    Passangers
                  </Text>

                  <Text style={styles.infoText}>
                    4
                  </Text>
                  
                </View>


                 <View style={styles.infoItem}>
                  <View style={styles.xIconWrapper}>
                  <View style={styles.xsIconWrapper}>
                    <FontAwesome5 name="cogs" size={22} color={Colors.mrDBlue} />
                  </View>

                  </View>

                  <Text style={styles.infoTitle}>
                    Transmission
                  </Text>

                  <Text style={styles.infoText}>
                    Manual
                  </Text>
                  
                </View>

                <View style={styles.infoItem}>
                  <View style={styles.xIconWrapper}>
                  <View style={styles.xsIconWrapper}>
                    <Ionicons name="speedometer-outline" size={22} color={Colors.mrDBlue} />
                  </View>

                  </View>

                  <Text style={styles.infoTitle}>
                    Mileage
                  </Text>

                  <Text style={styles.infoText}>
                    12 540 km
                  </Text>
                  
                </View>
                 <View style={styles.infoItem}>
                  <View style={styles.xIconWrapper}>
                  <View style={styles.xsIconWrapper}>
                    <MaterialIcons name="engineering" size={22} color={Colors.mrDBlue} />
                  </View>

                  </View>

                  <Text style={styles.infoTitle}>
                    Engine Capacity
                  </Text>

                  <Text style={styles.infoText}>
                    2 litre
                  </Text>
                  
                </View>

                <View style={[styles.infoItem,{ backgroundColor: 'transparent'}]} />
        
              </View>
          </SafeAreaView>

        </ScrollView>
      </ScrollView>

        { expanded && 
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.black }}>
          <TouchableOpacity
            onPress={() => setExpanded(false)}
            style={{ position: "absolute", top: 30, left: 20, zIndex: 20 }}
          >
              <Ionicons name="close" size={26} color={Colors.white} />
          </TouchableOpacity>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={modalRef}
          >
            {IMAGES.map((img, i) => (
              <Image key={i} source={img} style={{ width, height: "100%", resizeMode: "contain" }} />
            ))}
          </ScrollView>
        </SafeAreaView> 
          </View>}
    </SafeAreaView>
  );
};

export default Scene;
