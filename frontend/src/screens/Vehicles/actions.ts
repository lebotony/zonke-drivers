import axios from "axios";
import qs from "qs";

import { API_URL } from "@/constants/srcConstants";

export const fetchVehicles = async ({ pageParam = 1 }, filters) => 
  axios
    .get(`${API_URL}/vehicles/public`, {
      params: { page: pageParam, per_page: 5, filters },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "brackets" }),
    })
      .then((response) => {
        console.log('SSSSSSSSSSSSSSSSSSSS', response.data);
        return response.data;
      })
      .catch((err) => {
        console.error("fetchVehicles error:", err);
        throw err;
      });