import * as ImagePicker from "expo-image-picker";
import { compressImage } from "./compressImage";

export const pickImage = async (
  setValue: any,
  aspect = [16, 12],
  fn?: any,
  id?: string,
  updatePaginatedObject?: any,
  setLoading?: (loading: boolean) => void,
) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    alert("Permission to access media library is required!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: aspect,
    quality: 1,
  });

  if (!result.canceled) {
    try {
      // Start loading state
      setLoading?.(true);

      // expo-image-picker returns assets array in newer versions
      const asset = Array.isArray(result.assets)
        ? result.assets[0]
        : (result as any);
      const originalUri = asset.uri || asset.uri;
      const filename = originalUri.split("/").pop() || `photo-${Date.now()}.jpg`;

      // Compress the image before upload
      const compressed = await compressImage({ uri: originalUri });
      const compressedFilename = compressed.uri.split("/").pop() || filename;

      setValue("asset", {
        file_path: compressed.uri,
        filename: compressedFilename,
      });

      // Upload to backend
      await fn({ file_path: compressed.uri, filename: compressedFilename }, id).then(
        (res: Asset) => updatePaginatedObject(res),
      );
    } catch (error) {
      console.error("Error processing image:", error);
      throw error;
    } finally {
      // End loading state
      setLoading?.(false);
    }
  }
};
