import { useEffect } from "react";
import "react-native-reanimated";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useColorScheme } from "../components/useColorScheme";
import { AuthProvider, useAuth } from "../authContext";
import { AuthScreen } from "../screens/SignUp";
import { UseCustomQueryProvider } from "../useQueryContext";
import { PaginatedCacheProvider } from "../updateCacheProvider";
import { MessagesProvider } from "../screens/Messages/MessagesProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    CinzelDecorativeBold: require("../../assets/fonts/CinzelDecorative-Bold.ttf"),
    Cinzel: require("../../assets/fonts/Cinzel-VariableFont_wght.ttf"),
    ...FontAwesome.font,
  });

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, fontsLoaded]);

  if (!loaded || !fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

type LayoutProps = {};

function RootLayoutNav() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // data fresh for 5 min
        cacheTime: 1000 * 60 * 10, // keep cache 10 min after unused
        refetchOnWindowFocus: false, // don't refetch when tab regains focus
        refetchOnReconnect: false, // optional: don't refetch on network reconnect
      },
    },
  });

  const theme = {
    ...MD3LightTheme,
    fonts: {
      ...MD3LightTheme.fonts,
      default: { fontFamily: "Poppins_400Regular" },
      bodyLarge: { fontFamily: "Poppins_400Regular" },
      bodyMedium: { fontFamily: "Poppins_400Regular" },
      labelLarge: { fontFamily: "Poppins_500Medium" },
      titleLarge: { fontFamily: "Poppins_600SemiBold" },
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PaginatedCacheProvider>
        <UseCustomQueryProvider>
          <AuthProvider>
            <MessagesProvider>
              <PaperProvider theme={theme}>
                <Layout />
              </PaperProvider>
            </MessagesProvider>
          </AuthProvider>
        </UseCustomQueryProvider>
      </PaginatedCacheProvider>
    </QueryClientProvider>
  );
}

const Layout = (props: LayoutProps) => {
  const colorScheme = useColorScheme();
  const { authState } = useAuth();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {!authState?.authenticated ? (
        <AuthScreen />
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="drivers" options={{ headerShown: false }} />
          <Stack.Screen name="vehicles" options={{ headerShown: false }} />
          <Stack.Screen name="profileSetup" options={{ headerShown: false }} />
          <Stack.Screen name="posts" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen name="chats" options={{ headerShown: false }} />
          <Stack.Screen name="payments" options={{ headerShown: false }} />
        </Stack>
      )}
    </ThemeProvider>
  );
};
