import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { postId } = await req.json();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: existingLike } = await supabase
    .from("posts_likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .single();

  if (existingLike) {
    await supabase
      .from("posts_likes")
      .delete()
      .match({ post_id: postId, user_id: user.id });

    return NextResponse.json({ liked: false });
  } else {
    await supabase
      .from("posts_likes")
      .insert({ post_id: postId, user_id: user.id });

    return NextResponse.json({ liked: true });
  }
}
