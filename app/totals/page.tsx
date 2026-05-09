"use client";

import { useRouter } from "next/navigation";
import { useSplit } from "@/app/context/SplitContext";
import TotalsCard from "@/components/TotalsCard";
import VenmoCard from "@/components/VenmoCard";
import { computePersonTotals } from "@/lib/calculations";
import { generateVenmoNote, getVenmoLink } from "@/lib/venmo";
import { ArrowLeft, RefreshCcw } from "lucide-react";

export default function TotalsPage() {
  const router = useRouter();
  const { items, people, assignments, taxPercent, tipPercent } = useSplit();

  const totals = computePersonTotals(items, people, assignments, taxPercent, tipPercent);

  const handleStartOver = () => {
    router.push("/");
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
          <h1 className="text-xl font-bold text-gray-900">Final Totals</h1>
        </div>

        {/* Per person cards */}
        {people.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-center">No people added.<br />Go back and add people to split with.</p>
          </div>
        ) : (
          <div className="space-y-6 mb-24">
            {people.map((person) => {
              const breakdown = totals[person.id] || { subtotal: 0, tax: 0, tip: 0, total: 0 };
              const note = generateVenmoNote(person, items, assignments, breakdown.total);
              const venmoLink = getVenmoLink(person.name.toLowerCase(), breakdown.total, note);
              return (
                <div key={person.id} className="space-y-3">
                  <TotalsCard person={person} breakdown={breakdown} />
                  <VenmoCard
                    person={person}
                    amount={breakdown.total}
                    note={note}
                    venmoLink={venmoLink}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-10">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleStartOver}
              className="w-full h-14 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white text-base font-semibold rounded-2xl shadow-md transition-all active:scale-95"
            >
              <RefreshCcw size={18} />
              Start Over
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
