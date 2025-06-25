import { useState } from "react";
import { appInsights } from "../main";
import { useIdentity } from "./useIdentity";
import axios from "axios";

export interface ChatMessage {
  sender: string;
  text: string;
}

export interface UseChatApiOptions {
  apiUrl: string;
  apiScope: string;
  senderName?: string;
}

export function useChatApi({
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

  // Use useIdentity for token acquisition with overlay support
  const { acquireToken } = useIdentity();

  const sendMessage = async (userName: string) => {
    if (!input.trim()) return;
    const userMsg = { sender: userName, text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      let accessToken = "";
      try {
        const tokenResponse = await acquireToken([apiScope]);
        accessToken = tokenResponse.accessToken;
      } catch (tokenError: any) {
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
      const chatPayload = {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input },
        ],
        max_tokens: 50,
      };
      const response = await axios.post(apiUrl, chatPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
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
