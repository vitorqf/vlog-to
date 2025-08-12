"use client";

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function AuthButton() {
  const supabase = createClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
  });

  if (isLoading) return <Skeleton className="w-60 h-8" />;

  return user ? (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback className="capitalize">
            {user.email?.[0] ?? "A"}
          </AvatarFallback>
        </Avatar>
      </div>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/login">Entrar</Link>
      </Button>
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/sign-up">Criar conta</Link>
      </Button>
    </div>
  );
}
