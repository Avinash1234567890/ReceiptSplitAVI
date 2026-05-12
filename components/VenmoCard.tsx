
"use client";

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

import { Person } from "@/lib/types";
import { Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Props {
  person: Person;
  amount: number;
  note: string;
  venmoLink: string;
}

export default function VenmoCard({ person, amount, note, venmoLink }: Props) {
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedNote, setCopiedNote] = useState(false);

  const copyToClipboard = async (text: string, type: "amount" | "note") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "amount") {
        setCopiedAmount(true);
        setTimeout(() => setCopiedAmount(false), 2000);
      } else {
        setCopiedNote(true);
        setTimeout(() => setCopiedNote(false), 2000);
      }
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      if (type === "amount") {
        setCopiedAmount(true);
        setTimeout(() => setCopiedAmount(false), 2000);
      } else {
        setCopiedNote(true);
        setTimeout(() => setCopiedNote(false), 2000);
      }
    }
  };

  const textColor = getContrastText(person.color);
  return (
    <div
      className="rounded-2xl p-5 border-2 flex flex-col gap-3 shadow-lg"
      style={{ borderColor: person.color, background: person.color, color: textColor }}
    >
      <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: textColor }}>
        Venmo {person.name}
      </div>
      <div className="flex items-center gap-3 mb-1">
        <span className="text-3xl font-black drop-shadow" style={{ color: textColor }}>${amount.toFixed(2)}</span>
        <button
          onClick={() => copyToClipboard(amount.toFixed(2), "amount")}
          className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg border-2 border-lime font-black transition-colors duration-150"
          style={{ background: textColor, color: person.color }}
        >
          <Copy size={14} />
          {copiedAmount ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex items-start gap-2 mb-2">
        <p className="text-xs flex-1 leading-relaxed font-medium" style={{ color: textColor, opacity: 0.8 }}>{note}</p>
        <button
          onClick={() => copyToClipboard(note, "note")}
          className="flex-shrink-0 flex items-center gap-1 text-xs px-2 py-1 rounded-lg border-2 border-pink-500 font-black transition-colors duration-150"
          style={{ background: textColor, color: person.color }}
        >
          <Copy size={13} />
          {copiedNote ? "Copied!" : "Copy note"}
        </button>
      </div>
      <a
        href={venmoLink}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-base font-black shadow-md transition-opacity hover:opacity-90 uppercase tracking-wide"
        style={{ boxShadow: `0 2px 16px 0 ${person.color}44`, background: textColor, color: person.color }}
        target="_blank" rel="noopener noreferrer"
      >
        <ExternalLink size={18} />
        Open Venmo
      </a>
    </div>
  );
}
