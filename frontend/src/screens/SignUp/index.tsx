import React from "react";

import { LoginScreen } from "./Scene/ui/login";

type AuthScreenProps = {
  toggleSales: () => void;
};

export const AuthScreen = (props: AuthScreenProps) => {
  const { toggleSales } = props;

  return <LoginScreen toggleSales={toggleSales} />;
};
