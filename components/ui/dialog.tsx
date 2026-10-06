"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Context for Dialog compound component
interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a <Dialog /> component");
  }
  return context;
}

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { onOpenChange } = useDialog();

    return (
      <button
        ref={ref}
        type="button"
        className={cn("cursor-pointer", className)}
        onClick={(e) => {
          onClick?.(e);
          onOpenChange(true);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DialogTrigger.displayName = "DialogTrigger";

const emptySubscribe = () => () => {};

export function DialogPortal({ children }: { children: React.ReactNode }) {
  const { open } = useDialog();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted || !open) return null;
  return createPortal(children, document.body);
}

export type DialogOverlayProps = React.HTMLAttributes<HTMLDivElement>;

export const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = useDialog();

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in",
          className
        )}
        onClick={(e) => {
          onClick?.(e);
          onOpenChange(false);
        }}
        {...props}
      />
    );
  }
);
DialogOverlay.displayName = "DialogOverlay";

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  showCloseButton?: boolean;
  closeButtonPosition?: "inside" | "outside" | "top-right";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  full: "max-w-[95vw] max-h-[95vh]",
};

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      className,
      children,
      size = "md",
      showCloseButton = true,
      closeButtonPosition = "top-right",
      ...props
    },
    ref
  ) => {
    const { onOpenChange } = useDialog();

    // Handle ESC key
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onOpenChange]);

    // Prevent body scroll when open
    React.useEffect(() => {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, []);

    return (
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative w-full bg-white rounded-2xl shadow-2xl border border-[#E3E3DC] p-6 text-[#171713] pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200",
              sizeClasses[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {showCloseButton && (
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "absolute z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white text-[#85857B] hover:text-[#171713] border border-[#E3E3DC] shadow-2xs transition-colors cursor-pointer",
                  closeButtonPosition === "top-right" && "top-3.5 right-3.5",
                  closeButtonPosition === "outside" && "-top-3 -right-3 sm:-top-4 sm:-right-4",
                  closeButtonPosition === "inside" && "top-4 right-4"
                )}
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {children}
          </div>
        </div>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-left pb-4 border-b border-[#E3E3DC]", className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-bold text-[#171713] font-heading", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-[#85857B] font-body", className)}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t border-[#E3E3DC]",
        className
      )}
      {...props}
    />
  );
}

export function DialogClose({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useDialog();

  return (
    <button
      type="button"
      className={cn("cursor-pointer", className)}
      onClick={() => onOpenChange(false)}
      {...props}
    >
      {children}
    </button>
  );
}

// -------------------------------------------------------------
// Direct Standalone Modal Component (Clean, Declarative API)
// -------------------------------------------------------------
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  showCloseButton?: boolean;
  className?: string;
  closeOnBackdropClick?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  className,
  closeOnBackdropClick = true,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay onClick={() => closeOnBackdropClick && onClose()} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
          <div
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative w-full bg-white rounded-2xl shadow-2xl border border-[#E3E3DC] p-6 text-[#171713] pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200",
              sizeClasses[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="absolute z-10 top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-white text-[#85857B] hover:text-[#171713] border border-[#E3E3DC] shadow-2xs transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {(title || description) && (
              <DialogHeader>
                {title && <DialogTitle>{title}</DialogTitle>}
                {description && <DialogDescription>{description}</DialogDescription>}
              </DialogHeader>
            )}

            <div className={cn((title || description) && "pt-4")}>{children}</div>

            {footer && <DialogFooter className="mt-4">{footer}</DialogFooter>}
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}
