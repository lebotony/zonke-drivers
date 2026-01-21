import axios from "axios";
import qs from "qs";

import { API_URL } from "@/constants/srcConstants";
import { httpGet } from "@/src/requests";

export const fetchVehiclesOnSale = async ({ pageParam = 1 }, filters) =>
  axios
    .get(`${API_URL}/vehicles/on_sale`, {
      params: { page: pageParam, per_page: 5, filters },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "brackets" }),
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });

export const fetchVehicleById = async (vehicle_id: string) =>
  httpGet("/vehicles/on_sale_vehicle/", { id: vehicle_id });

export const expressPurchaseInterest = async (vehicle_id: string) =>
  axios
    .post(`${API_URL}/vehicle_purchase_interests`, { vehicle_id })
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
