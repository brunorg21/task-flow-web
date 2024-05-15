import { Input } from "@/components/ui/input";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col w-[400px] p-4 space-y-4">
        <div className="text-secondary text-center text-2xl font-semibold space-y-2">
          Acesse sua conta
          <p className="text-sm font-normal text-zinc-400">
            Acompanhe suas tarefas
          </p>
        </div>

        <Input placeholder="Nome" />
        <Input placeholder="Email" />
        <Input placeholder="Senha" />
      </div>
    </div>
  );
}
