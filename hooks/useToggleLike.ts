import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

export function useToggleLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["toggle-like"],
    mutationFn: async (postId: number) => {
      const user = (await supabase.auth.getClaims()).data?.claims;
      const userId = user?.sub;

      if (!userId) {
        throw new Error("Usuário não autenticado");
      }

      // Verificar se já curtiu
      const { data: existingLikes } = await supabase
        .from("posts_likes")
        .select("*")
        .eq("post_id", postId)
        .eq("user_id", userId);

      if (existingLikes?.length) {
        // Já curtiu => descurtir
        const { error } = await supabase
          .from("posts_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", userId);
        if (error) throw error;
      } else {
        // Não curtiu => curtir
        const { error } = await supabase.from("posts_likes").insert({
          post_id: postId,
          user_id: userId,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts-with-likes"],
      });
    },
  });
}
