import React from "react";
import { Button } from "@fluentui/react-components";
import { useMsal } from "@azure/msal-react";

export default function HomePage() {
  const { accounts } = useMsal();
  const user = accounts[0];
  const userName = user?.name || "User";
  const userEmail = user?.username || "";
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <header style={{ background: "#f3f2f1", padding: "1rem", borderBottom: "1px solid #e1dfdd", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>Vibetato</h1>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 500 }}>{userName}</div>
          <div style={{ fontSize: "0.9em", color: "#605e5c" }}>{userEmail}</div>
        </div>
      </header>
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2>Welcome, {userName}! You are signed in.</h2>
        <Button appearance="primary">Sign out</Button>
      </main>
      <footer style={{ background: "#f3f2f1", padding: "0.5rem", borderTop: "1px solid #e1dfdd", textAlign: "center" }}>
        <small>&copy; {new Date().getFullYear()} Vibetato</small>
      </footer>
    </div>
  );
}
