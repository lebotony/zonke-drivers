import { httpPost } from "@/src/requests";

export const createThread = (params) => httpPost('/threads', params)