"use client";

import { LoginModal } from "@/components/LoginModal";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/"); 
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 shadow-sm">
      <Link className="flex items-center gap-2" href={"/"}>
        <h1 className="text-2xl font-bold text-[#1772B2]">tech4um</h1>
        <span className="hidden md:block text-sm text-gray-600">
          Seu fórum sobre tecnologia!
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Olá, {user.username}</span>
            <button
              onClick={handleLogout}
              className="p-2 rounded hover:bg-gray-100"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        ) : (
          <LoginModal />
        )}
      </div>
    </header>
  );
}
