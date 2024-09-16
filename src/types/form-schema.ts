import { ComponentProps } from "react";
import { Attachment } from "./attachment";

export type BaseFormSchema = ComponentProps<"input"> & {
  key: string;
  name: string;
  size: number;
  label: string;
  description?: string;
  hidden?: boolean;
  renderType: "SELECT" | "TEXT" | "UPLOAD";
};

export type SelectFormSchema = BaseFormSchema & {
  renderType: "SELECT";
  options: { id: string; value: string }[];
};

export type TextFormSchema = BaseFormSchema & {
  renderType: "TEXT";
};

export type UploadFormSchema = BaseFormSchema & {
  renderType: "UPLOAD";
  defaultAttachments: Attachment[];
};

export type FormSchema = SelectFormSchema | TextFormSchema | UploadFormSchema;
