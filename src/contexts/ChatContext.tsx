"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ChatRoomData, Message } from "@/types/chat";
import { forumApi } from "@/lib/api/forums";
import { useAuth } from "@/contexts/AuthContext";

type ChatContextType = {
  currentRoom: ChatRoomData | null;
  setRoomFromAPI: (id: string) => Promise<void>;
  sendMessage: (content: string) => void;
  addMessage: (msg: Message) => void;
  selectedUser: { email: string; name: string } | null;
  setSelectedUser: (u: { email: string; name: string } | null) => void;
};

const ChatContext = createContext<ChatContextType>(null!);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [currentRoom, setCurrentRoom] = useState<ChatRoomData | null>(null);
  const [selectedUser, setSelectedUser] = useState<{ email: string; name: string } | null>(null);
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token) return;

    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(JSON.stringify({ type: "auth", token }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      addMessage(data);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [token]);

  async function setRoomFromAPI(forumId: string) {
    const forumRes = await forumApi.getById(forumId);
    const msgRes = await forumApi.getMessages(forumId);

    setCurrentRoom({
      id: forumRes.data.id,
      name: forumRes.data.title,
      description: forumRes.data.description,
      creator: forumRes.data.author.username,
      createdAt: forumRes.data.createdAt,
      messages: msgRes.data.map((m: any) => ({
        forumId,
        content: m.content,
        senderUsername: m.senderUsername,
        createdAt: m.createdAt,
      })),
      participants: [],
      peopleCount: 0,
    });
  }

  function addMessage(raw: any) {
    const msg: Message = {
      forumId: raw.forumId,
      content: raw.content,
      senderUsername: raw.senderUsername || "anônimo",
      createdAt: raw.createdAt || new Date().toISOString(),
      recipientEmail: raw.recipientEmail || null,
    };

    setCurrentRoom(room =>
      room ? { ...room, messages: [...room.messages, msg] } : room
    );
  }

  function sendMessage(content: string) {
    if (!ws || !currentRoom || !content.trim()) return;

    const msg = {
      type: "message",
      forumId: currentRoom.id,
      content,
      recipientEmail: selectedUser?.email ?? null,
      senderUsername: user?.username ?? "desconhecido",
      createdAt: new Date().toISOString(),
    };

    ws.send(JSON.stringify(msg));

    addMessage(msg);
  }

  return (
    <ChatContext.Provider
      value={{
        currentRoom,
        setRoomFromAPI,
        sendMessage,
        addMessage,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);