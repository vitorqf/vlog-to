"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    router.push("/auth/login");
  };

  return (
    <Button variant="ghost" size="icon" onClick={logout}>
      <LogOut className="text-red-500" />
    </Button>
  );
}
