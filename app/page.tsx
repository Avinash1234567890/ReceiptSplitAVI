"use client";

import { useRouter } from "next/navigation";
import { mockReceiptItems } from "@/lib/mockData";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full mx-auto text-center">
          {/* Logo / App name */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-3xl shadow-lg mb-4">
              <span className="text-2xl">🧾</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Splitty</h1>
            <p className="mt-2 text-xl text-indigo-500 font-medium">Split bills fairly, not equally</p>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-sm mx-auto">
            Upload your restaurant receipt and let Splitty divide the bill based on what each person actually ordered.
          </p>

          {/* Mock preview card */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 mb-10 text-left">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Sample Receipt</div>
            <div className="space-y-3">
              {mockReceiptItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  <span className="text-sm font-semibold text-gray-800">${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-2 flex justify-between items-center">
                <span className="text-xs text-gray-400">3 items</span>
                <span className="text-sm font-bold text-indigo-500">
                  ${mockReceiptItems.reduce((s, i) => s + i.price, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push("/upload")}
            className="w-full h-14 bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            Start Splitting →
          </button>

          {/* Feature pills */}
          <div className="flex gap-2 justify-center mt-6 flex-wrap">
            {["📸 Receipt Scan", "👥 Split fairly", "💸 Venmo links"].map((f) => (
              <span key={f} className="text-xs bg-white border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
