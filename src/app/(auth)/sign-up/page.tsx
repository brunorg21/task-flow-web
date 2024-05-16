import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center h-full bg-muted">
      <div className="flex flex-col w-[400px] p-4 space-y-4">
        <div className="text-center text-2xl font-semibold space-y-2">
          Crie sua conta
          <p className="text-sm font-normal">Acompanhe suas tarefas</p>
        </div>

        <form className="flex flex-col space-y-4" action="">
          <Input placeholder="Nome" />
          <Input placeholder="Email" />
          <Input placeholder="Senha" />

          <Button variant={"default"}>Cadastrar</Button>
        </form>
      </div>
    </div>
  );
}
