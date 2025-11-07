import { httpGet, httpPost } from "@/src/requests";

export const createThread = (params) => httpPost('/threads', params)

export const fetchDriverProfile = async (driverId: string) => httpGet('/drivers/show_public', { id: driverId })

