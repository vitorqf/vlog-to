import { fetchPostsWithEmail } from "@/services/posts/getAll";
import { useQuery } from "@tanstack/react-query";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPostsWithEmail,
  });
}
