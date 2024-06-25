import { Button } from "@/components/ui/button";
import { Github, Linkedin, Workflow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Auth({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full justify-between">
      <div className="w-[900px] flex flex-col justify-between p-4 bg-primary-foreground">
        <div className="flex justify-between items-center">
          <h1 className="text-lg flex gap-4 items-center space-y-4 font-bold text-md">
            <Image src={"/logo.png"} alt="" width={40} height={40} /> task.flow
          </h1>
          <div className="flex space-x-4">
            <Button asChild variant={"ghost"}>
              <Link
                className="flex gap-2 items-center"
                href={"https://github.com/brunorg21"}
                target="_blank"
              >
                <Github /> Github
              </Link>
            </Button>
            <Button asChild variant={"ghost"}>
              <Link
                className="flex gap-2 items-center "
                href={"https://github.com/brunorg21"}
                target="_blank"
              >
                <Linkedin /> LinkedIn
              </Link>
            </Button>
          </div>
        </div>

        <footer className="text-sm font-medium">
          Desenvolvido por Bruno Rafael - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}
