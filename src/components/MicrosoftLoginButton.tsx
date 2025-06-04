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

export default function MicrosoftLoginButton() {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginRedirect();
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
