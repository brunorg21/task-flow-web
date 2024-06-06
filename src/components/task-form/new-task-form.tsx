import { FormInput } from "./form-input";

export function NewTaskForm() {
  return (
    <form className="flex h-full" action="">
      <div className="grid grid-cols-12 w-full gap-2">
        <div className="flex flex-col justify-between col-span-6">
          <div className="space-y-4">
            <FormInput placeholder="Título da tarefa" label="Título" />
            <FormInput
              value={new Date().getFullYear()}
              placeholder="Data de criação"
              id="date"
              label="Data de criação"
              disabled
            />
            <FormInput
              value={"Em andamento"}
              placeholder="Status da tarefa"
              type="select"
              id="status"
              label="Status"
            />
          </div>
          <div>aa</div>
        </div>
        <div className="col-span-6 space-y-4">
          <FormInput
            placeholder="Responsável"
            id="responsible"
            label="Responsável"
          />
          <FormInput
            placeholder="Organização"
            id="organization"
            label="Organização"
            disabled
          />
        </div>
      </div>
    </form>
  );
}
