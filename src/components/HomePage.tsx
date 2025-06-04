import React from "react";
import { Button } from "@fluentui/react-components";
import { useMsal } from "@azure/msal-react";

// Earth tone palette
const earthBackground = "#f5f3ea";
const earthHeaderFooter = "#b7a77a";
const earthHeaderText = "#4e3d1c";
const earthMainText = "#6b4f27";
const earthAccent = "#a67c52";

export default function HomePage() {
  const { accounts } = useMsal();
  const user = accounts[0];
  const userName = user?.name || "User";
  const userEmail = user?.username || "";
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: earthBackground }}>
      <header style={{ background: earthHeaderFooter, padding: "1rem", borderBottom: `1px solid ${earthAccent}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0, color: earthHeaderText }}>Vibetato</h1>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 500, color: earthHeaderText }}>{userName}</div>
          <div style={{ fontSize: "0.9em", color: earthMainText }}>{userEmail}</div>
        </div>
      </header>
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ color: earthMainText }}>Welcome, {userName}! You are signed in.</h2>
        <Button appearance="primary" style={{ background: earthAccent, color: "#fff", border: "none" }}>Sign out</Button>
      </main>
      <footer style={{ background: earthHeaderFooter, padding: "0.5rem", borderTop: `1px solid ${earthAccent}`, textAlign: "center" }}>
        <small style={{ color: earthHeaderText }}>&copy; {new Date().getFullYear()} Vibetato</small>
      </footer>
    </div>
  );
}
