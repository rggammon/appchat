import React from "react";
import { useMsal } from "@azure/msal-react";

export default function MicrosoftLoginButton() {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginRedirect();
  };
  return <button onClick={handleLogin}>Sign in with Microsoft</button>;
}
