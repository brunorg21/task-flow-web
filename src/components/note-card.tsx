import { Paperclip } from "lucide-react";
import { FileView } from "./file-view";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function NoteCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        Nota 1
        <Popover>
          <PopoverTrigger
            title="Anexos"
            className="hover:bg-primary-foreground rounded-full p-1"
          >
            <Paperclip />
          </PopoverTrigger>
          <PopoverContent className="space-y-4">
            <FileView />
            <FileView />
            <FileView />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus harum
        est soluta amet! Repellat, sequi qui vitae nam sed inventore accusantium
        deleniti molestias nemo provident aspernatur molestiae beatae ducimus
        sunt.
      </CardContent>
    </Card>
  );
}
