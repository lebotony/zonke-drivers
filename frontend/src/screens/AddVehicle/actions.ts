import axios from "axios";
import { isEmpty } from "lodash";

import { API_URL } from "@/constants/srcConstants";
import { httpPost, httpPut } from "@/src/requests";
import { compressImage } from "@/src/helpers/compressImage";

import { AddVehicleFormValues } from "./scene/ui/addVehicle";

export const createVehicle = async (params: AddVehicleFormValues) =>
  httpPost("/vehicles", params);

export const updateVehicle = async (
  id: string,
  params: Partial<AddVehicleFormValues>,
) => httpPut("/vehicles", id, params);

export const updateVehicleAsset = async (
  params: AddVehicleFormValues["asset"],
  id?: string,
) => {
  const form = new FormData();

  try {
    if (params && params.file_path) {
      // Compress the image before upload
      const compressed = await compressImage({ uri: params.file_path });

      const name = params.filename || compressed.uri.split("/").pop();
      const ext = name?.split(".").pop()?.toLowerCase() || "jpg";
      const mime = ext === "png" ? "image/png" : "image/jpeg";

      form.append("file", {
        uri: compressed.uri,
        name,
        type: mime,
      } as any);

      !isEmpty(id) && id !== "new" && form.append("vehicle_id", id as string);
    }

    const response = await axios.post(
      `${API_URL}/vehicles/update_asset`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle image:", error);
    throw error;
  }
};
