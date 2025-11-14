import axios from "axios";

import { API_URL } from "@/constants/srcConstants";
import { httpPost } from "@/src/requests";

export const fetchUserVehicles = ({ pageParam = 1 }) =>
  axios
    .get(`${API_URL}/vehicles`, {
      params: { page: pageParam, per_page: 5 },
    })
    .then((response) => {
      console.log("user_vehicle user_vehicle", response.data);
      return response.data;
    })
    .catch((err) => err);

type FetchPaymentsParams = {
  pageParam: number;
  vehicleDriverId: string;
};

export const fetchPayments = ({
  pageParam = 1,
  vehicleDriverId,
}: FetchPaymentsParams) =>
  axios
    .get(`${API_URL}/vehicle_payments`, {
      params: { page: pageParam, vehicle_driver_id: vehicleDriverId },
    })
    .then((response) => {
      console.log("PAYMENTS PAYMENTS PAYMENTS", response.data.paginate);
      return response.data;
    })
    .catch((err) => err);

export const fetchApplications = ({ pageParam = 1, vehicleId }) =>
  axios
    .get(`${API_URL}/vehicle_applications`, {
      params: { page: pageParam, page_size: 5, vehicle_id: vehicleId },
    })
    .then((response) => {
      console.log("APPLICATIONS APPLICATIONS APPLICATIONS", response.data);
      return response.data;
    })
    .catch((err) => err);

export const setApplicationsSeen = (vehicleId: string) =>
  httpPost("/vehicle_applications/application_seen", { id: vehicleId });

export const addPayment = (params: Partial<Payment>) =>
  httpPost("/vehicle_payments", params);

export const createVehicleDriver = (params: {
  driver_id: string;
  vehicle_id: string;
}) => httpPost("/vehicle_drivers", params);
