import { ComponentProps, ReactNode } from "react";

type IconButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
};

export function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className="rounded-full p-1 hover:bg-secondary-foreground hover:text-primary-foreground duration-150"
    >
      {children}
    </button>
  );
}
