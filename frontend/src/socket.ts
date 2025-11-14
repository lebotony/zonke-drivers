import { Socket } from "phoenix";

import { SOCKET_URL } from "@/constants/srcConstants";
import { getItem, TOKEN_KEY } from "./authContext";

export let socketInstance: Socket | null = null;
let token: string | null = null;

// Initialize during app startup
export const initializeSocket = async () => {
  token = await getItem(TOKEN_KEY);

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
