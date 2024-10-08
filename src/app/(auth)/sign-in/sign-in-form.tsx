"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { signInWithEmail } from "@/providers/actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { Circle, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signInFormSchema = z.object({
  email: z.string().email({ message: "Insira um e-mail válido." }),
  password: z.string(),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;

export default function SignInForm() {
  const { register, handleSubmit, formState } = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function handleSignIn({ email, password }: SignInFormType) {
    setLoading(true);
    await signInWithEmail({ email, password });
    setLoading(false);
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
        <Button disabled={loading} type="submit" variant={"default"}>
          {loading ? (
            <span className="flex items-center gap-1">
              <LoaderCircle className="animate-spin" /> Entrar
            </span>
          ) : (
            "Entrar"
          )}
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
