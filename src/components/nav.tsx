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
  console.log(pathname);
  return (
    <Button variant={"ghost"} asChild>
      <Link
        className={`flex gap-2 text-lg ${pathname === to && "bg-secondary"}`}
        href={to}
      >
        {children}
      </Link>
    </Button>
  );
}
