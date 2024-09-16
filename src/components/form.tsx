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
import { UploadButton } from "./upload-button";

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
  const defaultValues = inputs.reduce((acc: Record<string, any>, input) => {
    acc[input.name] = input.defaultValue;
    return acc;
  }, {});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
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
              render={({ field }) => {
                return (
                  <FormItem className={`col-span-${input.size}`}>
                    <FormLabel>{input.label}</FormLabel>
                    {input.renderType === "TEXT" && (
                      <FormControl>
                        <Input {...input} {...field} />
                      </FormControl>
                    )}
                    {input.renderType === "SELECT" && (
                      <Select
                        onValueChange={field.onChange}
                        disabled={input.disabled}
                        defaultValue={input.defaultValue?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue {...input} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {input.options?.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {input.renderType === "UPLOAD" && (
                      <FormControl {...field}>
                        <UploadButton
                          onChange={(attachments) =>
                            field.onChange(attachments)
                          }
                          name={input.name}
                          defaultAttachments={input.defaultAttachments}
                        />
                      </FormControl>
                    )}
                    <FormDescription>{input.description ?? ""}</FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
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
