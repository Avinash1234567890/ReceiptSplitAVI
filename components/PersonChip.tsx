"use client";

import { Person } from "@/lib/types";
import { X } from "lucide-react";

interface Props {
  person: Person;
  onDelete?: (id: string) => void;
  isSelected?: boolean;
  onClick?: (id: string) => void;
}

export default function PersonChip({ person, onDelete, isSelected, onClick }: Props) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all select-none ${
        isSelected
          ? "ring-2 ring-offset-1 shadow-md scale-105"
          : "opacity-70 hover:opacity-90"
      }`}
      style={{
        backgroundColor: person.color + "22",
        color: person.color,
      }}
      onClick={() => onClick?.(person.id)}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: person.color }}
      />
      {person.name}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(person.id);
          }}
          className="ml-0.5 hover:opacity-70 transition-opacity"
          aria-label={`Remove ${person.name}`}
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}
