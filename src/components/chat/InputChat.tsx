"use client";

import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { Smile, Image as ImageIcon, SendHorizontal, CircleX } from "lucide-react";
import Image from "next/image";
import { useChat } from "@/contexts/ChatContext";

type InputChatProps = {
  input: string | null;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
};

export function InputChat({ input, setInput, handleSend }: InputChatProps) {
  const { selectedUser, setSelectedUser, currentRoom } = useChat();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [images, setImages] = useState<string[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  function handleSelectImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <footer
      className={`mt-4 p-5 rounded-b-2xl ${
        selectedUser ? `bg-orange-500` : `bg-blue-500`
      }`}
    >
      {/* Área Superior */}
      <div className="flex items-center p-1 gap-1 flex-wrap md:flex-nowrap">
        <div className="text-sm text-white mb-1 grow flex">
          Enviando para:{" "}
          <span className="font-semibold ml-1">
            {selectedUser ? selectedUser.name : currentRoom?.name}
          </span>

          {selectedUser && (
            <p
              title="Cancelar envio de mensagem privado"
              className="underline px-2 cursor-pointer"
              onClick={() => setSelectedUser(null)}
            >
              Cancelar
              <CircleX color="#fff" className="inline-block ml-1 md:hidden" />
            </p>
          )}
        </div>

        {/* Botão EMOJI */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-1"
          >
            <Smile color="white" />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-12 right-0 z-50">
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  setInput((prev) => prev + emoji.emoji);
                }}
              />
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          multiple
          onChange={handleSelectImages}
        />

        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className="p-1"
        >
          <ImageIcon color="white" />
        </button>
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative w-20 h-20 rounded-md overflow-hidden border border-white"
            >
              <Image
                src={src}
                alt="preview"
                fill
                className="object-cover"
              />

              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full"
              >
                <CircleX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 bg-white rounded-xl p-2 mt-3">
        <input
          className="w-full p-2 rounded-xl border text-black"
          placeholder="Escreva aqui sua mensagem..."
          value={input as any}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="text-white px-4 rounded-xl flex items-center"
        >
          <SendHorizontal color={"#000"} />
        </button>
      </div>
    </footer>
  );
}
