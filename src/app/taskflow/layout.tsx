import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function TaskFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <Separator />
      {children}
    </div>
  );
}
