import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { OrganizationForm } from "./organization-form";

export function OrganizationModal() {
  return (
    <DialogContent className="flex flex-col w-[1220px] h-[700px] overflow-auto p-6">
      <DialogHeader className="p-2">
        <DialogTitle className="text-xl font-bold">Organização 1</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col justify-between h-full">
        <OrganizationForm />
      </div>
    </DialogContent>
  );
}
