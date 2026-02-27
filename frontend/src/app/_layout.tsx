import { useEffect, useState } from "react";
import "react-native-reanimated";

import Toast from "react-native-toast-message";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, router, useSegments } from "expo-router";
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
import { VehicleSalesScreen } from "../screens/VehicleSales";
import { UseCustomQueryProvider, useCustomQuery } from "../useQueryContext";
import { PaginatedCacheProvider } from "../updateCacheProvider";
import { MessagesProvider } from "../screens/Messages/MessagesProvider";
import { CustomToast } from "../components/CustomToast";

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

function RootLayoutNav() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // data fresh for 5 min
        gcTime: 1000 * 60 * 10, // keep cache 10 min after unused
        refetchOnWindowFocus: false, // don't refetch when tab regains focus
        refetchOnReconnect: false, // optional: don't refetch on network reconnect
      },
    },
  }));

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
                <Toast
                  config={{
                    customToast: (props) => <CustomToast {...props} />,
                  }}
                  visibilityTime={2500}
                />
              </PaperProvider>
            </MessagesProvider>
          </AuthProvider>
        </UseCustomQueryProvider>
      </PaginatedCacheProvider>
    </QueryClientProvider>
  );
}

const Layout = () => {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const { authState, pendingVehicleId, setPendingVehicleId } = useAuth();
  const { getCachedData } = useCustomQuery();
  const { user } = getCachedData(["user"]);
  const [sales, setSales] = useState(false);

  console.log("LLLLLLLLLLLLLL", user?.location);

  const toggleSales = () => setSales(!sales);

  useEffect(() => {
    const isOnOnboardingScreen = segments[0] === "onboarding";

    if (
      authState?.authenticated &&
      pendingVehicleId &&
      user &&
      !isOnOnboardingScreen
    ) {
      const needsOnboarding =
        user.role === "driver" && user.onboarding_complete === false;

      if (!needsOnboarding) {
        router.replace("/(tabs)/purchase");
      }
    }
  }, [authState?.authenticated, pendingVehicleId, user, segments]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {sales ? (
        <VehicleSalesScreen
          toggleSales={toggleSales}
          targetVehicleId={null}
          onVehicleViewed={() => {}}
        />
      ) : !authState?.authenticated ? (
        <AuthScreen toggleSales={toggleSales} />
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="profileSetup" options={{ headerShown: false }} />
          <Stack.Screen name="posts" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen name="chats" options={{ headerShown: false }} />
          <Stack.Screen name="previewCard" options={{ headerShown: false }} />
          <Stack.Screen name="applicants" options={{ headerShown: false }} />
          <Stack.Screen name="chooseVehicle" options={{ headerShown: false }} />
          <Stack.Screen
            name="vehicleDriverSearch"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="interestedBuyers"
            options={{ headerShown: false }}
          />
          {/* Protected routes with auth guards */}
          <Stack.Screen name="drivers" options={{ headerShown: false }} />
          <Stack.Screen name="vehicles" options={{ headerShown: false }} />
          <Stack.Screen name="owners" options={{ headerShown: false }} />
          <Stack.Screen name="details" options={{ headerShown: false }} />
          <Stack.Screen name="comments" options={{ headerShown: false }} />
          <Stack.Screen name="vehicleSales" options={{ headerShown: false }} />
        </Stack>
      )}
    </ThemeProvider>
  );
};
