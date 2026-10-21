"use client";

import { createContext, useContext, useState } from "react";
import type { ModuleId } from "@/lib/contact-mailto";

const ConfigurationContext = createContext<{
  selected: ModuleId[];
  setSelected: React.Dispatch<React.SetStateAction<ModuleId[]>>;
} | null>(null);

export function DemoConfiguration({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<ModuleId[]>(["pedidos"]);
  return (
    <ConfigurationContext.Provider value={{ selected, setSelected }}>
      {children}
    </ConfigurationContext.Provider>
  );
}

export function useDemoConfiguration() {
  const context = useContext(ConfigurationContext);
  if (!context) throw new Error("DemoConfiguration provider missing");
  return context;
}
