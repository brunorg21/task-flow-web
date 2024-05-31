import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function TaskFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-h-full">
      <Header />
      <Separator />
      {children}
    </div>
  );
}
