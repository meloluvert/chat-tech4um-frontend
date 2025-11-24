"use client";

import Image from "next/image";

import { useChat } from "@/contexts/ChatContext";
import { useState } from "react";
import { SendHorizontal, CircleX } from "lucide-react";
import { Smile, Image as ImageIcon } from "lucide-react";
import { Avatar } from "./Avatar";
type ChatRoomProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export function ChatRoom({ className }: ChatRoomProps) {
  const {
    currentRoom,
    selectedUser,
    addMessage,
    participants,
    setSelectedUser,
  } = useChat();
  const [input, setInput] = useState("");

  if (!currentRoom) return <></>;

  function handleSend() {
    if (!input.trim()) return;

    addMessage({
      id: Date.now().toString(),
      sender: {
        id: currentRoom?.participants[0].id,
        name: currentRoom?.participants[0].name,
        avatarUrl: currentRoom?.participants[0].avatarUrl!,
      },
      content: input,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    setInput("");
  }

  return (
    <div
      className={`flex flex-col justify-between flex-1   rounded-2xl shadow ${className}`}
    >
      <header className="flex justify-between items-center mb-4 p-5">
        <h1 className="text-xl font-bold text-[#1772B2]">{currentRoom.name}</h1>
        <span className="text-sm text-gray-500">
          Criado por: {currentRoom.creator}
        </span>
      </header>

      <div className="flex flex-col gap-4 overflow-auto h-[60vh] p-5">
        {currentRoom.messages.map((msg) => (
          <div key={msg.id} className="flex gap-3 items-start">
            <div>
            <Avatar
              src={msg.sender.avatarUrl}
              alt={msg.sender.name}
              size={40}
            />
            </div>

            <div className="grow">
              <p className="font-semibold text-sm">{msg.sender.name}</p>
              <p className="text-gray-700 w-full">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <footer
        className={`mt-4 bg-blue-500 p-5  rounded-b-2xl ${
          selectedUser ? `bg-orange-500` : `bg-blue-500`
        }`}
      >
        <div className="flex items-center p-1 gap-1 flex-wrap md:flex-nowrap ">
          <div className="text-sm text-white mb-1 grow flex">
            Enviando para:{" "}
            <span className="font-semibold">
              {selectedUser ? selectedUser.name : currentRoom.name}
            </span>
            {selectedUser && (
              <p
                title="Cancelar envio de mensagem privado"
                className="underline px-2"
                onClick={() => setSelectedUser(null)}
              >
                <span className="hidden md:block">
                  {" "}
                  Cancelar envio de mensagem privado{" "}
                </span>
                <CircleX color="#fff" className="md:hidden" />
              </p>
            )}
          </div>
          <Smile color="white" />
          <ImageIcon color="white" />
        </div>

        <div className="flex gap-2 bg-white rounded-xl">
          <input
            className="w-full p-2 rounded-xl border text-black "
            placeholder="Escreva aqui sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend} className=" text-white px-4 rounded-xl">
            <SendHorizontal color={"#000"} />
          </button>
        </div>
      </footer>
    </div>
  );
}
