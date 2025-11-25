import { ParticipantsList } from "@/components/chat/ParticipantsList";
import { ChatRoom } from "@/components/chat/ChatRoom";
import { ArrowLeft } from "lucide-react";
import { RoomsSidebar } from "@/components/chat/RoomsSidebar";
import { fakeRooms } from "@/fake/data";
import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-start mt-5 w-full">
      <Link
        className="text-gray-500 w-full flex  "
        href="/"
      >
        <ArrowLeft color="#6a7282" />
        <span>Voltar ao dashboard</span>
      </Link>

      <main className="flex flex-col gap-4 w-full md:flex-row">
        <ParticipantsList className="order-1" />

        <ChatRoom className="order-3 md:order-2" />

        <RoomsSidebar rooms={fakeRooms} className="order-2 md:order-3" />
      </main>
    </div>
  );
}
