"use client";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";
import moment from "moment";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { usePostsWithLikes } from "@/hooks/usePostsWithLikes";
import { useToggleLike } from "@/hooks/useToggleLike";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export function PostList() {
  const { data: posts, isLoading, error } = usePostsWithLikes();
  const toggleLike = useToggleLike();

  if (isLoading)
    return Array.from({ length: 6 }).map((_, index) => (
      <Skeleton key={index} className="w-full h-[36rem]" />
    ));
  if (error) return <p>Erro ao carregar posts</p>;

  return (
    <>
      {posts?.map((post) => (
        <div
          key={post.id}
          className="border border-border p-4 rounded-lg w-full mb-6"
        >
          <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="capitalize">
                  {post.user_email?.[0] ?? "A"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold">{post.user_email}</span>
            </div>
            <span className="text-sm text-gray-500">
              {moment(post.created_at).fromNow()}
            </span>
          </div>
          <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-400 mb-4">{post.description}</p>

          <div className="border-b border-t border-border">
            {post.media_type === "video" ? (
              <MediaPlayer
                src={post.media_url}
                hideControlsOnMouseLeave
                className="container rounded-lg object-cover "
              >
                <MediaProvider />
                <PlyrLayout icons={plyrLayoutIcons} />
              </MediaPlayer>
            ) : (
              <Image
                src={post.media_url}
                alt={post.title}
                width={400}
                height={300}
                className=" container rounded-lg object-cover "
              />
            )}
          </div>

          <div className="flex items-center mt-4 gap-4">
            <motion.button
              onClick={() => toggleLike.mutate(post.id)}
              disabled={toggleLike.isPending}
              className={`flex items-center gap-2 font-semibold select-none ${
                post.likedByUser ? "text-blue-600" : "text-gray-600"
              }`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              initial={{ scale: 1 }}
              transition={{
                ease: "easeInOut",
              }}
              aria-label={post.likedByUser ? "Descurtir" : "Curtir"}
            >
              <ThumbsUp
                size={20}
                fill={post.likedByUser ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
              />
              {post.likedByUser ? "Curtido" : "Curtir"} ({post.likesCount})
            </motion.button>
          </div>
        </div>
      ))}
    </>
  );
}
