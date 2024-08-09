"use server";

import { SignInFormType } from "@/app/(auth)/sign-in/sign-in-form";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithEmail({ email, password }: SignInFormType) {
  const response = await api("/authenticate", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const { token } = await response.json();

  cookies().set("@token", token, {
    maxAge: 60 * 60 * 24,
  });

  redirect("/taskflow/tasks");
}

export async function getProfile(token: string) {
  const response = await api("/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    cache: "no-store",
  });

  const user = await response.json();

  return { user };
}

