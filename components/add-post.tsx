"use client";

import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const AddPostSchema = z.object({
  title: z
    .string()
    .min(1, "O título é obrigatório")
    .max(100, "O título deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .optional(),
  media: z.any(),
});

type AddPostFormData = z.infer<typeof AddPostSchema>;

export const AddPost = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddPostFormData>({
    resolver: zodResolver(AddPostSchema),
  });

  const mutation = useMutation({
    mutationKey: ["add-post"],
    mutationFn: async (data: AddPostFormData) => {
      const user = (await supabase.auth.getUser()).data.user;
      const userEmail = user?.email || "";
      const media = data.media[0];

      const fileExt = media.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("posts")
        .upload(filePath, media);

      if (uploadError) {
        throw new Error("Erro no upload do arquivo: " + uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("posts")
        .getPublicUrl(filePath);

      const mediaUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from("posts").insert({
        title: data.title,
        description: data.description,
        media_url: mediaUrl,
        media_type: media.type.startsWith("image/") ? "image" : "video",
        created_at: new Date().toISOString(),
        user_email: userEmail,
      });

      if (insertError) {
        throw new Error("Erro ao criar post: " + insertError.message);
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      reset();
      setIsOpen(false);
      toast.success("Post criado com sucesso!");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Erro desconhecido");
    },
  });

  const onSubmit = (data: AddPostFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar Post</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Post</DialogTitle>
          <DialogDescription>
            Formulário para adicionar um novo post.
          </DialogDescription>
        </DialogHeader>

        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="w-full border p-2 rounded"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description">Descrição (opcional)</label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full border p-2 rounded"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="media">Imagem ou Vídeo</label>
            <input
              id="media"
              type="file"
              accept="image/*,video/*"
              multiple={false}
              {...register("media")}
            />

            {errors.media && (
              <p className="text-red-600 text-sm mt-1">
                {errors.media.message?.toString()}
              </p>
            )}
          </div>

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
