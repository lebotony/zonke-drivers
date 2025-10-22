import { Colors } from "@/constants/ui";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text } from "react-native-paper";

type ModalDatePickerProps = {
  setValue: any;
};

export const ModalDatePicker = (props: ModalDatePickerProps) => {
  const { setValue } = props;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedForEcto = `${year}-${month}-${day}`;

    setValue("dob", formattedForEcto);
    setDatePickerVisibility(false);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.tealGreen,
          borderRadius: 6,
          padding: 8,
          alignItems: "center",
        }}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text style={{ color: Colors.white, fontSize: 15 }}>Pick date</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};
