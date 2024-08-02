import Link from "next/link";
import { SignUpForm } from "./sign-up-form";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-muted">
      <div className="flex flex-col w-[400px] p-4 space-y-4">
        <div className="text-center text-2xl font-semibold space-y-2">
          Crie sua conta
          <p className="text-sm font-normal">Acompanhe suas tarefas</p>
        </div>

        <SignUpForm />
      </div>
      <span className="flex items-center gap-2">
        Já possui conta?
        <Button>
          <Link href={"/sign-in"}>Entrar agora</Link>
        </Button>
      </span>
    </div>
  );
}
