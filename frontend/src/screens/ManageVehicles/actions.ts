import axios from "axios";

import { API_URL } from "@/constants/srcConstants";
import { httpPost } from "@/src/requests";

export const fetchManagementVehicles = ({ pageParam = 1 }) =>
  axios
    .get(`${API_URL}/vehicles/vehicle_drivers`, {
    params: { page: pageParam, per_page: 5,  }
  })
    .then((response) => {
      console.log("vehicle_drivers vehicle_drivers", response.data)
      return response.data
    })
    .catch((err) => err);

type FetchPaymentsParams = {
  pageParam: number,
  vehicleDriverId: string
}

export const fetchPayments = ({ pageParam = 1, vehicleDriverId }: FetchPaymentsParams) =>
  axios
    .get(`${API_URL}/vehicle_payments`, {
    params: { page: pageParam, page_size: 10, vehicle_driver_id: vehicleDriverId}
  })
    .then((response) => {
      return response.data
    })
    .catch((err) => err);

export const addPayment = (params) => httpPost('/vehicle_payments', params)