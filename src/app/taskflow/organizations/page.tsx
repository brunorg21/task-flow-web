import { DetailsButton } from "@/components/details-button";
import { TableList } from "@/components/table";

import { EntityTable } from "@/types/entityTable";
import { Organization } from "@/types/organization";

import { OrganizationModal } from "@/components/organization-modal/organization-modal";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getOrganizations } from "@/services/organizations";
import { format } from "date-fns";

export default async function Organizations() {
  const orgs = await getOrganizations();

  const headCells = [
    {
      label: "Nome",
    },
    {
      label: "Responsável",
    },
    {
      label: "Slug",
    },
    {
      label: "Data de criação",
    },
    {
      label: "",
      customStyle: "w-[30px]",
    },
  ];
  function createTable(org: Organization) {
    return {
      id: org.id,
      contents: [
        {
          value: org.name,
        },
        {
          value: org.user.username,
        },
        {
          value: org.slug,
        },
        {
          value: format(new Date(org.createdAt), "dd/MM/yyyy"),
        },

        {
          value: (
            <DetailsButton
              entityId={org.id}
              modal={<OrganizationModal organization={org} isEditing={true} />}
            />
          ),
        },
      ],
    } as EntityTable;
  }

  const rows = orgs.map((org) => createTable(org));

  return (
    <div className="overflow-hidden p-4">
      <div className="flex justify-end items-center gap-2 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" variant={"default"}>
              <PlusCircle className="w-4 h-4" />
              Nova organização
            </Button>
          </DialogTrigger>
          <OrganizationModal />
        </Dialog>
      </div>
      <TableList entities={rows} headCells={headCells} />
    </div>
  );
}
