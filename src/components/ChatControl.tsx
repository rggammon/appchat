import React from "react";
import { Button, Input } from "@fluentui/react-components";
import { useMsal } from "@azure/msal-react";
import { useApiConfig } from "../context/ApiConfigContext";
import { useChatApi } from "../hooks/useChatApi";

interface ChatControlProps {
  userName: string;
  chatAccent: string;
  chatHeaderText: string;
  chatMainText: string;
}

const earthBackground = "#f5f3ea";
const earthHeaderFooter = "#b7a77a";

export default function ChatControl({
  userName,
  chatAccent,
  chatHeaderText,
  chatMainText,
}: ChatControlProps) {
  const { instance, accounts } = useMsal();
  const account = accounts[0];
  const { apiUrl, apiScope, senderName } = useApiConfig();
  const {
    messages,
    input,
    loading,
    setInput,
    sendMessage,
  } = useChatApi({
    instance,
    account,
    apiUrl,
    apiScope,
    senderName,
  });

  return (
    <div style={{ width: 400, maxWidth: "100%", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #b7a77a33", padding: 16, margin: "32px 0" }}>
      <div style={{ height: 240, overflowY: "auto", marginBottom: 12, background: earthBackground, borderRadius: 8, padding: 8, border: `1px solid ${earthHeaderFooter}` }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 8, textAlign: msg.sender === userName ? "right" : "left" }}>
            <span style={{ fontWeight: 600, color: msg.sender === userName ? chatAccent : chatHeaderText }}>{msg.sender}:</span>
            <span style={{ marginLeft: 6, color: chatMainText }}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Input
          value={input}
          onChange={(_, d) => setInput(d.value)}
          placeholder="Type your message..."
          style={{ flex: 1 }}
          onKeyDown={e => { if (e.key === "Enter") sendMessage(userName); }}
          disabled={loading}
        />
        <Button appearance="primary" onClick={() => sendMessage(userName)} disabled={loading || !input.trim()} style={{ background: chatAccent, color: "#fff" }}>
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
