"use client";

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

  return (
    <div
      className="rounded-2xl p-4 border-2"
      style={{ borderColor: person.color + "44", backgroundColor: person.color + "08" }}
    >
      <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: person.color }}>
        Venmo {person.name}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl font-bold text-gray-800">${amount.toFixed(2)}</span>
        <button
          onClick={() => copyToClipboard(amount.toFixed(2), "amount")}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <Copy size={12} />
          {copiedAmount ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex items-start gap-2 mb-3">
        <p className="text-xs text-gray-500 flex-1 leading-relaxed">{note}</p>
        <button
          onClick={() => copyToClipboard(note, "note")}
          className="flex-shrink-0 flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <Copy size={12} />
          {copiedNote ? "Copied!" : "Copy note"}
        </button>
      </div>
      <a
        href={venmoLink}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ backgroundColor: person.color }}
      >
        <ExternalLink size={14} />
        Open Venmo
      </a>
    </div>
  );
}
