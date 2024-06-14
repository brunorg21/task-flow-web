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

interface FormProps {
  formSchema: ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
  handleSubmitForm: (event: any) => void;
  inputs: FormSchema[];
}

export function Form({ formSchema, handleSubmitForm, inputs }: FormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <FormContainer {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="grid grid-cols-12 gap-2"
      >
        {inputs.map((input) => (
          <FormField
            key={input.name}
            control={form.control}
            name={input.name as never}
            render={({ field }) => (
              <FormItem className={`col-span-${input.size}`}>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Input placeholder={input.placeholder} {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Salvar</Button>
      </form>
    </FormContainer>
  );
}
