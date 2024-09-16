"use client";

import { FormSchema } from "@/types/form-schema";

import { z } from "zod";
import { Form } from "../form";
import { Organization } from "@/types/organization";
import {
  createOrganization,
  updateOrganization,
} from "@/services/organizations";
import { format } from "date-fns";
import { toast } from "../ui/use-toast";

interface OrganizationFormProps {
  organization?: Organization;
  isEditing?: boolean;
}

const organizationFormSchema = z.object({
  name: z
    .string({
      message: "Insira um nome para a organização.",
    })
    .min(5, {
      message: "Nome da organização deve conter no mínimo 5 caracteres.",
    }),
});

type OrganizationFormSchema = z.infer<typeof organizationFormSchema>;

export function OrganizationForm({
  isEditing,
  organization,
}: OrganizationFormProps) {
  async function handleSubmitForm({ name }: OrganizationFormSchema) {
    if (!isEditing) {
      const response = await createOrganization({
        name,
      });

      if (response.success) {
        toast({
          title: response.message,
        });
      } else {
        toast({
          title: response.message ?? "Erro ao criar organização!",
          variant: "destructive",
        });
      }
    } else if (!!organization) {
      const response = await updateOrganization({
        name,
        id: organization.id,
      });

      if (response.success) {
        toast({
          title: "Organização atualizada com sucesso!",
        });
      } else {
        toast({
          title: response.message ?? "Erro ao atualizar organização!",
          variant: "destructive",
        });
      }
    }
  }

  const formInputs: FormSchema[] = [
    {
      renderType: "TEXT",
      key: "name",
      name: "name",
      label: "Nome",
      placeholder: "Nome",
      size: 6,
      defaultValue: organization?.name,
    },
    {
      renderType: "TEXT",
      key: "responsible",
      name: "responsible",
      label: "Responsável",
      placeholder: "Responsável",
      size: 6,
      defaultValue: organization?.user.username ?? "",
      disabled: true,
    },
    {
      renderType: "TEXT",
      key: "slug",
      name: "slug",
      label: "Slug",
      placeholder: "Slug",
      size: 6,
      defaultValue: organization?.slug ?? "",
      disabled: true,
    },
    {
      renderType: "TEXT",
      key: "date",
      name: "date",
      label: "Data de criação",
      placeholder: "Data de criação",
      size: 6,
      disabled: true,
      defaultValue: organization
        ? format(organization.createdAt, "dd/MM/yyyy")
        : "",
    },
  ];

  return (
    <Form
      handleSubmitForm={handleSubmitForm}
      inputs={formInputs}
      formSchema={organizationFormSchema}
      isEditing={isEditing}
    />
  );
}
