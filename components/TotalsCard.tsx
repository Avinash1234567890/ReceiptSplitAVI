"use client";

import { Person } from "@/lib/types";

interface Breakdown {
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
}

interface Props {
  person: Person;
  breakdown: Breakdown;
}

export default function TotalsCard({ person, breakdown }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: person.color }}
        />
        <h3 className="font-semibold text-gray-800 text-lg">{person.name}</h3>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>${breakdown.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax</span>
          <span>${breakdown.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tip</span>
          <span>${breakdown.tip.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-800 text-base">
          <span>Total</span>
          <span>${breakdown.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
