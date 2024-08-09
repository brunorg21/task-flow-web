import { ComponentProps } from "react";

export type BaseFormSchema = ComponentProps<"input"> & {
  size: number;
  label: string;
  description?: string;
  hidden?: boolean;
  renderType: "SELECT" | "TEXT";
};

export type SelectFormSchema = BaseFormSchema & {
  renderType: "SELECT";
  options: { id: string; value: string }[];
};

export type TextFormSchema = BaseFormSchema & {
  renderType: "TEXT";
};

export type FormSchema = SelectFormSchema | TextFormSchema;
