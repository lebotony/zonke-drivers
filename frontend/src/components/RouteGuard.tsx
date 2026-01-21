import { useEffect } from "react";
import { router, useSegments } from "expo-router";
import { useAuth } from "../authContext";

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    // Only run when auth state is determined (not null)
    if (authState?.authenticated === null) return;

    const inAuthGroup = segments[0] === "(tabs)";
    const inProtectedRoute = [
      "drivers",
      "vehicles",
      "details",
      "comments",
      "chats",
      "posts",
      "applicants",
      "interestedBuyers",
      "vehicleDriverSearch",
      "chooseVehicle",
      "previewCard",
      "profileSetup",
    ].includes(segments[0] as string);

    // Allow access to vehicleSales without authentication
    const inPublicRoute = segments[0] === "vehicleSales";

    if (!authState?.authenticated && (inAuthGroup || inProtectedRoute) && !inPublicRoute) {
      // User is not authenticated but trying to access protected route
      // Redirect handled by _layout.tsx showing AuthScreen
      console.log("Unauthorized access attempt to:", segments.join("/"));
    }
  }, [authState?.authenticated, segments]);

  return <>{children}</>;
};
