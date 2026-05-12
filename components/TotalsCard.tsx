"use client";

import { Person } from "@/lib/types";

// Helper to determine if a color is light or dark
function getContrastText(bgColor: string) {
  // Remove hash if present
  const color = bgColor.replace('#', '');
  // Parse r, g, b
  const bigint = parseInt(color.length === 3 ? color.split('').map(x => x + x).join('') : color, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  // Perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? '#111' : '#fff';
}

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
  const textColor = getContrastText('#fff'); // TotalsCard is always white
  return (
    <div
      className="rounded-2xl p-5 border-2 flex flex-col gap-2 shadow-lg bg-white"
      style={{ borderColor: person.color, boxShadow: `0 2px 16px 0 ${person.color}44`, color: textColor }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className="w-4 h-4 rounded-full border-2 border-white"
          style={{ backgroundColor: person.color }}
        />
        <h3 className="font-black text-lg md:text-xl tracking-tight uppercase" style={{ color: person.color }}>{person.name}</h3>
      </div>
      <div className="space-y-1 text-sm font-black">
        <div className="flex justify-between opacity-80">
          <span>Subtotal</span>
          <span>${breakdown.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between" style={{ color: '#FF00A8' }}>
          <span>Tax</span>
          <span>${breakdown.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between" style={{ color: '#A259FF' }}>
          <span>Tip</span>
          <span>${breakdown.tip.toFixed(2)}</span>
        </div>
        <div className="border-t-2 border-lime pt-2 flex justify-between text-lime text-lg font-black">
          <span>Total</span>
          <span>${breakdown.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
