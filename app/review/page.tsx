"use client";

import { useRouter } from "next/navigation";
import { useSplit } from "@/app/context/SplitContext";
import ReceiptItemCard from "@/components/ReceiptItemCard";
import { ReceiptItem } from "@/lib/types";
import { computeSubtotal } from "@/lib/calculations";
import { Plus, ArrowLeft } from "lucide-react";

export default function ReviewPage() {
  const router = useRouter();
  const { items, setItems, taxPercent, setTaxPercent, tipPercent, setTipPercent } = useSplit();

  const subtotal = computeSubtotal(items);
  const taxAmount = (taxPercent / 100) * subtotal;
  const tipAmount = (tipPercent / 100) * subtotal;
  const grandTotal = subtotal + taxAmount + tipAmount;

  const handleUpdate = (updated: ReceiptItem) => {
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAddItem = () => {
    const newItem: ReceiptItem = {
      id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      name: "",
      price: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col min-h-screen px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Review Items</h1>
        </div>

        {/* Items */}
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <ReceiptItemCard
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Add Item */}
        <button
          onClick={handleAddItem}
          className="w-full h-11 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-indigo-200 text-indigo-400 text-sm font-medium hover:bg-indigo-50 transition-colors mb-6"
        >
          <Plus size={16} />
          Add Item
        </button>

        {/* Tax & Tip */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Tax & Tip</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Tax %</label>
              <div className="flex items-center gap-1 border border-gray-200 rounded-xl px-3 py-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm text-gray-800 bg-transparent focus:outline-none"
                />
                <span className="text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Tip %</label>
              <div className="flex items-center gap-1 border border-gray-200 rounded-xl px-3 py-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={tipPercent}
                  onChange={(e) => setTipPercent(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm text-gray-800 bg-transparent focus:outline-none"
                />
                <span className="text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Totals summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-24">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax ({taxPercent}%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tip ({tipPercent}%)</span>
              <span>${tipAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-800 text-base">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-10">
          <div className="max-w-md mx-auto">
            <button
              onClick={() => router.push("/split")}
              disabled={items.length === 0}
              className="w-full h-14 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-base font-semibold rounded-2xl shadow-md shadow-indigo-200 transition-all active:scale-95"
            >
              Next: Add People →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
