import React from "react";
import { Button, Input } from "@fluentui/react-components";

interface ChatControlProps {
  messages: { sender: string; text: string }[];
  input: string;
  loading: boolean;
  userName: string;
  chatAccent: string;
  chatHeaderText: string;
  chatMainText: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

const earthBackground = "#f5f3ea";
const earthHeaderFooter = "#b7a77a";

export default function ChatControl({
  messages,
  input,
  loading,
  userName,
  chatAccent,
  chatHeaderText,
  chatMainText,
  onInputChange,
  onSend,
}: ChatControlProps) {
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
          onChange={(_, d) => onInputChange(d.value)}
          placeholder="Type your message..."
          style={{ flex: 1 }}
          onKeyDown={e => { if (e.key === "Enter") onSend(); }}
          disabled={loading}
        />
        <Button appearance="primary" onClick={onSend} disabled={loading || !input.trim()} style={{ background: chatAccent, color: "#fff" }}>
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
