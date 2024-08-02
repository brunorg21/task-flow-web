"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpFormSchema = z.object({
  username: z.string(),
  password: z.string().min(5, {
    message: "Senha deve conter no minímo 5 caracteres",
  }),
  email: z.string().email({ message: "Insira um e-mail válido." }),
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const { register, handleSubmit, formState } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  async function handleRegister({ email, password, username }: SignUpFormType) {
    const response = await api("/user", {
      method: "POST",

      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col space-y-4"
      action=""
    >
      <Input {...register("username")} name="name" placeholder="Nome" />
      {formState.errors.username && (
        <span className="text-sm text-red-400">
          {formState.errors.username.message}
        </span>
      )}
      <Input
        {...register("email")}
        type="email"
        name="email"
        placeholder="Email"
      />
      {formState.errors.email && (
        <span className="text-sm text-red-400">
          {formState.errors.email.message}
        </span>
      )}
      <Input
        {...register("password")}
        type="password"
        name="password"
        placeholder="Senha"
      />
      {formState.errors.password && (
        <span className="text-sm text-red-400">
          {formState.errors.password.message}
        </span>
      )}

      <Button variant={"default"}>Cadastrar</Button>
    </form>
  );
}
