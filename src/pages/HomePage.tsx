import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { appInsights } from "../main";
import ChatControl from "../components/ChatControl";
import { tokens } from "@fluentui/react-theme";

export default function HomePage() {
  const { accounts } = useMsal();
  const user = accounts[0];
  const userName = user?.name || "User";
  const userEmail = user?.username || "";
  const userId = user?.localAccountId || user?.homeAccountId || undefined;

  useEffect(() => {
    if (userEmail && userId && appInsights?.setAuthenticatedUserContext) {
      appInsights.setAuthenticatedUserContext(userEmail, userId);
    }
  }, [userEmail, userId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: tokens.colorBrandBackground }}>
      <header style={{ background: tokens.colorNeutralBackground2, padding: "1rem", borderBottom: `1px solid ${tokens.colorBrandForeground1}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0, color: tokens.colorNeutralForeground1 }}>Vibetato</h1>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 500, color: tokens.colorNeutralForeground1 }}>{userName}</div>
          <div style={{ fontSize: "0.9em", color: tokens.colorNeutralForeground2 }}>{userEmail}</div>
        </div>
      </header>
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        {/* Chat Control */}
        <ChatControl userName={userName} />
      </main>
      <footer style={{ background: tokens.colorNeutralBackground2, padding: "0.5rem", borderTop: `1px solid ${tokens.colorBrandForeground1}`, textAlign: "center" }}>
        <small style={{ color: tokens.colorNeutralForeground1 }}>&copy; {new Date().getFullYear()} Vibetato</small>
      </footer>
    </div>
  );
}
