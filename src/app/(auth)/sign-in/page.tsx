"use client";

import SignInForm from "./sign-in-form";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center h-full bg-muted">
      <div className="flex flex-col w-[400px] p-4 space-y-4">
        <div className="text-center text-2xl font-semibold space-y-4">
          Acesse sua conta
          <p className="text-sm font-normal mt-2">Acompanhe suas tarefas</p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
