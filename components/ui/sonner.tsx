"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#171713] group-[.toaster]:border-[#E3E3DC] group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl font-sans text-sm",
          description: "group-[.toast]:text-[#73736C]",
          actionButton:
            "group-[.toast]:bg-[#014D21] group-[.toast]:text-white group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-[#F0F0EB] group-[.toast]:text-[#171713]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
