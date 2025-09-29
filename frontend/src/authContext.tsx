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

export const TOKEN_KEY = "my_jwt";

const getToken = async () => {
  if (Platform.OS === "web") {
    return localStorage.getItem(TOKEN_KEY);
  } else {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  }
};

const setToken = async (token: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  }
};

const deleteToken = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
};

type AuthProps = {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (params: SignUp) => Promise<void>;
  onLogin?: (params: SignIn) => Promise<void>;
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

  useEffect(() => {
    const initSocket = async () => {
      if (authState.authenticated) {
        try {
          await initializeSocket();
          console.log("Socket connected after authentication");
        } catch (error) {
          console.error("Socket connection failed:", error);
        }
      }
    };

    initSocket();

    return () => {
      disconnectSocket();
    };
  }, [authState.authenticated]);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();

      if (token) {
        setAuthState({ token, authenticated: true });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // fetchUser();
      }
    };
    loadToken();
  }, []);

  const fetchUser = async () =>
    httpGet("/session/current_user")
      .then((response) => {
        queryClient.setQueryData(["user"], response);
      })
      .catch((err) => err);

  const register = async (params: SignUp) =>
    httpPost("/users/register_user", params)
      .then((_response) => {
        const { email, password } = params;
        login({ email, password });
      })
      .catch((err) => err);

  const login = (params: SignIn) =>
    httpPost("/session/current_session", params)
      .then(async (response: Session) => {
        setAuthState({ token: response.jwt, authenticated: true });
        await setToken(response.jwt);

        console.log("SSSSSSSSSSSSSSSSSSSSSSSSSS", response.user);

        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.jwt}`;

        queryClient.setQueryData(["token"], response.jwt);
        queryClient.setQueryData(["user"], response.user);
      })
      .catch((error) => error);

  const logout = async () => {
    await deleteToken();
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
  };

  const value = {
    authState: authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
