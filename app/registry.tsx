"use client";

import { queryClient } from "@/lib/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";

export const Registry = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
