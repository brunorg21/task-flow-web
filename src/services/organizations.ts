"use server";

import { api } from "@/lib/api";
import { Organization } from "@/types/organization";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getOrganizations() {
  const token = cookies().get("@token")?.value;
  const response = await api("/organizations", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["organizations"],
    },
  });

  const { organizations }: { organizations: Organization[] } =
    await response.json();

  return organizations;
}

export async function createOrganization({
  name,
}: Omit<Organization, "createdAt" | "id" | "ownerId" | "slug" | "user">) {
  const token = cookies().get("@token")?.value;
  const response = await api("/organizations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (response.ok) {
    revalidateTag("organizations");
  }

  const { message } = await response.json();

  return { success: !!response.ok, message };
}

export async function updateOrganization({
  name,
  id,
}: Omit<Organization, "createdAt" | "ownerId" | "user" | "slug">) {
  const token = cookies().get("@token")?.value;
  const response = await api(`/organizations/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (response.ok) {
    revalidateTag("organizations");
    return {
      success: !!response.ok,
      message: "Organização atualizada com sucesso!",
    };
  }

  const { message } = await response.json();

  return { success: !!response.ok, message };
}

export async function deleteOrganization(orgId: string) {
  const token = cookies().get("@token")?.value;
  const response = await api(`/organizations/${orgId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    revalidateTag("organizations");
  }

  return { success: !!response.ok };
}
