"use client";

// import { ParticipantsList } from "@/components/chat/ParticipantsList";
import { ChatRoom } from "@/components/chat/ChatRoom";
import { ArrowLeft } from "lucide-react";
import { RoomsSidebar } from "@/components/chat/RoomsSidebar";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useParams } from "next/navigation";
import { useChat } from "@/contexts/ChatContext";
import { useEffect, useState } from "react";
import { forumApi } from "@/lib/api/forums";

export default function ChatPage() {
  const { id } = useParams();
  const { setRoomFromAPI, currentRoom } = useChat();
  const { isDarkMode, toggleTheme } = useTheme();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function loadRooms() {
      const res = await forumApi.getForums();
      setRooms(res.data);
    }
    loadRooms();
  }, []);

  useEffect(() => {
    if (id) setRoomFromAPI(id as string);
  }, [id]);


  if (!currentRoom) {
    return (
      <div className="flex flex-col items-start mt-5 w-full">
        <Link className="text-gray-500  w-full flex" href="/">
          <ArrowLeft color={ isDarkMode ? "#fff" :"#6a7282" } />
          <span className="dark:text-white">Voltar ao dashboard</span>
        </Link>

        <p className="mt-10 text-gray-500">Carregando fórum...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start mt-5 w-full">
      <Link className="text-gray-500 w-full flex" href="/">
      <ArrowLeft color={ isDarkMode ? "#fff" :"#6a7282" } />
        <span className="dark:text-white">Voltar ao dashboard</span>
      </Link>

      <main className="flex flex-col gap-4 w-full md:flex-row">

        {/* <ParticipantsList className="order-1" /> */}

        <ChatRoom className="order-3 md:order-2" />

        <RoomsSidebar rooms={rooms} className="order-2 md:order-3" />

      </main>
    </div>
  );
}
