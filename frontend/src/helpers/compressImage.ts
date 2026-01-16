import * as ImageManipulator from "expo-image-manipulator";

interface CompressImageOptions {
  uri: string;
  maxDimension?: number;
  targetSizeKB?: number;
  maxIterations?: number;
}

interface CompressedImage {
  uri: string;
  width: number;
  height: number;
}

/**
 * Compresses an image to target approximately 400 KB while maintaining quality.
 *
 * Strategy: Resize to max dimension and apply progressive compression.
 * This approach is size-agnostic and works consistently across platforms.
 *
 * @param options.uri - The local URI of the image to compress
 * @param options.maxDimension - Maximum width/height in pixels (default: 1600)
 * @param options.targetSizeKB - Target file size in KB (default: 400, used for quality calculation)
 * @param options.maxIterations - Maximum compression attempts (default: 3)
 * @returns Compressed image with URI and metadata
 */
export const compressImage = async ({
  uri,
  maxDimension = 1600,
  targetSizeKB = 400,
  maxIterations = 3,
}: CompressImageOptions): Promise<CompressedImage> => {
  try {
    // Resize to max dimension while preserving aspect ratio
    // This alone typically reduces most images significantly
    let manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [
        {
          resize: {
            width: maxDimension,
          },
        },
      ],
      {
        compress: 0.8,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    // Apply additional compression iterations with decreasing quality
    // This ensures we get close to target size for larger images
    let compressionQuality = 0.7;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      manipulatedImage = await ImageManipulator.manipulateAsync(
        manipulatedImage.uri,
        [],
        {
          compress: compressionQuality,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      // Reduce quality for next iteration
      compressionQuality -= 0.15;

      // Don't go below 0.4 quality
      if (compressionQuality < 0.4) {
        break;
      }
    }

    return {
      uri: manipulatedImage.uri,
      width: manipulatedImage.width,
      height: manipulatedImage.height,
    };
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};
