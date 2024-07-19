import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="md:grid md:grid-rows-8 p-3 space-y-3">
      <div className="row-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Suas tarefas</h1>
        <Skeleton className="w-80 h-40" />
      </div>

      <div className="row-span-4 space-y-4">
        <h1 className="text-2xl font-bold">Tarefas das suas organizações</h1>
        <div className="md:grid md:grid-cols-12 gap-2 flex flex-col">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center col-span-2">
              <Skeleton className="w-80 h-40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
