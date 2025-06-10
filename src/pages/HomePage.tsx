import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { appInsights } from "../main";
import ChatControl from "../components/ChatControl";

// Earth tone palette
const earthBackground = "#f5f3ea";
const earthHeaderFooter = "#b7a77a";
const earthHeaderText = "#4e3d1c";
const earthMainText = "#6b4f27";
const earthAccent = "#a67c52";

// Placeholder for Azure AI Foundry chat API call
async function sendMessageToAzureAI(message: string, user: string): Promise<string> {
  // TODO: Replace with actual Azure AI Foundry API call
  // This is a mock response for demonstration
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Azure AI: Hello ${user}, you said: "${message}" 🥔`);
    }, 1000);
  });
}

export default function HomePage() {
  const { accounts } = useMsal();
  const user = accounts[0];
  const userName = user?.name || "User";
  const userEmail = user?.username || "";
  const userId = user?.localAccountId || user?.homeAccountId || undefined;

  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([
    { sender: "Azure AI", text: "Hi! I'm your potato-powered chat assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userEmail && userId && appInsights?.setAuthenticatedUserContext) {
      appInsights.setAuthenticatedUserContext(userEmail, userId);
    }
  }, [userEmail, userId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: userName, text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    const aiReply = await sendMessageToAzureAI(input, userName);
    setMessages((msgs) => [...msgs, { sender: "Azure AI", text: aiReply }]);
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: earthBackground }}>
      <header style={{ background: earthHeaderFooter, padding: "1rem", borderBottom: `1px solid ${earthAccent}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0, color: earthHeaderText }}>Vibetato</h1>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 500, color: earthHeaderText }}>{userName}</div>
          <div style={{ fontSize: "0.9em", color: earthMainText }}>{userEmail}</div>
        </div>
      </header>
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        {/* Chat Control */}
        <ChatControl
          messages={messages}
          input={input}
          loading={loading}
          userName={userName}
          chatAccent={earthAccent}
          chatHeaderText={earthHeaderText}
          chatMainText={earthMainText}
          onInputChange={setInput}
          onSend={handleSend}
        />
      </main>
      <footer style={{ background: earthHeaderFooter, padding: "0.5rem", borderTop: `1px solid ${earthAccent}`, textAlign: "center" }}>
        <small style={{ color: earthHeaderText }}>&copy; {new Date().getFullYear()} Vibetato</small>
      </footer>
    </div>
  );
}
