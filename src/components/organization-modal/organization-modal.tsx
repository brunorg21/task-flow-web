import { Organization } from "@/types/organization";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { OrganizationForm } from "./organization-form";

interface OrganizationModalProps {
  organization?: Organization;
  isEditing?: boolean;
}

export function OrganizationModal({
  isEditing = false,
  organization,
}: OrganizationModalProps) {
  return (
    <DialogContent className="flex flex-col w-[1220px] h-[700px] overflow-auto p-6">
      <DialogHeader className="p-2">
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
      </DialogHeader>
      <div className="flex flex-col justify-between h-full">
        <OrganizationForm organization={organization} isEditing={isEditing} />
      </div>
    </DialogContent>
  );
}
