import { createClient } from "@/lib/supabase/client";

export async function fetchPostsWithEmail() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
