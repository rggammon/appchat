import { useState } from "react";
import { appInsights } from "../main";

export interface ChatMessage {
  sender: string;
  text: string;
}

export interface UseChatApiOptions {
  instance: any;
  account: any;
  apiUrl: string;
  apiScope: string;
  senderName?: string;
}

export function useChatApi({
  instance,
  account,
  apiUrl,
  apiScope,
  senderName = "Vibetato",
}: UseChatApiOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: senderName,
      text: "Hi! I'm your potato-powered chat assistant. Ask me anything!",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const sendMessage = async (userName: string) => {
    if (!input.trim()) return;
    const userMsg = { sender: userName, text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      let accessToken = "";
      try {
        const tokenResponse = await instance.acquireTokenSilent({
          account,
          scopes: [apiScope],
        });
        accessToken = tokenResponse.accessToken;
      } catch (tokenError: any) {
        if (tokenError.errorCode === "interaction_required") {
          try {
            const tokenResponse = await instance.acquireTokenPopup({
              account,
              scopes: [apiScope],
            });
            accessToken = tokenResponse.accessToken;
          } catch (popupError) {
            setMessages((msgs) => [
              ...msgs,
              {
                sender: senderName,
                text: `Authentication required. Please sign in again.`,
              },
            ]);
            setLoading(false);
            return;
          }
        } else {
          throw tokenError;
        }
      }
      const chatPayload = {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input },
        ],
        max_tokens: 50,
      };
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatPayload),
      });
      if (!response.ok) throw new Error(`AI API error: ${response.status}`);
      const data = await response.json();
      setMessages((msgs) => [
        ...msgs,
        {
          sender: senderName,
          text:
            data.reply ||
            data.choices?.[0]?.message?.content ||
            "(No response)",
        },
      ]);
    } catch (err: any) {
      setMessages((msgs) => [
        ...msgs,
        { sender: senderName, text: `Error: ${err.message}` },
      ]);
      appInsights?.trackException?.({ exception: err });
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    loading,
    sendMessage,
  };
}
