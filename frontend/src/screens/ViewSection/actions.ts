import axios from "axios";

import { API_URL } from "@/constants/srcConstants";
import { httpPost } from "@/src/requests";

type FetchCommentsProps = {
  pageParam: number;
  driverId: string;
};

export const fetchComments = ({
  pageParam = 1,
  driverId,
}: FetchCommentsProps) =>
  axios
    .get(`${API_URL}/comments`, {
      params: { page: pageParam, driver_id: driverId },
    })
    .then((response) => {
      console.log("COMMENTS COMMENTS COMMENTS", response.data.paginate);
      return response.data;
    })
    .catch((err) => err);

export const createComment = (params) => httpPost("/comments", params);
