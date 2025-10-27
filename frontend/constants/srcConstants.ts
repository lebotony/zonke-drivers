import { Platform } from "react-native";

export const IS_IOS = Platform.OS === 'ios'

export const API_URL =
  !IS_IOS
    ? 'http://192.168.1.106:4000/api'
    : Platform.OS === 'ios'
    ? 'http://localhost:4000/api'
    : 'http://localhost:4000/api';


export const SOCKET_URL =
  !IS_IOS
    ? "ws://192.168.1.106:4000/socket"
    : Platform.OS === 'ios'
    ? "ws://localhost:4000/socket"
    : "ws://localhost:4000/socket";