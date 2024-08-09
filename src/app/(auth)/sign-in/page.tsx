"use client";

import SignInForm from "./sign-in-form";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-muted">
      <div className="flex flex-col w-[400px] p-4 space-y-4">
        <div className="text-center text-2xl font-semibold space-y-4">
          Acesse sua conta
          <p className="text-sm font-normal mt-2">Acompanhe suas tarefas</p>
        </div>
        <SignInForm />
      </div>
      <span className="flex items-center gap-2">
        Não possui conta?
        <Link href={"/sign-up"}>Crie agora</Link>
      </span>
    </div>
  );
}
