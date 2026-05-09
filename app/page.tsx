"use client";

import { useRouter } from "next/navigation";

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
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Receipt Split Avi</h1>
            <p className="mt-2 text-xl text-indigo-500 font-medium">Everyone pays for what they ordered</p>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-sm mx-auto">
            Upload your restaurant receipt, assign items to each person, and let Receipt Split Avi calculate everyone&apos;s exact total including shared items, tax, and tip. Then instantly copy and set up Venmo requests for the whole group in seconds.
          </p>

          {/* CTA */}
          <button
            onClick={() => router.push("/upload")}
            className="w-full h-14 bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            Start Splitting →
          </button>

          {/* Feature pills */}
          <div className="flex gap-2 justify-center mt-6 flex-wrap">
            {["Receipt Scan", "Split fairly", "Venmo links"].map((f) => (
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
