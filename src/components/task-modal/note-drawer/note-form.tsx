"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/query-client";
import { createAnnotation } from "@/services/annotations";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface NoteFormProps {
  taskId: string;
}

const annotationFormSchema = z.object({
  description: z.string().max(255, { message: "Máximo de 255 caracteres." }),
});

type AnnotationFormSchema = z.infer<typeof annotationFormSchema>;

export function NoteForm({ taskId }: NoteFormProps) {
  const { register, handleSubmit } = useForm<AnnotationFormSchema>({
    resolver: zodResolver(annotationFormSchema),
  });

  const annotationMutation = useMutation({
    mutationKey: ["notes", taskId],
    mutationFn: async ({ description }: AnnotationFormSchema) => {
      const { message, success } = await createAnnotation({
        description,
        taskId,
      });
      return { message, success };
    },
    onSuccess: () => {
      toast({
        title: "Anotação adicionada!",
      });
      queryClient.invalidateQueries({ queryKey: ["notes", taskId] });
    },
    onError: ({ message }) => {
      toast({
        title: message ?? "Erro ao adicionar anotação!",
        variant: "destructive",
      });
    },
  });

  async function handleCreateAnnotation({ description }: AnnotationFormSchema) {
    annotationMutation.mutate({ description });
  }

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(handleCreateAnnotation)}
      action=""
    >
      <Label className="text-sm">Deixe seu comentário sobre essa tarefa</Label>
      <Textarea
        className="resize-none"
        placeholder="Escreva uma anotação"
        {...register("description")}
      />

      <Button size={"sm"} type="submit" className="text-sm">
        Adicionar
      </Button>
    </form>
  );
}
