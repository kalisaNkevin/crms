import { ReactNode } from "react";
import { Dialog, DialogContent } from "../ui/dialog";

interface MainModalProps {
  onDismiss: () => void;
  open: boolean;
  children: ReactNode;
  modalSize?: "large" | "default";
  showCloseIcon?: boolean;
  className?: string;
}
export const MainModal = ({
  children,
  onDismiss,
  open,
  modalSize,
  className,
}: MainModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onDismiss}>
      <DialogContent modalSize={modalSize} className={className}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
