import { getProfile } from "@/providers/actions";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function auth() {
  const token = cookies().get("@token")?.value;

  if (!token) {
    redirect("/sign-in");
  }

  try {
    const { user }: { user: User } = await getProfile(token);

    return { user };
  } catch (error) {}

  redirect("/sign-out");
}
