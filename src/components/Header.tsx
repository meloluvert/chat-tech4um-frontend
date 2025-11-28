"use client";

import { LoginModal } from "@/components/LoginModal";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 rounded-xl">
      <Link className="flex items-center gap-2" href={"/"}>
        <h1 className="text-2xl font-bold text-[#1772B2] dark:text-[#4DA8E0]">tech4um</h1>
        <span className="hidden md:block text-sm text-gray-600 dark:text-gray-400">
          Seu fórum sobre tecnologia!
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-md text-gray-700 dark:text-gray-300 hidden sm:inline-block">Olá, {user.username}</span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              title={isDarkMode ? "Modo claro" : "Modo escuro"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Sair"
            >
              <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={() => setShowLoginModal(true)}
              className="bg-[#1772B2] hover:bg-[#145a8a] text-white"
            >
              Fazer Login
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              title={isDarkMode ? "Modo claro" : "Modo escuro"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <LoginModal 
              isOpen={showLoginModal} 
              onClose={() => setShowLoginModal(false)} 
            />
          </>
        )}
      </div>
    </header>
  );
}