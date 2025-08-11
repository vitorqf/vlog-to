import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

export function usePostsWithLikes() {
  return useQuery({
    queryKey: ["posts-with-likes"],
    queryFn: async () => {
      const userId = await supabase.auth
        .getUser()
        .then((res) => res.data.user?.id);

      const { data: posts } = await supabase
        .from("posts")
        .select(
          `
        *,
        likes:posts_likes (
          user_id
        ),
        likes_count:posts_likes (
          id
        )
      `
        )
        .order("created_at", { ascending: false });

      // Estrutura para facilitar:
      // posts.likes_count = array de likes para contar
      // posts.likes = array com likes do usuário (se existir)

      return (
        posts?.map((post) => ({
          ...post,
          likesCount: post.likes_count.length,
          likedByUser: post.likes.some((like) => like.user_id === userId),
        })) ?? []
      );
    },
  });
}
