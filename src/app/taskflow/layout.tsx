import { auth } from "@/auth/auth";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default async function TaskFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth();

  return (
    <div className="max-h-full">
      <Header />
      <Separator />
      {children}
    </div>
  );
}
