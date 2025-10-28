import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import * as SecureStore from "expo-secure-store";

import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

import { Platform } from "react-native";
import { disconnectSocket, initializeSocket } from "./socket";
import { httpGet, httpPost } from "./requests";
import { useCustomQuery } from "./useQueryContext";

export const TOKEN_KEY = "my_jwt";

export const getItem = async (token_key: string) => {
  if (Platform.OS === "web") {
    return localStorage.getItem(token_key);
  } else {
    return await SecureStore.getItemAsync(token_key);
  }
};

export const setItem = async (token_key: string, value: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem(token_key, value);
  } else {
    await SecureStore.setItemAsync(token_key, value);
  }
};

export const deleteItem = async (token_key: string) => {
  if (Platform.OS === "web") {
    localStorage.removeItem(token_key);
  } else {
    await SecureStore.deleteItemAsync(token_key);
  }
};

type AuthProps = {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (params: SignUp) => Promise<any>;
  onLogin?: (params: SignIn) => Promise<any>;
  onLogout?: () => Promise<void>;
};

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const queryClient = useQueryClient();
  const { getCachedData } = useCustomQuery();
  const { user, socket } = getCachedData(["user", "socket"]);

  useEffect(() => {
    const initSocket = async () => {
      if (authState.authenticated) {
        try {
          initializeSocket().then((sock) =>
            queryClient.setQueryData(["socket"], sock)
          );
          console.log("Socket connected after authentication");
        } catch (error) {
          console.error("Socket connection failed:", error);
          throw error;
        }
      }
    };

    initSocket();

    return () => {
      disconnectSocket();
    };
  }, [authState.authenticated]);

  useEffect(() => {
    if (!socket || !user) return;

    const userChannel = socket?.channel(`users:${user?.id}`);

    userChannel
      ?.join()
      .receive("ok", () => console.log("joined user channel"))
      .receive("error", (err: Error) =>
        console.error("failed to join user channel", err)
      );

    queryClient.setQueryData(["userChannel"], userChannel);

    return () => {
      userChannel?.leave();
    };
  }, [socket, user?.id]);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getItem(TOKEN_KEY);

      if (token) {
        setAuthState({ token, authenticated: true });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        fetchUser();
      }
    };
    loadToken();
  }, []);

  const fetchUser = async () =>
    httpGet("/session/current_user")
      .then((response) => {
        console.log("FECTH_USER FECTH_USER ", response);
        queryClient.setQueryData(["user"], response);
      })
      .catch((err) => {
        if (
          err?.response?.statusText == "Not Found" ||
          err.response.status == 404
        ) {
          logout();
        }
      });

  const register = async (params: SignUp) => {
    return httpPost("/users/register_user", params)
      .then((_response) => {
        const { username, password } = params;
        return login({ username, password });
      })
      .catch((err) => {
        const message =
          err?.response?.data?.error || err.message || "Registration failed";
        return Promise.reject(new Error(message));
      });
  };

  const login = (params: SignIn) => {
    return httpPost("/session/current_session", params)
      .then(async (response: Session) => {
        if (!response?.jwt)
          return Promise.reject(new Error("Invalid response from server"));

        setAuthState({ token: response.jwt, authenticated: true });
        await setItem(TOKEN_KEY, response.jwt);

        console.log("LOGIN LOGIN LOGIN LOGIN", response.user);

        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.jwt}`;

        queryClient.setQueryData(["token"], response.jwt);
        queryClient.setQueryData(["user"], response.user);

        return response;
      })
      .catch((err) => {
        const message =
          err?.response?.data?.error || err.message || "Login failed";
        return Promise.reject(new Error(message));
      });
  };

  const logout = async () => {
    disconnectSocket();
    await deleteItem(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
    queryClient.clear();
  };

  const value = {
    authState: authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
