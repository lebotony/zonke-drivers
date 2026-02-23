import axios from "axios";
import qs from "qs";

import { API_URL } from "@/constants/srcConstants";

export const fetchOwnerVehicles = async (
  { pageParam = 1 },
  userId: string,
  onSale: boolean
) =>
  axios
    .get(`${API_URL}/vehicles/owner_vehicles`, {
      params: { page: pageParam, per_page: 10, user_id: userId, on_sale: onSale },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "brackets" }),
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
