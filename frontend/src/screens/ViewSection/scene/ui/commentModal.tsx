import { useState, useRef, useEffect } from "react";
import { View, TextInput, Keyboard, Platform } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";
import { Modal } from "@/src/components/modal";
import { CustomButton } from "@/src/components/elements/button";
import { AppToast } from "@/src/components/CustomToast/customToast";
import { usePaginatedCache } from "@/src/updateCacheProvider";

import { styles } from "../styles/modals";
import { CommentSchema } from "../schema";
import { createComment } from "../../actions";

type CommentFormValues = z.infer<typeof CommentSchema>;

type CommentModalProps = {
  setShowCommentModal: () => void;
  driverId: string;
  vehicle: Vehicle;
};

export const CommentModal = ({
  setShowCommentModal,
  driverId,
  vehicle,
}: CommentModalProps) => {
  const [commentHeight, setCommentHeight] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, reset, watch, setValue } =
    useForm<CommentFormValues>({
      resolver: zodResolver(CommentSchema),
    });

  const { updatePaginatedObject, getUpdatedObjectSnapshot } =
    usePaginatedCache();

  const commentValue = watch("text");

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardOpen(true),
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
        inputRef.current?.blur();
      },
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const vehicleId = vehicle.id;

  const vehicleDriver = vehicle?.vehicle_drivers?.find(
    (vd: VehicleDriver) => vd.driver.id === driverId,
  )?.driver;

  const handleSubmitComment = () => {
    handleSubmit((formData) => {
      createComment({ driver_id: driverId, ...formData })
        .then((response) => {
          AppToast("Comment added successfully", true);

          const vehicle = getUpdatedObjectSnapshot("userVehicles", vehicleId);

          updatePaginatedObject("userVehicles", vehicleId, {
            vehicle_drivers: vehicle?.vehicle_drivers?.map(
              (vd: VehicleDriver) => {
                if (vd?.driver.id !== driverId) return vd;

                const vehicleDriver = vehicle?.vehicle_drivers?.find(
                  (vd: VehicleDriver) => vd.driver.id === driverId,
                );

                return {
                  ...vd,
                  comments: [response, ...(vehicleDriver?.comments ?? [])],
                };
              },
            ),
          });

          reset();
        })
        .catch((err) => {
          AppToast();
          throw new Error("Error while creating comment: ", err);
        });
    })();
    setShowCommentModal();
  };

  return (
    <Modal onDismiss={setShowCommentModal}>
      <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: "rgba(118, 203, 237, 0.15)",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          borderWidth: 2,
          borderColor: "rgba(118, 203, 237, 0.25)",
        }}>
          <Ionicons name="chatbox-ellipses" size={28} color={Colors.mrDBlue} />
        </View>

        <Text style={styles.title}>Add Comment</Text>

        <View style={[styles.commentBox]}>
          <Text style={styles.username}>
            For {vehicleDriver?.first_name} {vehicleDriver?.last_name}
          </Text>

          <TextInput
            ref={inputRef}
            style={[styles.commentInput, { minHeight: 60 }]}
            placeholder="Share your thoughts about this driver..."
            placeholderTextColor="rgba(28, 27, 31, 0.4)"
            value={commentValue}
            onChangeText={(value) => setValue("text", value)}
            multiline
            textAlignVertical="top"
            underlineColorAndroid="transparent"
            selectionColor={Colors.mrDBlue}
            onContentSizeChange={(event) =>
              setCommentHeight(event.nativeEvent.contentSize.height)
            }
          />
        </View>

        <CustomButton
          customStyle={{
            width: "100%",
            marginTop: 8,
            paddingVertical: 14,
            borderRadius: 16,
            shadowColor: Colors.mrDBlue,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 5,
          }}
          color={Colors.mrDBlue}
          onPress={handleSubmitComment}
        >
          <Text style={styles.postBtnText}>POST COMMENT</Text>
        </CustomButton>
      </View>
    </Modal>
  );
};
