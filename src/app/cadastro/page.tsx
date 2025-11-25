"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/schemas/registerSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("avatar", file);
    setPreview(URL.createObjectURL(file));
  }

  function onSubmit(data: RegisterSchema) {
    console.log("Enviando cadastro:", data);
  }

  return (
    <main className=" max-w-90   shadow-lg  rounded-2xl p-6 ">
      <h1 className="text-2xl font-bold text-[#1772B2] mb-4 text-center">
        Criar Conta
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Foto de Perfil */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            {preview ? (
              <Image
                src={preview}
                alt="preview"
                width={96}
                height={96}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                Foto
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleAvatar}
            className="text-sm border"
          />
        </div>

        {/* Nome */}
        <div>
          <label className="text-sm font-medium">Nome</label>
          <Input
            {...register("name")}
            className="focus:outline -blue-600 focus:border-2"
            placeholder="Seu nome"
          />
          {errors.name && (
            <p className="text-red-500 text-xs ">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input {...register("email")} placeholder="seuemail@email.com" />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Senha */}
        <div>
          <label className="text-sm font-medium">Senha</label>
          <Input
            type="password"
            {...register("password")}
            placeholder="••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Confirmar Senha */}
        <div>
          <label className="text-sm font-medium">Confirmar Senha</label>
          <Input
            type="password"
            {...register("confirmPassword")}
            placeholder="••••••"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex  items-center justify-between">
          <label className="text-sm font-medium  justify-between">
            Cor do perfil (opcional)
          </label>

          <Input
            {...register("color")}
            placeholder="#1772B2"
            type="color"
            className="h-10 p-1 w-10"
          />
        </div>

        {/* Botão */}
        <Button
          type="submit"
          className="text-white hover:opacity-90"
          style={{ backgroundColor: "#1772B2" }}
        >
          Criar Conta
        </Button>
      </form>
    </main>
  );
}
