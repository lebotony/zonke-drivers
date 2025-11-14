import axios from "axios";
import qs from "qs";

import { API_URL } from "@/constants/srcConstants";

export const fetchDrivers = ({ pageParam = 1 }, filters: Filters) => {
  return axios
    .get(`${API_URL}/drivers/public`, {
      params: { page: pageParam, per_page: 5, filters },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "brackets" }),
    })
    .then((response) => {
      console.log("DRIVERS DRIVERS DRIVERS", response.data.paginate);
      return response.data;
    })
    .catch((err) => err);
};
