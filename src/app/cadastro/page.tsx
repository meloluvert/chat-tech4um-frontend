"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/schemas/registerSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { authApi } from "@/lib/api/auth";
import { Spinner } from "@/components/ui/spinner"; 

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterSchema) {
    setLoading(true);

    try {
      await authApi.register({
        username: data.name,
        email: data.email,
        password: data.password,
        role: "USER",
      });

      toast.success("Conta criada com sucesso!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-bold text-[#1772B2] mb-4 text-center">
        Criar Conta
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="text-sm font-medium">Nome</label>
          <Input {...register("name")} placeholder="Seu nome" />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <Input {...register("email")} placeholder="seuemail@email.com" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Senha</label>
          <Input type="password" {...register("password")} placeholder="••••••" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Confirmar Senha</label>
          <Input type="password" {...register("confirmPassword")} placeholder="••••••" />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="flex items-center justify-center text-white hover:opacity-90"
          style={{ backgroundColor: "#1772B2" }}
          disabled={loading}
        >
          {loading ? <Spinner className="w-5 h-5 mr-2" /> : null}
          {loading ? "Criando..." : "Criar Conta"}
        </Button>
      </form>
    </main>
  );
}
