"use client";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Invite } from "@/types/invites";
import { format } from "date-fns";
import { CheckCircle, Loader, Loader2 } from "lucide-react";
import { acceptInvite } from "@/services/invites";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";

interface InviteCardProps {
  invite: Invite;
}

export default function InviteCard({ invite }: InviteCardProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  async function handleAcceptInvite() {
    const response = await acceptInvite({
      inviteId: invite.id,
    });

    console.log(response);
  }

  return (
    <div className="grid gap-4">
      <Card className="w-full max-w-md">
        <div className="p-2 flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground">
              Enviado por:{" "}
              <span className="text-muted-foreground">
                {invite.sender.username}
              </span>
            </span>
            <span className="text-sm">
              {format(new Date(invite.createdAt), "dd/MM/yyyy")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground">
              Organização:{" "}
              <span className="text-muted-foreground">
                {invite.organization.slug}
              </span>
            </span>
            <span className="flex items-center gap-2 text-sm text-foreground">
              Status:
              <span className="flex items-center gap-2 text-muted-foreground">
                {invite.invitationAccepted ? (
                  <>
                    Aceito <CheckCircle className="size-4 text-emerald-400" />
                  </>
                ) : (
                  <>
                    Pendente <Loader className="size-4 text-yellow-400" />
                  </>
                )}
              </span>
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleAcceptInvite)}
            className="flex items-center gap-2"
          >
            <Button
              disabled={isSubmitting || invite.invitationAccepted}
              type="submit"
              size={"sm"}
              variant={"outline"}
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Aceitar"
              )}
            </Button>
            <Button
              disabled={invite.invitationAccepted}
              size={"sm"}
              variant={"destructive"}
            >
              Recusar
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
