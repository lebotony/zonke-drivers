import * as ImagePicker from "expo-image-picker";

export const pickImage = async (setValue: any) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    alert("Permission to access media library is required!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [16, 12],
    quality: 1,
  });

  if (!result.canceled) {
    // expo-image-picker returns assets array in newer versions
    const asset = Array.isArray(result.assets)
      ? result.assets[0]
      : (result as any);
    const uri = asset.uri || asset.uri;
    const filename = uri.split("/").pop() || `photo-${Date.now()}.jpg`;

    setValue("asset", { file_path: uri, filename });
  }
};
