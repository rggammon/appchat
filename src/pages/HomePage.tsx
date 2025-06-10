import React, { useState } from "react";
import { Button, Input } from "@fluentui/react-components";
import { useMsal } from "@azure/msal-react";

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

  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([
    { sender: "Azure AI", text: "Hi! I'm your potato-powered chat assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
        <div style={{ width: 400, maxWidth: "100%", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #b7a77a33", padding: 16, margin: "32px 0" }}>
          <div style={{ height: 240, overflowY: "auto", marginBottom: 12, background: "#f5f3ea", borderRadius: 8, padding: 8, border: `1px solid ${earthHeaderFooter}` }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: 8, textAlign: msg.sender === userName ? "right" : "left" }}>
                <span style={{ fontWeight: 600, color: msg.sender === userName ? earthAccent : earthHeaderText }}>{msg.sender}:</span>
                <span style={{ marginLeft: 6, color: earthMainText }}>{msg.text}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Input
              value={input}
              onChange={(_, d) => setInput(d.value)}
              placeholder="Type your message..."
              style={{ flex: 1 }}
              onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
              disabled={loading}
            />
            <Button appearance="primary" onClick={handleSend} disabled={loading || !input.trim()} style={{ background: earthAccent, color: "#fff" }}>
              {loading ? "..." : "Send"}
            </Button>
          </div>
        </div>
      </main>
      <footer style={{ background: earthHeaderFooter, padding: "0.5rem", borderTop: `1px solid ${earthAccent}`, textAlign: "center" }}>
        <small style={{ color: earthHeaderText }}>&copy; {new Date().getFullYear()} Vibetato</small>
      </footer>
    </div>
  );
}
