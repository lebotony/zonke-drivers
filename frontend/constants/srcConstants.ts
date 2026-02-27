import { Platform } from "react-native";

export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

export const API_URL = "https://zonkedrivers.com/api";
export const SOCKET_URL = "wss://zonkedrivers.com/socket";
