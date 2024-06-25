"use client";

import { FormSchema } from "@/types/form-schema";

import { z } from "zod";
import { Form } from "../form";

export function OrganizationForm() {
  const formSchema = z.object({
    name: z.string(),
    creator: z.string(),

    date: z.string(),
  });

  function handleSubmitForm(data: any) {
    console.log(data);
  }

  const formInputs = [
    {
      key: "name",
      name: "name",
      label: "Nome",
      placeholder: "Nome",
      size: 6,
    },
    {
      key: "creator",
      name: "creator",
      label: "Criador",
      placeholder: "Criador",
      description: "Dono da organização.",
      size: 6,
    },
    {
      key: "date",
      name: "date",
      label: "Data de criação",
      placeholder: "Data de criação",
      size: 12,
      disabled: true,
    },
  ] as FormSchema[];

  return (
    <Form
      handleSubmitForm={handleSubmitForm}
      inputs={formInputs}
      formSchema={formSchema}
    />
  );
}
