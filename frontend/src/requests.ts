import { API_URL } from "@/constants/srcConstants";
import axios from "axios";

export const httpGet = (
  path: string,
  params?: unknown
) =>
  axios
    .get(`${API_URL}${path}`, { params: params })
    .then((response) => response.data)
    .catch((err) => err);

export const httpPost = (
  path: string,
  params: object | string,
) =>
  axios
    .post(`${API_URL}${path}`, params)
    .then((response) => response.data)
    .catch((err) => err);

export const httpPut = (
  path: string,
  id: string,
  params: object | string
) =>
  axios
    .put(`${API_URL}${path}/${id}`, params)
    .then((response) => response.data)
    .catch((err) => err);

export const httpDelete = (path: string, id: string) =>
  axios
    .delete(`${API_URL}${path}/${id}`)
    .then((response) => response.data)
    .catch((err) => err);