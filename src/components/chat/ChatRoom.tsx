"use client";

import { useChat } from "@/contexts/ChatContext";
import { useState } from "react";
import { Avatar } from "./Avatar";
import { InputChat } from "./InputChat";
import { ChatRoomData, Message } from "@/types/chat";
type ChatRoomProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ChatRoom({ className }: ChatRoomProps) {
  const { currentRoom, addMessage } = useChat() as {
    currentRoom: ChatRoomData;
    addMessage: (msg: Message) => void;
  };
  
  const [input, setInput] = useState("");

  if (!currentRoom || currentRoom == null) return <></>;

  function handleSend() {
    if (!input.trim()) return;

    addMessage({
      id: Date.now().toString(),
      sender: {
        id: currentRoom.participants[0].id,
        name: currentRoom.participants[0].name ,
        avatarUrl: currentRoom.participants[0].avatarUrl!,
        color: "#fff"
      },
      content: input,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    setInput("");
  }

  return (
    <div className={`flex flex-col justify-between flex-1 rounded-2xl shadow ${className}`}>
      <header className="flex justify-between items-center mb-4 p-5">
        <h1 className="text-xl font-bold text-[#1772B2]">{currentRoom.name}</h1>
        <span className="text-sm text-gray-500">Criado por: {currentRoom.creator}</span>
      </header>

      <div className="flex flex-col gap-4 overflow-auto h-[60vh] p-5">
        {currentRoom.messages.map((msg) => (
          <div key={msg.id} className="flex gap-3 items-start">
            <Avatar src={msg.sender.avatarUrl!} alt={msg.sender.name!} size={40} />
            <div className="grow">
              <p className="font-semibold text-sm">{msg.sender.name}</p>
              <p className="text-gray-700">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <InputChat input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
}
