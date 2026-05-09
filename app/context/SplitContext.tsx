"use client";

import React, { createContext, useContext, useState } from "react";
import { ReceiptItem, Person } from "@/lib/types";

interface SplitContextType {
  items: ReceiptItem[];
  setItems: React.Dispatch<React.SetStateAction<ReceiptItem[]>>;
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  assignments: Record<number, string[]>;
  setAssignments: React.Dispatch<React.SetStateAction<Record<number, string[]>>>;
  taxPercent: number;
  setTaxPercent: React.Dispatch<React.SetStateAction<number>>;
  tipPercent: number;
  setTipPercent: React.Dispatch<React.SetStateAction<number>>;
}

const SplitContext = createContext<SplitContextType | null>(null);

export function SplitProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [assignments, setAssignments] = useState<Record<number, string[]>>({});
  const [taxPercent, setTaxPercent] = useState<number>(8.875);
  const [tipPercent, setTipPercent] = useState<number>(20);

  return (
    <SplitContext.Provider
      value={{
        items, setItems,
        people, setPeople,
        assignments, setAssignments,
        taxPercent, setTaxPercent,
        tipPercent, setTipPercent,
      }}
    >
      {children}
    </SplitContext.Provider>
  );
}

export function useSplit() {
  const ctx = useContext(SplitContext);
  if (!ctx) throw new Error("useSplit must be used within SplitProvider");
  return ctx;
}
