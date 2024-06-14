import { ComponentProps } from "react";

export type FormSchema = ComponentProps<"input"> & {
  size: number;
  label: string;
};
