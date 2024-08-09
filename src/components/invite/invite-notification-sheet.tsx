import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BellIcon } from "lucide-react";
import InviteCard from "./invite-card";
import { getReceivedInvites } from "@/services/invites";

export async function InviteNotificationSheet() {
  const { invites } = await getReceivedInvites();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative" size={"icon"} variant="ghost">
          <span className="absolute flex justify-center items-center text-sm font-medium bottom-6 right-5 bg-secondary-foreground text-muted w-5 p-1 h-5 rounded-full">
            {invites.length}
          </span>
          <BellIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Convites recebidos</SheetTitle>
          <SheetDescription>Visualize todos os seus convites.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-2">
          {invites.length === 0 && (
            <p className="text-md text-muted-foreground">
              Nenhum convite recebido.
            </p>
          )}
          {invites.map((invite) => (
            <InviteCard invite={invite} key={invite.id} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
