"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "next/error";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signInFormSchema = z.object({
  email: z.string().email({ message: "Insira um e-mail válido." }),
  password: z.string(),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;

export default function SignInForm() {
  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
  });

  async function handleSignIn({ email, password }: SignInFormType) {
    await signIn({ email, password });
  }
  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="flex flex-col space-y-4"
      action=""
    >
      <Input
        id="email"
        {...register("email")}
        type="email"
        placeholder="Email"
      />
      {formState.errors.email && (
        <span className="text-sm text-red-400">
          {formState.errors.email.message}
        </span>
      )}
      <Input
        id="password"
        {...register("password")}
        type="password"
        placeholder="Senha"
      />
      {formState.errors.password && (
        <span className="text-sm text-red-400">
          {formState.errors.password.message}
        </span>
      )}
      <div className="flex justify-between">
        <Button type="submit" variant={"default"}>
          Entrar
        </Button>
        <div className="flex items-center space-x-2">
          <Checkbox id="remember username" />
          <label
            htmlFor="remember username"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Lembrar usuário?
          </label>
        </div>
      </div>
    </form>
  );
}
