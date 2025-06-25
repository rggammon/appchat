import React from "react";
import { useMsal } from "@azure/msal-react";
import ChatControl from "../components/ChatControl";
import { tokens } from "@fluentui/react-theme";
import BottomNav from "../components/BottomNav";
import TopNav from "../components/TopNav";

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: tokens.colorBrandBackground }}>
      <TopNav />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <ChatControl />
      </main>
      <BottomNav />
    </div>
  );
}
