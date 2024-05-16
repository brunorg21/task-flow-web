import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center h-full bg-muted">
      <div className="flex flex-col w-[400px] p-4 space-y-4">
        <div className="text-center text-2xl font-semibold space-y-4">
          Acesse sua conta
          <p className="text-sm font-normal mt-2">Acompanhe suas tarefas</p>
        </div>

        <form className="flex flex-col space-y-4" action="">
          <Input placeholder="Email" />
          <Input placeholder="Senha" />
          <div className="flex justify-between">
            <Button variant={"default"}>Entrar</Button>
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
      </div>
    </div>
  );
}
