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
    <Button variant={"ghost"} asChild>
      <Link
        className={`flex gap-2 text-lg ${
          pathname.includes(to) && "bg-secondary"
        }`}
        href={to}
      >
        {children}
      </Link>
    </Button>
  );
}
