'use client';

import { useState, useContext, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSplit } from '@/app/context/SplitContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Camera } from 'lucide-react';

function parseOcrText(text: string): { name: string; price: number }[] {
  const items: { name: string; price: number }[] = [];
  const lines = text.split('\n');

  // List of words to ignore. Case-insensitive.
  const stopWords = ['subtotal', 'tax', 'total', 'tip', 'approved', 'visa', 'mastercard', 'amex', 'discover', 'batch', 'trace', 'sale', 'change'];
  
  // Regex to find a price, which can be at the start or end of a line.
  const priceRegex = /^\$?(\d+\.\d{2})$|(\d+\.\d{2})$/;
  
  // Regex to find a quantity at the start of a line (e.g., "1 ", "2x ")
  const quantityRegex = /^\d+x?\s+/;

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i].trim();
    
    // --- Check for single-line items (e.g., "Item Name 12.99") ---
    let match = currentLine.match(priceRegex);
    if (match) {
      const priceString = match[1] || match[2];
      let name = currentLine.substring(0, match.index).trim();
      
      // If the name is a stop word, skip it
      if (stopWords.some(word => name.toLowerCase().includes(word))) {
        continue;
      }

      if (name) {
        // Clean up the name by removing any quantity prefix
        name = name.replace(quantityRegex, '');
        items.push({ name, price: parseFloat(priceString) });
        continue; // Move to the next line
      }
    }

    // --- Check for multi-line items (name on one line, price on the next) ---
    const nextLine = (i + 1 < lines.length) ? lines[i + 1].trim() : '';
    const priceMatchOnNextLine = nextLine.match(/^\$?(\d+\.\d{2})$/); // Price should be the only thing on the next line

    if (priceMatchOnNextLine) {
      let name = currentLine;
      
      // Check if the current line looks like a valid item name
      const isStopWord = stopWords.some(word => name.toLowerCase().includes(word));
      const hasPrice = priceRegex.test(name);

      if (!isStopWord && !hasPrice && name) {
        // This looks like a valid multi-line item
        const price = parseFloat(priceMatchOnNextLine[1]);
        
        // Clean up the name by removing any quantity prefix
        name = name.replace(quantityRegex, '');
        
        items.push({ name, price });
        i++; // Increment i to skip the next line since we've already processed it
      }
    }
  }
  
  return items;
}


export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setItems } = useSplit();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process the receipt.');
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      // Parse the text and set the items in context
      const parsedItems = parseOcrText(result.text);
      
      if (parsedItems.length === 0) {
        setError("Could not find any items and prices in the receipt. Please check the image or enter items manually.");
        setIsLoading(false);
        return;
      }

      const newItems = parsedItems.map((item, index) => ({
        id: index + 1, // Simple ID generation
        name: item.name,
        price: item.price,
      }));

      setItems(newItems);

      // Navigate to the next step
      router.push('/split');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
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

        {/* Upload form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center">
          <label className="border-2 border-dashed border-indigo-200 rounded-3xl bg-white p-10 flex flex-col items-center justify-center gap-4 mb-6 min-h-64 cursor-pointer hover:bg-indigo-50 transition-colors">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center">
              <Camera size={28} className="text-indigo-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-700 mb-1">
                {file ? file.name : 'Upload receipt photo'}
              </p>
              <p className="text-sm text-gray-400">Tap to select or drag & drop</p>
            </div>
            <Input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <Button type="submit" disabled={isLoading || !file} className="w-full h-14 bg-indigo-500 hover:bg-indigo-600 text-white text-base font-semibold rounded-2xl shadow-md shadow-indigo-200 transition-all active:scale-95">
            {isLoading ? 'Processing...' : 'Process Receipt'}
          </Button>
        </form>
      </div>
    </main>
  );
}

