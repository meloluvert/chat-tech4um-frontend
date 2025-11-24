"use client";

import { createContext, useContext, useState } from "react";
import { ChatRoomData, ChatParticipant, Message } from "@/types/chat";
import { fakeRooms, fakeParticipants} from "@/fake/data";

type ChatContextType = {
  currentRoom: ChatRoomData | null;
  setRoomById: (id: string) => void;

  participants: ChatParticipant[];
  selectedUser: ChatParticipant | null;
  setSelectedUser: (user: ChatParticipant | null) => void;

  addMessage: (msg: Message) => void;
};

const ChatContext = createContext<ChatContextType>(null!);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [currentRoom, setCurrentRoom] = useState<ChatRoomData | null>(null);
  const [selectedUser, setSelectedUser] = useState<ChatParticipant | null>(
    null
  );

  
  const [participants, setParticipants] = useState<ChatParticipant[]>(fakeParticipants);
  function setRoomById(id: string) {
    const room = fakeRooms.find((r) => r.id === id) || null;
    setCurrentRoom(room);
    setSelectedUser(null);
  }

  function addMessage(msg: Message) {
    if (!currentRoom) return;
    setCurrentRoom({
      ...currentRoom,
      messages: [...currentRoom.messages, msg],
    });
  }

  return (
    <ChatContext.Provider
      value={{
        currentRoom,
        setRoomById,
        participants,
        selectedUser,
        setSelectedUser,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
