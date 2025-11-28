"use client";

import { useState } from "react";
import { InputChat } from "./InputChat";
import { useChat } from "@/contexts/ChatContext";
import { formatDateBR } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function ChatRoom({ className }: { className?: string }) {
  const { currentRoom, sendMessage } = useChat();
  const { user } = useAuth();

  const [input, setInput] = useState("");

  if (!currentRoom) return null;

  function handleSend() {
    if (!input.trim()) return;
    
    sendMessage(input);

    setInput("");
  }

  return (
    <div
      className={`flex flex-col justify-between flex-1 rounded-2xl shadow ${className}`}
    >
      <header className="flex flex-col sm:flex-row justify-between items-center mb-4 p-5">
        <p className="text-xl font-bold text-[#1772B2]">
          {currentRoom.name}
        </p>
        <div className="flex flex-col">
        <span className="text-sm text-gray-500">
          Criado por: {currentRoom.creator}
        </span>
        <span className="text-sm text-gray-500">
          Desde  {formatDateBR(currentRoom.createdAt)}
        </span>
        </div>
      </header>

<div className="flex flex-col gap-4 overflow-auto h-[60vh] p-6   backdrop-blur-sm">
  {currentRoom.messages.map((msg) => (
    <div 
      key={msg.id}
      className="
        flex gap-4 items-start p-4 rounded-2xl 
        bg-white/70 dark:bg-gray-900/70 
        border border-gray-200/40 dark:border-gray-800/40
        hover:bg-white/80 dark:hover:bg-gray-900/80
        transition-all duration-200
        -mx-1
      "
    >
   
      
      <div className="grow min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate max-w-[80%]">
            {msg.senderUsername}
          </p>
        </div>
        
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words max-w-full">
          {msg.content}
        </p>
      </div>
    </div>
  ))}
</div>
      <InputChat
        input={input}
        setInput={setInput}
        handleSend={handleSend}
      />
    </div>
  );
}
