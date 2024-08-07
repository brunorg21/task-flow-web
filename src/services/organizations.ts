"use server";

import { api } from "@/lib/api";
import { Organization } from "@/types/organization";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const token = cookies().get("@token")?.value;

export async function getOrganizations() {
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

export async function deleteOrganization(orgId: string) {
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
