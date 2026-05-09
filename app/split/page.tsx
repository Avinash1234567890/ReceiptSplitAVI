"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSplit } from "@/app/context/SplitContext";
import PersonChip from "@/components/PersonChip";
import AssignmentSelector from "@/components/AssignmentSelector";
import AddPersonModal from "@/components/AddPersonModal";
import { Person } from "@/lib/types";
import { personColors } from "@/lib/mockData";
import { Plus, ArrowLeft } from "lucide-react";

export default function SplitPage() {
  const router = useRouter();
  const { items, people, setPeople, assignments, setAssignments } = useSplit();
  const [showModal, setShowModal] = useState(false);

  const handleAddPerson = (name: string) => {
    const color = personColors[people.length % personColors.length];
    const newPerson: Person = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    setPeople((prev) => [...prev, newPerson]);
    setShowModal(false);
  };

  const handleDeletePerson = (id: string) => {
    setPeople((prev) => prev.filter((p) => p.id !== id));
    setAssignments((prev) => {
      const updated = { ...prev };
      for (const itemId in updated) {
        updated[parseInt(itemId)] = updated[parseInt(itemId)].filter((pid) => pid !== id);
      }
      return updated;
    });
  };

  const handleToggle = (itemId: number, personId: string) => {
    setAssignments((prev) => {
      const current = prev[itemId] || [];
      const updated = current.includes(personId)
        ? current.filter((id) => id !== personId)
        : [...current, personId];
      return { ...prev, [itemId]: updated };
    });
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
          <h1 className="text-xl font-bold text-gray-900">Who&apos;s Splitting?</h1>
        </div>

        {/* People section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">People</h2>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-600"
            >
              <Plus size={14} /> Add Person
            </button>
          </div>
          {people.length === 0 ? (
            <p className="text-sm text-gray-400 py-2">No people added yet</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {people.map((person) => (
                <PersonChip key={person.id} person={person} onDelete={handleDeletePerson} />
              ))}
            </div>
          )}
        </div>

        {/* Assignments */}
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Assign Items</h2>
        <div className="space-y-3 mb-24">
          {items.map((item) => (
            <AssignmentSelector
              key={item.id}
              item={item}
              people={people}
              assignedPersonIds={assignments[item.id] || []}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-10">
          <div className="max-w-md mx-auto">
            <button
              onClick={() => router.push("/totals")}
              disabled={people.length === 0}
              className="w-full h-14 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-base font-semibold rounded-2xl shadow-md shadow-indigo-200 transition-all active:scale-95"
            >
              Calculate Totals →
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <AddPersonModal onAdd={handleAddPerson} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
