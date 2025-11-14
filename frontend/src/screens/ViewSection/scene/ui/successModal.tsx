import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { CustomButton } from "@/src/components/elements/button";
import { Colors } from "@/constants/ui";
import { Modal } from "@/src/components/elements/modal";

import { styles } from "../styles/modals";

export const SuccessModal = () => {
  return (
    <Modal>
      <View style={styles.container}>
        <Text style={styles.title}>Your booking was Successful</Text>
        <View style={{ marginVertical: 15 }}>
          <MaterialCommunityIcons
            name="shield-check"
            size={50}
            color={Colors.mediumGreen}
          />
        </View>
        <Text style={styles.thanksText}>
          You successfully booked the makeup service from
          <Text style={styles.boldText}> @Beyonce </Text>
          on
          <Text style={styles.boldText}> Tuesday </Text>
          at
          <Text style={styles.boldText}> 15:00</Text>
        </Text>
        <CustomButton
          customStyle={{
            position: "absolute",
            bottom: 35,
            width: "100%",
            paddingVertical: 13,
          }}
          color="primaryBlue"
          onPress={() => null}
        >
          <Text style={styles.postBtnText}>Done</Text>
        </CustomButton>
      </View>
    </Modal>
  );
};
