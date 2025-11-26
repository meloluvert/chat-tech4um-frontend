"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function LoginModal() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password); 
    } catch (err: any) {
      setError("Credenciais inválidas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          style={{ backgroundColor: "#1772B2" }}
          className="text-white hover:opacity-90"
        >
          Fazer Login
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-[#1772B2]">
            Que bom ver você aqui!
          </DialogTitle>
          <DialogDescription className="text-gray-700 font-semibold">
            Para participar de um 4um é necessário fazer login.
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

          {error && (
            <p className="text-red-500 text-sm text-left">{error}</p>
          )}

          <Link href="/cadastro" className="text-gray-400">
            <DialogClose className="text-left underline hover:no-underline">
              Não tem conta? Cadastre-se
            </DialogClose>
          </Link>

          <DialogClose asChild>
            <Button
              onClick={handleLogin}
              disabled={loading}
              style={{ backgroundColor: "#1772B2" }}
              className="text-white hover:opacity-90"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
