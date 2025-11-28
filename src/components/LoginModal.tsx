"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (forumId?: string) => void; // Para navegar pro fórum após login
  forumId?: string; // ID do fórum que disparou
}

export function LoginModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  forumId 
}: LoginModalProps) {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      onClose();
      if (onSuccess && forumId) {
        onSuccess(forumId);
      }
    }
  }, [user, isOpen, onClose, onSuccess, forumId]);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      toast.error("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Credenciais inválidas.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-[#1772B2]">
            Que bom ver você aqui!
          </DialogTitle>
          <DialogDescription className="text-gray-700 font-semibold dark:text-white">
            Para participar de um fórum é necessário fazer login.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Senha</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/cadastro" className="text-center text-gray-400 text-sm">
              Não tem conta? Cadastre-se
            </Link>
            <Button
              onClick={handleLogin}
              disabled={loading}
              style={{ backgroundColor: "#1772B2" }}
              className="flex items-center justify-center text-white hover:opacity-90"
            >
              {loading ? <Spinner className="w-5 h-5 mr-2" /> : null}
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}