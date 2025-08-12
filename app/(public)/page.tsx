"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
        Bem-vindo ao Vlog.to
      </h1>
      <p className="max-w-xl mb-10 text-gray-600">
        Conecte-se, compartilhe conteúdos e interaja com outros usuários de
        forma simples e segura.
      </p>

      <div className="flex gap-4">
        <Button onClick={() => push("/auth/login")}>Entrar</Button>
        <Button onClick={() => push("/auth/sign-up")} variant="outline">
          Criar conta
        </Button>
      </div>
    </main>
  );
}
