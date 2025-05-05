import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../lib/utils";

export function ShadcnDialog({
  open,
  onOpenChange,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-1/2 left-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2",
            className
          )}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
