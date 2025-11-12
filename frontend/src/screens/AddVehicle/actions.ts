import axios from "axios";
import { API_URL } from "@/constants/srcConstants";
import { AddVehicleFormValues } from "./scene/ui/addVehicle";

export const createVehicle = async (params: AddVehicleFormValues) => {
  const { asset, ...rest } = params as any;

  if (!asset || !asset.file_path) {
    throw new Error("Vehicle image (asset) is required.");
  }

  const form = new FormData();

  Object.entries(rest).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (typeof value === "object") {
      form.append(key, JSON.stringify(value));
    } else {
      form.append(key, String(value));
    }
  });

  const uri = asset.file_path;
  const name = asset.filename || uri.split("/").pop();
  const ext = name?.split(".").pop()?.toLowerCase() || "jpg";
  const mime = ext === "png" ? "image/png" : "image/jpeg";

  form.append("asset[file]", {
    uri,
    name,
    type: mime,
  } as any);

  try {
    const response = await axios.post(`${API_URL}/vehicles`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
};

export const updateVehicle = async (params: Partial<AddVehicleFormValues>) => {
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

    const response = await axios.post(`${API_URL}/vehicles/update`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
}
