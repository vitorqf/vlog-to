import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";

import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";

import { AddPost } from "@/components/add-post";
import { PostList } from "@/components/post-list";
export default async function Feed() {
  return (
    <div className="gap-6 mx-auto py-10 container flex flex-col">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Feed</h1>
        <AddPost />
      </div>
      <div className="w-full flex flex-col gap-12 items-center mx-auto">
        <PostList />
      </div>
    </div>
  );
}
