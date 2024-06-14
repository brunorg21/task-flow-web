import { ReactNode } from "react";

interface ContentProps {
  value: ReactNode | string;
}

export interface EntityTable {
  id: string;
  contents: ContentProps[];
}
