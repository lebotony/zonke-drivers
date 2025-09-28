import { API_URL } from "@/constants/srcConstants";
import { httpGet, httpPost } from "@/src/requests";
import axios from "axios";

export const fetchUserThreads = async ({ pageParam = 1 }) =>
  axios
    .get(`${API_URL}/threads/user_threads`, {
    params: { page: pageParam, per_page: 10 }
  })
    .then((response) => {
      return response.data
    })
    .catch((err) => err);

export const fetchThreadMessages = async (threadId: string) => httpGet('/messages', { thread_id: threadId })

export const sendMessage = async (params: MessageParams) => httpPost('/messages', params)

export const setSeenTrue = async (threadId: string) => httpPost('/threads/messages_seen', {thread_id: threadId})

export const initializeThread = async (userId: string) => httpPost("/initialize_thread", { user_id: userId })

