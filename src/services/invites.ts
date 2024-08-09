"use server";

import { api } from "@/lib/api";
import { Invite } from "@/types/invites";
import { revalidateTag } from "next/cache";

import { cookies } from "next/headers";

interface SendInviteRequest {
  organizationId: string;
  email: string;
}
interface AcceptInviteRequest {
  inviteId: string;
}

export async function getReceivedInvites() {
  const token = cookies().get("@token")?.value;
  const response = await api(`/invites/received`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["invites"],
    },
    cache: "no-cache",
  });

  const { invites }: { invites: Invite[] } = await response.json();

  return { invites };
}

export async function sendInvite({ email, organizationId }: SendInviteRequest) {
  const token = cookies().get("@token")?.value;
  const response = await api("/invites", {
    method: "POST",
    body: JSON.stringify({
      email,
      organizationId,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: {
      tags: ["invites"],
    },
  });

  const { message } = await response.json();

  console.log(message);

  return { success: !!response.ok, message };
}

export async function acceptInvite({ inviteId }: AcceptInviteRequest) {
  const token = cookies().get("@token")?.value;
  const response = await api(`/invites/${inviteId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["invites"],
    },
  });

  if (response.ok) {
    revalidateTag("invites");
  }

  const { message } = await response.json();

  return { success: !!response.ok, message };
}
