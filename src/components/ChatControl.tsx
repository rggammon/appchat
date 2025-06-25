import React from "react";
import { Button, Input } from "@fluentui/react-components";
import { tokens } from "@fluentui/react-theme";
import { useMsal } from "@azure/msal-react";
import { useApiConfig } from "../context/ApiConfigContext";
import { useChatApi } from "../hooks/useChatApi";

interface ChatControlProps {
  userName: string;
}

export default function ChatControl({ userName }: ChatControlProps) {
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
    <div style={{ width: 400, maxWidth: "100%", background: tokens.colorNeutralBackground1, borderRadius: 12, boxShadow: `0 2px 8px ${tokens.colorNeutralBackground2}33`, padding: 16, margin: "32px 0" }}>
      <div style={{ height: 240, overflowY: "auto", marginBottom: 12, background: tokens.colorBrandBackground, borderRadius: 8, padding: 8, border: `1px solid ${tokens.colorNeutralBackground2}` }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 8, textAlign: msg.sender === userName ? "right" : "left" }}>
            <span style={{ fontWeight: 600, color: msg.sender === userName ? tokens.colorBrandForeground1 : tokens.colorNeutralForeground1 }}>{msg.sender}:</span>
            <span style={{ marginLeft: 6, color: tokens.colorNeutralForeground2 }}>{msg.text}</span>
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
        <Button appearance="primary" onClick={() => sendMessage(userName)} disabled={loading || !input.trim()} style={{ background: tokens.colorBrandForeground1, color: "#fff" }}>
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
