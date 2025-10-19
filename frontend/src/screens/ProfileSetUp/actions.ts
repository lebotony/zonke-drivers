import { httpPost } from "@/src/requests";

export const createDriver = (params) => {
  console.log("KKKKKKKKKKKKKKKKK")
  httpPost('/driver', params)
}