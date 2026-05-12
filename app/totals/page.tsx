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
    <main className="min-h-screen bg-[#2A2A2A] flex flex-col font-black text-white">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen px-2 pt-6 pb-32">
        {/* Header */}
        <div className="w-full pt-6 pb-4 flex flex-row items-start justify-between select-none mb-8">
          <h1 className="text-[2.8rem] font-black leading-none tracking-tight text-white pl-2" style={{ fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif', fontWeight: 900 }}>
            03 / TOTAL
          </h1>
          <button
            onClick={() => router.push('/assign')}
            className="bg-pink-500 hover:bg-pink-600 text-black font-black rounded-none shadow-lg w-12 h-12 flex items-center justify-center text-3xl transition mr-2"
            title="Back to Assign"
            aria-label="Back to Assign"
            style={{ border: '2px solid #000' }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L10 14L18 22" stroke="black" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Per person cards */}
        {people.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-600 text-center opacity-60">No people added.<br />Go back and add people to split with.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pb-4 space-y-8">
            {people.map((person) => {
              const breakdown = totals[person.id] || { subtotal: 0, tax: 0, tip: 0, total: 0 };
              const note = generateVenmoNote(person, items, assignments, breakdown.total);
              const venmoLink = getVenmoLink(person.name.toLowerCase(), breakdown.total, note);
              return (
                <div key={person.id} className="space-y-4">
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

        {/* Start Over CTA at bottom, not sticky, no gradient */}
        <div className="w-full max-w-md mx-auto mt-8">
          <button
            onClick={handleStartOver}
            className="w-full h-14 flex items-center justify-center gap-3 bg-[#2A2A2A] text-lime text-lg font-black rounded-2xl shadow-xl border-2 border-lime hover:bg-lime hover:text-black transition-all duration-150 active:scale-95 uppercase tracking-wide"
          >
            <RefreshCcw size={22} />
            Start Over
          </button>
        </div>
      </div>
    </main>
  );
}
