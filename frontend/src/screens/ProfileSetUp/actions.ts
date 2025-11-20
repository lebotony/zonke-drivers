import axios from "axios";

import { httpGet, httpPost, httpPut } from "@/src/requests";
import { API_URL } from "@/constants/srcConstants";

import { DriverFormValues, OwnerFormValues } from "./scene/ui/profileSetup";

export const updateDriver = async (params: Partial<DriverFormValues>) => httpPost('/drivers/upsert', params)

export const updateVehicleUser = async (id: string, params: OwnerFormValues) => httpPut('/users', id, params)

export const fetchDriverProfile = () => httpGet("/drivers/user_driver");

export const updateUserAsset = async (id: string, params: DriverFormValues["asset"]) => {
  const form = new FormData();

  try {
    if (params && params.file_path) {
      const uri = params.file_path;
      const name = params.filename || uri.split("/").pop();
      const ext = name?.split(".").pop()?.toLowerCase() || "jpg";
      const mime = ext === "png" ? "image/png" : "image/jpeg";

      form.append("params[file]", {
        uri,
        name,
        type: mime,
      } as any);
    }

    const response = await axios.post(`${API_URL}/users/update_asset`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle image:", error);
    throw error;
  }
};