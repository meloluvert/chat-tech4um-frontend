"use client";

import { useChat } from "@/contexts/ChatContext";
import Link from "next/link";
import { formatDateBR } from "@/lib/utils";

type RoomsSidebarProps = {
  className?: string;
  rooms?: any
} & React.HTMLAttributes<HTMLDivElement>;

export function RoomsSidebar({ rooms, className }: RoomsSidebarProps) {
  const { currentRoom } = useChat();

  return (
    <div className={`
      bg-white/80 dark:bg-gray-900/80 
      backdrop-blur-sm 
      rounded-2xl p-5 w-full md:w-64 
      shadow-lg dark:shadow-black/20
      border border-gray-200/50 dark:border-gray-800/50
      ${className}
    `}>
      <h2 className="font-semibold text-[#1772B2] dark:text-[#4DA8E0] mb-6">Salas</h2>
      
      {!currentRoom && (
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
          Selecione um chat
        </p>
      )}

      <div className="flex flex-col gap-3 mt-4">
        {rooms.map((r: any) => {
          const isActive = currentRoom?.id === r.id;
          const creator = r.author?.username ?? "Desconhecido";
          const createdAt = formatDateBR(r.createdAt);

          return (
            <Link
              key={r.id}
              href={`/forum/${r.id}`}
              className={`
                group relative p-4 rounded-xl text-left transition-all duration-300
                ${isActive 
                  ? "bg-blue-500 dark:bg-[#145a8a] text-white shadow-lg shadow-blue-500/20" 
                  : "bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 border border-gray-200/30 dark:border-gray-700/30"
                }
                hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-950/20
                hover:-translate-y-1
                hover:z-10
              `}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#1772B2]/20 to-[#145a8a]/20 rounded-xl blur opacity-75"></div>
              )}
              
              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className={`
                    font-semibold line-clamp-1
                    ${isActive ? "text-white" : "text-gray-900 dark:text-gray-100 group-hover:text-[#1772B2]"}
                  `}>
                    {r.title}
                  </h3>
                  
                  {isActive && (
                    <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <span className={`
                    text-xs font-medium
                    ${isActive 
                      ? "text-blue-100/90" 
                      : "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    }
                  `}>
                    por {creator}
                  </span>
                  
                  <span className={`
                    text-xs 
                    ${isActive 
                      ? "text-white/70" 
                      : "text-gray-500 dark:text-gray-500"
                    }
                  `}>
                    {createdAt}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}