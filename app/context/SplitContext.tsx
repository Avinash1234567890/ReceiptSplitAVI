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
  addItem: (name: string, price: number) => void;
  deleteItem: (id: number) => void;
}

const SplitContext = createContext<SplitContextType | null>(null);

export function SplitProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [assignments, setAssignments] = useState<Record<number, string[]>>({});
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [tipPercent, setTipPercent] = useState<number>(20);

  const addItem = (name: string, price: number) => {
    setItems(prevItems => {
      const newItem: ReceiptItem = {
        id: (prevItems.length > 0 ? Math.max(...prevItems.map(i => i.id)) : 0) + 1,
        name,
        price,
      };
      return [...prevItems, newItem];
    });
  };

  const deleteItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    setAssignments(prevAssignments => {
      const newAssignments = { ...prevAssignments };
      delete newAssignments[id];
      return newAssignments;
    });
  };

  return (
    <SplitContext.Provider
      value={{
        items, setItems,
        people, setPeople,
        assignments, setAssignments,
        taxPercent, setTaxPercent,
        tipPercent, setTipPercent,
        addItem,
        deleteItem,
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
