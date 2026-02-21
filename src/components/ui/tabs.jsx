import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const TabsContext = createContext(null);

export function Tabs({ defaultValue, value: valueProp, onValueChange, children }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = valueProp ?? internalValue;

  const setValue = (next) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full p-1 text-sm",
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, value, children, ...props }) {
  const ctx = useContext(TabsContext);
  const isActive = ctx?.value === value;

  return (
    <button
      type="button"
      onClick={() => ctx?.setValue(value)}
      className={cn(
        "px-6 py-1 rounded-full transition-colors",
        isActive
          ? "bg-[#FE5443] text-white"
          : "text-[#000000] hover:text-[#FE5443]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ className, value, children, ...props }) {
  const ctx = useContext(TabsContext);
  if (ctx?.value !== value) return null;

  return (
    <div className={cn("mt-4", className)} {...props}>
      {children}
    </div>
  );
}

