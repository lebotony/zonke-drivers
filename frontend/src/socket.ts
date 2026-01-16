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
    reconnectAfterMs: (tries) => {
      // Exponential backoff: 1s, 2s, 5s, 10s, then 10s
      return [1000, 2000, 5000, 10000][tries - 1] || 10000;
    },
    rejoinAfterMs: (tries) => {
      return [1000, 2000, 5000][tries - 1] || 5000;
    },
  });

  // Add connection state listeners
  socketInstance.onOpen(() => console.log("Socket connected"));
  socketInstance.onError(() => console.log("Socket error"));
  socketInstance.onClose(() => console.log("Socket disconnected"));

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
