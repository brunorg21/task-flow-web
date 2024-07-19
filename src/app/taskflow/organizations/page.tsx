import { DetailsButton } from "@/components/details-button";
import { TableList } from "@/components/table";

import { EntityTable } from "@/types/entityTable";
import { Organization } from "@/types/organizaiton";

import { OrganizationModal } from "@/components/organization-modal/organization-modal";

export default function Organizations() {
  const orgs: Organization[] = [
    {
      id: "m5gr84i9",
      createdAt: new Date(),
      name: "Teste",
    },
    {
      id: "3u1reuv4",
      createdAt: new Date(),
      name: "Teste 1",
    },
    {
      id: "derv1ws0",
      createdAt: new Date(),
      name: "Teste 2",
    },
    {
      id: "5kma53ae",
      createdAt: new Date(),
      name: "Teste 3",
    },
    {
      id: "bhqecj4p",
      createdAt: new Date(),
      name: "Teste 4",
    },
    {
      id: "bhqecj4p",
      createdAt: new Date(),
      name: "Teste 5",
    },
    {
      id: "bhqecj4p",
      createdAt: new Date(),
      name: "Teste 6",
    },
    {
      id: "bhqecj4p",
      createdAt: new Date(),
      name: "Teste 7",
    },
    {
      id: "bhqecj4p",
      createdAt: new Date(),
      name: "Teste 8",
    },
    {
      id: "bhqecj4p",
      createdAt: new Date(),
      name: "Teste 9",
    },
  ];

  const headCells = [
    {
      label: "Nome",
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
          value: org.createdAt.toDateString(),
        },
        {
          value: <DetailsButton modal={<OrganizationModal />} />,
        },
      ],
    } as EntityTable;
  }

  const rows = orgs.map((org) => createTable(org));

  return (
    <div className="overflow-hidden p-4">
      <TableList entities={rows} headCells={headCells} />
    </div>
  );
}
