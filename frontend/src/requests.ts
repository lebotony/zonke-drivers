import { API_URL } from "@/constants/srcConstants";
import axios from "axios";

axios.defaults.timeout = 15000;

export const httpGet = (path: string, params?: unknown) =>
  axios
    .get(`${API_URL}${path}`, { params: params })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err));

export const httpPost = (path: string, params: object | string) =>
  axios
    .post(`${API_URL}${path}`, params)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err));

export const httpPut = (path: string, id: string, params: object | string) =>
  axios
    .put(`${API_URL}${path}/${id}`, params)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err));

export const httpDelete = (path: string, idOrData?: string | object) => {
  if (typeof idOrData === 'string') {
    return axios
      .delete(`${API_URL}${path}/${idOrData}`)
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  } else {
    return axios
      .delete(`${API_URL}${path}`, { data: idOrData })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  }
};
