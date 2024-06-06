"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface NavProps {
  children: ReactNode;
  to: string;
}

export function Nav({ children, to }: NavProps) {
  const pathname = usePathname();

  return (
    <Button variant={"link"} asChild>
      <Link
        className={`flex gap-2 text-lg font-normal ${
          pathname.includes(to) &&
          "text-primary-foreground bg-secondary-foreground"
        }`}
        href={to}
      >
        {children}
      </Link>
    </Button>
  );
}
