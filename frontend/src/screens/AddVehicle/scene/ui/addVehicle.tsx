import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import carPic from "@/assets/images/audi.png";
import { pickImage } from "@/src/helpers/pickImage";

import { styles } from "../styles/addVehicle";
import { CardFormDef } from "../utils/cardFormDef";
import { Card } from "./card";
import { FormSchema } from "../../schema";
import { AddVehicleForm } from "./form";
import { CustomButton } from "@/src/components/elements/button";
import { Colors } from "@/constants/ui";
import { createVehicle } from "../../actions";
import { AntDesign } from "@expo/vector-icons";

export type AddVehicleFormValues = z.infer<typeof FormSchema>;

export const AddVehicle = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddVehicleFormValues>({
    resolver: zodResolver(FormSchema),
  });

  const pickedAsset = watch("asset");

  const create = (data) => {
    const params = {
      ...data,
      price_fixed: {
        value: data.price_fixed,
        currency: "Rand",
      },
    };

    console.log("QQQQQQQQQQQQQQQQQQQQQQ", params);

    createVehicle(params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerWrapper}>
          <Text style={[styles.header]}>Car Details</Text>

          <View style={styles.imageWrapper}>
            <TouchableOpacity
              style={styles.plusBtn}
              onPress={() => pickImage(setValue)}
            >
              <AntDesign name="plus" size={24} color={Colors.white} />
            </TouchableOpacity>
            <Image
              source={
                pickedAsset?.file_path ? { uri: pickedAsset.file_path } : carPic
              }
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
              contentFit="contain"
            />
          </View>
        </View>

        <Text style={styles.addVehicleText}>Add a Vehicle</Text>
        <Text style={styles.addVehicleSubText}>
          Add your vehicle details below
        </Text>

        {CardFormDef.map((card, index) => (
          <Card
            key={`${card.label}-${index}`}
            card={card}
            setValue={setValue}
            watch={watch}
          />
        ))}

        <AddVehicleForm control={control} errors={errors} />

        <CustomButton
          haptics="light"
          onPress={handleSubmit(create)}
          customStyle={{
            flexGrow: 1,
            marginBottom: 20,
            marginTop: 10,
            marginHorizontal: 15,
          }}
        >
          <Text style={{ color: Colors.white, fontWeight: 700, fontSize: 16 }}>
            Add Vehicle
          </Text>
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};
