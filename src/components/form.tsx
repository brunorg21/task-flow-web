import { Button } from "./ui/button";
import {
  FormField,
  Form as FormContainer,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject, z } from "zod";
import { Input } from "./ui/input";
import { FormSchema } from "@/types/form-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FormProps {
  formSchema: ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
  handleSubmitForm: (event: any) => void;
  inputs: FormSchema[];
  isEditing?: boolean;
}

export function Form({
  formSchema,
  handleSubmitForm,
  inputs,
  isEditing,
}: FormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <FormContainer {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="grid grid-cols-12 gap-2"
      >
        {inputs.map((input) => {
          if (input.hidden) {
            return null;
          }

          return (
            <FormField
              key={input.name}
              control={form.control}
              name={input.name as never}
              render={({ field }) => (
                <FormItem className={`col-span-${input.size}`}>
                  <FormLabel>{input.label}</FormLabel>
                  {input.renderType === "TEXT" && (
                    <FormControl>
                      <Input {...input} {...field} />
                    </FormControl>
                  )}
                  {input.renderType === "SELECT" && (
                    <Select {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue {...input} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {input.options?.map((option) => (
                          <SelectItem key={option.id} value={option.value}>
                            {option.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormDescription>{input.description ?? ""}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button className="mt-8" type="submit">
          {isEditing ? "Salvar" : "Criar"}
        </Button>
      </form>
    </FormContainer>
  );
}
