"use client";

import { ReceiptItem } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface Props {
  item: ReceiptItem;
  onUpdate: (updated: ReceiptItem) => void;
  onDelete: (id: number) => void;
}

export default function ReceiptItemCard({ item, onUpdate, onDelete }: Props) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex-1">
        <input
          className="w-full text-sm font-medium text-gray-800 bg-transparent border-b border-transparent focus:border-indigo-400 focus:outline-none pb-0.5"
          value={item.name}
          onChange={(e) => onUpdate({ ...item, name: e.target.value })}
          placeholder="Item name"
        />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-400 text-sm">$</span>
        <input
          className="w-20 text-sm font-semibold text-gray-800 bg-transparent border-b border-transparent focus:border-indigo-400 focus:outline-none text-right pb-0.5"
          value={item.price}
          type="number"
          min="0"
          step="0.01"
          onChange={(e) => onUpdate({ ...item, price: parseFloat(e.target.value) || 0 })}
        />
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="text-gray-300 hover:text-red-400 transition-colors p-1"
        aria-label="Delete item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
