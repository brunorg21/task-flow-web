"use server";

import { api } from "@/lib/api";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function getUsersByOrganization(slug: string) {
  const token = cookies().get("@token")?.value;

  const response = await api(`/userOrganization/${slug}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["userOrganization"],
    },
    cache: "no-cache",
  });

  const { users }: { users: User[] } = await response.json();

  return users;
}
