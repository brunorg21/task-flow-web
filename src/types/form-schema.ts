import { ComponentProps } from "react";

export type FormSchema = ComponentProps<"input"> & {
  size: number;
  label: string;
  description?: string;
  hidden?: boolean;
};
