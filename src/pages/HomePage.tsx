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

// Azure AI Foundry API endpoint and scope
const AZURE_AI_API_URL = import.meta.env.VITE_AZURE_AI_API_URL; // e.g. https://your-ai-foundry.azurewebsites.net/chat
const AZURE_AI_SCOPE = import.meta.env.VITE_AZURE_AI_SCOPE; // e.g. api://<your-ai-app-id>/.default

const SENDER_NAME = "Vibetato"; // Default sender name for the AI assistant

export default function HomePage() {
  const { instance, accounts } = useMsal();
  const user = accounts[0];
  const userName = user?.name || "User";
  const userEmail = user?.username || "";
  const userId = user?.localAccountId || user?.homeAccountId || undefined;

  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([
    { sender: SENDER_NAME, text: "Hi! I'm your potato-powered chat assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userEmail && userId && appInsights?.setAuthenticatedUserContext) {
      appInsights.setAuthenticatedUserContext(userEmail, userId);
    }
  }, [userEmail, userId]);

  // Send message to Azure AI Foundry with MSAL authentication
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: userName, text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      // Acquire token for Azure AI Foundry
      let accessToken = "";
      try {
        const tokenResponse = await instance.acquireTokenSilent({
          account: user,
          scopes: [AZURE_AI_SCOPE],
        });
        accessToken = tokenResponse.accessToken;
      } catch (tokenError: any) {
        // If interaction is required, prompt the user interactively
        if (
          tokenError.errorCode === "interaction_required"
        ) {
          try {
            const tokenResponse = await instance.acquireTokenPopup({
              account: user,
              scopes: [AZURE_AI_SCOPE],
            });
            accessToken = tokenResponse.accessToken;
          } catch (popupError) {
            setMessages((msgs) => [...msgs, { sender: SENDER_NAME, text: `Authentication required. Please sign in again.` }]);
            setLoading(false);
            return;
          }
        } else {
          throw tokenError;
        }
      }
      // Call Azure AI Foundry API
      const chatPayload = {
        model: "gpt-4o", // Include model if your backend expects it
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input }
        ],
        max_tokens: 50
      };
      const response = await fetch(AZURE_AI_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatPayload),
      });
      if (!response.ok) throw new Error(`AI API error: ${response.status}`);
      const data = await response.json();
      setMessages((msgs) => [...msgs, { sender: SENDER_NAME, text: data.reply || data.choices?.[0]?.message?.content || "(No response)" }]);
    } catch (err: any) {
      setMessages((msgs) => [...msgs, { sender: SENDER_NAME, text: `Error: ${err.message}` }]);
      appInsights?.trackException?.({ exception: err });
    } finally {
      setLoading(false);
    }
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
