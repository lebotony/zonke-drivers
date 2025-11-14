import { httpGet } from "@/src/requests";
import { DriverFormValues, OwnerFormValues } from "./scene/ui/profileSetup";
import axios from "axios";
import { API_URL } from "@/constants/srcConstants";

export const updateDriver = async (params: DriverFormValues) => {
  const { asset, ...rest } = params as any;

  const form = new FormData();

  Object.entries(rest).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => form.append(`${key}[]`, v));
    } else if (typeof value === "object") {
      form.append(key, JSON.stringify(value));
    } else {
      form.append(key, String(value));
    }
  });

  try {
    if (asset && asset.file_path) {
      const uri = asset.file_path;
      const name = asset.filename || uri.split("/").pop();
      const ext = name?.split(".").pop()?.toLowerCase() || "jpg";
      const mime = ext === "png" ? "image/png" : "image/jpeg";

      form.append("asset[file]", {
        uri,
        name,
        type: mime,
      } as any);
    }

    const response = await axios.post(`${API_URL}/drivers/upsert`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating driver:", error);
    throw error;
  }
};

export const fetchDriverProfile = () => httpGet("/drivers/user_driver");

export const updateVehicleUser = async (
  id: string,
  params: OwnerFormValues,
) => {
  const { asset, ...rest } = params as any;

  const form = new FormData();

  Object.entries(rest).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => form.append(`${key}[]`, v));
    } else if (typeof value === "object") {
      form.append(key, JSON.stringify(value));
    } else {
      form.append(key, String(value));
    }
  });

  try {
    if (asset && asset.file_path) {
      const uri = asset.file_path;
      const name = asset.filename || uri.split("/").pop();
      const ext = name?.split(".").pop()?.toLowerCase() || "jpg";
      const mime = ext === "png" ? "image/png" : "image/jpeg";

      form.append("asset[file]", {
        uri,
        name,
        type: mime,
      } as any);
    }

    const response = await axios.put(`${API_URL}/users/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user image:", error);
    throw error;
  }
};
