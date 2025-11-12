import { View } from "react-native";
import { Text } from "react-native-paper";

import { Modal } from "@/src/components/elements/modal";
import { Colors } from "@/constants/ui";
import { CustomButton } from "@/src/components/elements/button";

import { styles } from "./styles/noProfileModal";
import { router } from "expo-router";

type NoProfileModalModalProps = {
  setShowNoProfileModal: (value: any) => void;
};

export const NoProfileModal = (props: NoProfileModalModalProps) => {
  const { setShowNoProfileModal } = props;

  return (
    <Modal fn={() => setShowNoProfileModal(false)}>
      <Text style={styles.messageText}>
        You do not have a driver profile yet, press the create button to create
        one.
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "space-between",
        }}
      >
        <CustomButton
          onPress={() => setShowNoProfileModal(false)}
          color={Colors.lightGreen}
          customStyle={{
            paddingHorizontal: 14,
            backgroundColor: Colors.lighterGrey,
          }}
        >
          <Text
            style={{
              color: Colors.white,
            }}
          >
            Cancel
          </Text>
        </CustomButton>
        <CustomButton
          onPress={() => {
            router.push("/profileSetup");
            setShowNoProfileModal(false);
          }}
          color={Colors.lightGreen}
          customStyle={{
            paddingHorizontal: 14,
            backgroundColor: Colors.mrDBlue,
          }}
        >
          <Text style={[styles.messageText, { color: Colors.white }]}>
            Create
          </Text>
        </CustomButton>
      </View>
    </Modal>
  );
};
