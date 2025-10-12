import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

import { Image } from "expo-image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import carPic from "@/assets/images/audi.png";

import { styles } from "../styles/addCar";
import { CardFormDef } from "../utils/cardFormDef";
import { Card } from "./card";
import { FormSchema } from "../../schema";
import { AddCarForm } from "./form";

export type AddCarFormValues = z.infer<typeof FormSchema>;

export const AddCar = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCarFormValues>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerWrapper}>
          <Text style={[styles.header]}>Car Details</Text>

          <View style={styles.imageWrapper}>
            <Image
              source={carPic}
              style={{
                height: 200,
                borderRadius: 10,
              }}
              contentFit="cover"
            />
          </View>
        </View>

        <Text style={styles.addVehicleText}>Add a Vehicle</Text>
        <Text style={styles.addVehicleSubText}>
          Add your vehicle details below
        </Text>

        {CardFormDef.map((card) => (
          <Card card={card} />
        ))}

        <AddCarForm control={control} errors={errors} />
      </ScrollView>
    </SafeAreaView>
  );
};
