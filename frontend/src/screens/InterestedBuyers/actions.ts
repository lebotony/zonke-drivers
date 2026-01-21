import axios from "axios";
import { API_URL } from "@/constants/srcConstants";

export const fetchInterestedBuyers = async (
  vehicleId: string,
  { pageParam = 1 }
) =>
  axios
    .get(`${API_URL}/vehicle_purchase_interests`, {
      params: { vehicle_id: vehicleId, page: pageParam, per_page: 10 },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error("fetchInterestedBuyers error:", err);
      throw err;
    });
