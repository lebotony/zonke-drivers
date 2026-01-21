import { useEffect } from "react";
import { router } from "expo-router";
import { View } from "react-native";
import { useAuth } from "../authContext";
import { Spinner } from "./elements/Spinner";

/**
 * Higher-order component that protects routes requiring authentication.
 * Redirects to auth screen if user is not authenticated.
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { authState } = useAuth();

    useEffect(() => {
      // Check if auth state has been determined and user is not authenticated
      if (authState?.authenticated === false) {
        // Redirect to root (will show AuthScreen in _layout.tsx)
        router.replace("/");
      }
    }, [authState?.authenticated]);

    // Show loading spinner while auth state is being determined
    if (authState?.authenticated === null) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Spinner />
        </View>
      );
    }

    // Don't render the component if not authenticated
    if (!authState?.authenticated) {
      return null;
    }

    // User is authenticated, render the component
    return <Component {...props} />;
  };
};
