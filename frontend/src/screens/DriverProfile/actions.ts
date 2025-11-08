import { API_URL } from "@/constants/srcConstants";
import { httpGet, httpPost } from "@/src/requests";
import axios from "axios";

export const createThread = (params) => httpPost('/threads', params)

export const fetchDriverProfile = async (driverId: string) => httpGet('/drivers/show_public', { id: driverId })

export const fetchComments = ({ pageParam = 1, driverId }) =>
  axios
    .get(`${API_URL}/comments`, {
      params: { page: pageParam, per_page: 5, driver_id: driverId},
    })
      .then((response) => {
        console.log("COMMENTS COMMENTS COMMENTS", response.data.paginate)
        return response.data
      })
      .catch((err) => err);