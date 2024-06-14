import { ArrowDownToLine, FileImage, X } from "lucide-react";

export function FileView() {
  return (
    <div className="flex flex-col gap-1 col-span-2">
      <div className="flex justify-around gap-1 items-center border rounded-sm">
        <FileImage className="w-5 h-5" />
        <span className="text-sm">filename.png</span>

        <span className="hover:bg-secondary rounded-full hover:cursor-pointer p-1">
          <X className="w-4 h-4" />
        </span>
        <span className="hover:bg-secondary rounded-full hover:cursor-pointer p-1">
          <ArrowDownToLine className="w-4 h-4" />
        </span>
      </div>
      <span className="border border-secondary-foreground"></span>
    </div>
  );
}
