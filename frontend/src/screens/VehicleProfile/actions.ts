import { httpPost } from "@/src/requests";

export const applyForVehicle = (params) =>
  httpPost("/vehicle_applications", params);
