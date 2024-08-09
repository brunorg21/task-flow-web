"use client";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sendInvite } from "@/services/invites";
import { Form } from "../form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loader2, UserCog, UserMinus, UserRound } from "lucide-react";

const inviteSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

type SendInviteSchema = z.infer<typeof inviteSchema>;

interface InvitePopoverProps {
  organizationId: string;
}

export function InvitePopover({ organizationId }: InvitePopoverProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
  });
  async function handleSubmitForm({ email }: SendInviteSchema) {
    const response = await sendInvite({
      email,
      organizationId,
    });

    if (response.success) {
      toast({
        title: "Convite enviado com sucesso!",
      });
      reset();
    } else {
      toast({
        title: response.message ?? "Erro ao enviar convite!",
        variant: "destructive",
      });
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          Convidar <UserRound className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">
              Convide uma pessoa para sua organização
            </h4>
            <p className="text-sm text-muted-foreground">
              Procure pelo e-mail do usuário que deseja convidar
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col space-y-4"
          >
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} placeholder="Email" />
              {errors.email && (
                <p className="text-truncate text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <Loader2 className="size-2 animate-spin" />
              ) : (
                "Enviar convite"
              )}
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
