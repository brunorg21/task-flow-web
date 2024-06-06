import { ComponentProps } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormInputProps = ComponentProps<"input"> & {
  label: string;
  type?: "input" | "select";
};

export function FormInput({ label, type = "input", ...props }: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.id}>{label}</Label>
      {type === "input" ? (
        <Input {...props} />
      ) : (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue {...props} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Em andamento">Em andamento</SelectItem>
            <SelectItem value="Cancelada">Cancelada</SelectItem>
            <SelectItem value="Concluída">Concluída</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
