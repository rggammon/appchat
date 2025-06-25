import { Button } from "@fluentui/react-components";
import { useMsal } from "@azure/msal-react";
import React from "react";

const microsoftBlue = "#2F2FEE";
const microsoftLogo = (
  <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginRight: 8 }}>
    <rect width="9" height="9" x="1" y="1" fill="#F35325" />
    <rect width="9" height="9" x="10" y="1" fill="#81BC06" />
    <rect width="9" height="9" x="1" y="10" fill="#05A6F0" />
    <rect width="9" height="9" x="10" y="10" fill="#FFBA08" />
  </svg>
);

const msalConfig = {
  auth: {
    clientId: "acabfe2e-11cd-4ce0-acbe-94ee0548ead3",
    authority: "https://login.microsoftonline.com/consumers",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

// Add the Azure AI Foundry API scope to the initial login request
const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "email",
    import.meta.env.VITE_AZURE_AI_SCOPE,
  ],
};

export default function MicrosoftLoginButton() {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };
  return (
    <Button
      appearance="primary"
      onClick={handleLogin}
      style={{
        background: "#fff",
        color: microsoftBlue,
        border: `1px solid ${microsoftBlue}`,
        fontWeight: 600,
        fontSize: 16,
        boxShadow: "0 1px 2px #0001",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 16px",
        minWidth: 220,
      }}
      icon={microsoftLogo}
    >
      Sign in with Microsoft
    </Button>
  );
}
