import axios from "axios";

import { API_URL } from "@/constants/srcConstants";

export const fetchDrivers = ({ pageParam = 1 }) =>
  axios
    .get(`${API_URL}/drivers/public`, {
    params: { page: pageParam, per_page: 5 }
  })
    .then((response) => {
      return response.data
    })
    .catch((err) => err);
