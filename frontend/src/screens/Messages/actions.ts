import axios from "axios";
import qs from "qs";

import { API_URL } from "@/constants/srcConstants";
import { httpGet, httpPost } from "@/src/requests";

export const fetchUserThreads = ({ pageParam = 1 }, filters) => {
  return axios
    .get(`${API_URL}/threads/user_threads`, {
      params: { page: pageParam, per_page: 10, filters },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "brackets" }),
    })
    .then((response) => {
      console.log("THRAEDS THRAEDS THRAEDS", response.data);
      return response.data;
    })
    .catch((err) => {
      throw new Error("Error while fetching messages: ", err);
    });
};

export const fetchThreadMessages = ({ pageParam = 1, threadId }) =>
  axios
    .get(`${API_URL}/messages`, {
      params: { page: pageParam, page_size: 15, thread_id: threadId },
    })
    .then((response) => {
      console.log("MESSAGES MESSAGES MESSAGES", response.data);
      return response.data;
    })
    .catch((err) => err);

export const setSeenTrue = (threadId: string) =>
  httpPost("/threads/messages_seen", { thread_id: threadId });

export const initializeThread = (userId: string) =>
  httpPost("/initialize_thread", { user_id: userId });
