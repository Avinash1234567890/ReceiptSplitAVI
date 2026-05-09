"use client";

import { useRouter } from "next/navigation";
import { useSplit } from "@/app/context/SplitContext";
import { mockReceiptItems, mockPeople } from "@/lib/mockData";
import { Camera, ArrowLeft } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const { setItems, setPeople } = useSplit();

  const handleUseSampleData = () => {
    setItems(mockReceiptItems);
    setPeople(mockPeople);
    router.push("/review");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col min-h-screen px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Upload Receipt</h1>
        </div>

        {/* Upload zone */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="border-2 border-dashed border-indigo-200 rounded-3xl bg-white p-10 flex flex-col items-center justify-center gap-4 mb-6 min-h-64">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center">
              <Camera size={28} className="text-indigo-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-700 mb-1">Upload receipt photo</p>
              <p className="text-sm text-gray-400">Tap to select or drag & drop</p>
            </div>
            <div className="bg-indigo-50 text-indigo-500 text-xs font-medium px-3 py-1.5 rounded-full">
              OCR coming soon
            </div>
          </div>

          {/* Info note */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6">
            <p className="text-sm text-amber-700">
              <span className="font-semibold">Note:</span> OCR is coming soon. For now, use our sample data to explore the full Splitty experience.
            </p>
          </div>

          {/* Sample data button */}
          <button
            onClick={handleUseSampleData}
            className="w-full h-14 bg-indigo-500 hover:bg-indigo-600 text-white text-base font-semibold rounded-2xl shadow-md shadow-indigo-200 transition-all active:scale-95"
          >
            Use Sample Data
          </button>
        </div>
      </div>
    </main>
  );
}
