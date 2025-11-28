"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateForumModal from "@/components/CreateForumModal";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Lock } from "lucide-react";
import { LoginModal } from "./LoginModal";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FormEvent } from "react"; // ✅ IMPORT CORRETO

export function SearchBar({ 
  onSearch, 
  firstForumId 
}: { 
  onSearch: (value: string) => void; 
  firstForumId?: string;
}) {
  const [query, setQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (query.trim()) {
      onSearch(query);
    } else if (firstForumId) {
      router.push(`/forum/${firstForumId}`);
    }
  };

  const handleCreateForumClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      setShowLoginModal(true);
      return;
    }
  };

  const handleLoginSuccess = () => {
    toast.success("Agora você pode criar fóruns!");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-3 items-center mt-6">
      <div className="relative flex-1 items-center flex flex-row rounded-xl border-2 border-gray-200/60 dark:border-gray-700/60 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm group">
        <input
          type="text"
          placeholder="Em busca de uma sala? Encontre-a aqui!"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          className="
            w-full block px-4 py-2.5 
            focus:outline-none focus:border-0 
            bg-transparent 
            placeholder:text-gray-500 dark:placeholder:text-gray-400 
            text-gray-900 dark:text-gray-100 
            transition-all duration-300
            h-12 rounded-xl rounded-r-none
          "
        />
        <Button
          type="submit"
          className="
            bg-gradient-to-r from-[#1772B2] to-[#145a8a] 
            hover:from-[#145a8a] hover:to-[#0f4a6e]
            text-white shadow-lg hover:shadow-blue-500/25
            rounded-r-xl rounded-l-none px-5 py-2.5 
            hidden md:flex
            transition-all duration-300
            group-hover:scale-105
          "
        >
          <ArrowRight />
        </Button>
      </div>

      <CreateForumModal>
        <Button
          onClick={handleCreateForumClick}
          className="
            bg-gradient-to-r from-[#1772B2] to-[#145a8a] 
            hover:from-[#145a8a] hover:to-[#0f4a6e]
            disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
            disabled:hover:from-gray-400 disabled:hover:to-gray-500
            text-white shadow-lg hover:shadow-blue-500/25
            rounded-xl px-4 py-2.5 sm:hidden
            transition-all duration-300
          "
          disabled={!user}
          title={!user ? "Faça login para criar fóruns" : "Criar fórum"}
        >
          {!user ? <Lock className="w-4 h-4" /> : "+"}
        </Button>
      </CreateForumModal>

      <CreateForumModal>
        <Button
          onClick={handleCreateForumClick}
          className="
            bg-gradient-to-r from-[#1772B2] to-[#145a8a] 
            hover:from-[#145a8a] hover:to-[#0f4a6e]
            disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
            disabled:hover:from-gray-400 disabled:hover:to-gray-500
            text-white shadow-lg hover:shadow-blue-500/25
            rounded-xl px-6 py-2.5 hidden sm:flex
            transition-all duration-300
          "
          disabled={!user}
          title={!user ? "Faça login para criar fóruns" : "Criar seu fórum"}
        >
          {!user ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Faça Login
            </>
          ) : (
            "Crie seu fórum"
          )}
        </Button>
      </CreateForumModal>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </form>
  );
}