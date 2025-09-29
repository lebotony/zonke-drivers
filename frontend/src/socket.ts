import { Socket } from "phoenix";
import { Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';

import { SOCKET_URL } from "@/constants/srcConstants";
import { TOKEN_KEY } from "./authContext";

export let socketInstance: Socket | null = null;
let token: string | null = null;

const getToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(TOKEN_KEY);
  } else {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }
};

// Initialize during app startup
export const initializeSocket = async () => {
  token = await getToken();

  socketInstance = new Socket(SOCKET_URL, {
    params: { token },
    transport: window.WebSocket,
  });

  socketInstance.connect();
  return socketInstance;
};

export const getSocket = () => {
  if (!socketInstance) {
    throw new Error("Socket not initialized. Call initializeSocket() first.");
  }
  return socketInstance;
};

export const disconnectSocket = (): void => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};