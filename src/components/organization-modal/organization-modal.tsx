"use client";
import { Organization } from "@/types/organization";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { OrganizationForm } from "./organization-form";
import { InvitePopover } from "../invite/invite-popover";
import { Button } from "../ui/button";
import { deleteOrganization } from "@/services/organizations";
import { Trash2 } from "lucide-react";
import { User } from "@/types/user";

interface OrganizationModalProps {
  organization?: Organization;
  isEditing?: boolean;
  user?: User;
}

export function OrganizationModal({
  isEditing = false,
  organization,
  user,
}: OrganizationModalProps) {
  return (
    <DialogContent className="flex flex-col w-[1220px] h-[700px] overflow-auto p-6">
      <DialogHeader className="flex flex-row justify-between p-2">
        <div>
          <DialogTitle className="text-xl font-bold">
            {isEditing && organization
              ? organization.name
              : "Criar nova organização"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Atualize as informações da sua organização."
              : "Preencha os campos para criar uma nova organização."}
          </DialogDescription>
        </div>
        <div className="flex items-center gap-2">
          {organization && organization?.ownerId === user?.id && (
            <form action="">
              <Button
                formAction={async () =>
                  await deleteOrganization(organization.id)
                }
                title="Excluir tarefa"
                variant={"destructive"}
                size={"icon"}
              >
                <Trash2 className="size-4" />
              </Button>
            </form>
          )}
          {organization?.ownerId === user?.id && organization && (
            <InvitePopover organizationId={organization.id} />
          )}
        </div>
      </DialogHeader>
      <div className="flex flex-col justify-between h-full">
        <OrganizationForm organization={organization} isEditing={isEditing} />
      </div>
    </DialogContent>
  );
}
