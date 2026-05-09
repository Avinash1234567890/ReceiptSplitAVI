"use client";

import { ReceiptItem, Person } from "@/lib/types";
import PersonChip from "./PersonChip";

interface Props {
  item: ReceiptItem;
  people: Person[];
  assignedPersonIds: string[];
  onToggle: (itemId: number, personId: string) => void;
}

export default function AssignmentSelector({ item, people, assignedPersonIds, onToggle }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-gray-800">{item.name}</span>
        <span className="text-sm font-semibold text-gray-500">${item.price.toFixed(2)}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {people.map((person) => (
          <PersonChip
            key={person.id}
            person={person}
            isSelected={assignedPersonIds.includes(person.id)}
            onClick={(id) => onToggle(item.id, id)}
          />
        ))}
        {people.length === 0 && (
          <span className="text-sm text-gray-400">Add people above to assign items</span>
        )}
      </div>
    </div>
  );
}
