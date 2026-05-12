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
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { setItems } = useSplit();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setUploadSuccess(true); // Turn pink when file is selected
    } else {
      setFile(null);
      setUploadSuccess(false); // Reset if file is cleared
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
      const parsedItems = parseOcrText(result.text);
      if (parsedItems.length === 0) {
        setError("Could not find any items and prices in the receipt. Please check the image or enter items manually.");
        setIsLoading(false);
        return;
      }
      const newItems = parsedItems.map((item, index) => ({
        id: index + 1,
        name: item.name,
        price: item.price,
      }));
      setItems(newItems);
      router.push('/assign');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[var(--orange)] px-0 text-white">
      {/* Header and Back Button Row */}
      <div className="w-full flex flex-row items-center justify-between mt-[18px] mb-0 px-2 select-none relative">
        <h1
          className="text-[36px] leading-[1.05] font-extrabold text-white text-left"
          style={{ fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif', fontWeight: 900 }}
        >
          01 / UPLOAD
        </h1>
        <button
          className="z-10 flex items-center justify-center"
          style={{ width: 80, height: 80, background: 'var(--lime)', borderRadius: '50%', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          onClick={() => router.push('/')}
          title="Back to Home"
          aria-label="Back to Home"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 10L14 18L22 26" stroke="#0047FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Concentric Circle Upload Target - blue/lime/blue */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full flex-1 justify-center"
        style={{ minHeight: '50svh' }}
      >
        <div className="relative flex flex-col items-center justify-center mb-6" style={{ width: 340, height: 340 }}>
          {/* Outer blue circle with lime border */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-[var(--lime)] bg-[var(--blue)]" style={{ width: 340, height: 340 }} />
          {/* Middle lime circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--lime)]" style={{ width: 200, height: 200 }} />
          {/* Inner blue circle (upload target) - turns pink on success */}
          <label
            htmlFor="file-upload"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-full cursor-pointer"
            style={{
              width: 120,
              height: 120,
              background: uploadSuccess ? 'rgb(231, 51, 158)' : 'var(--blue)',
              transition: 'background 0.2s',
            }}
          >
            <span className="flex items-center justify-center w-full h-full">
              <span className="block w-full h-full relative">
                <span className="absolute left-1/2 top-1/2 w-[60%] h-[4px] bg-white" style={{transform:'translate(-50%,-50%)'}}></span>
                <span className="absolute left-1/2 top-1/2 h-[60%] w-[4px] bg-white" style={{transform:'translate(-50%,-50%)'}}></span>
              </span>
            </span>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {/* SVG Circular Text - white, Times New Roman, tightly fit to blue circle */}
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-[-55deg]"
            width={320}
            height={320}
            viewBox="0 0 320 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 320, height: 320 }}
          >
            <defs>
              <path
                id="circlePath"
                d="M160,30 a130,130 0 1,1 0,260 a130,130 0 1,1 0,-260"
              />
            </defs>
            <text fill="white" fontSize="20" fontFamily="Times New Roman, Times, serif" fontWeight="400" letterSpacing="1.5">
              <textPath xlinkHref="#circlePath" startOffset="0">
                Upload image of your Recipt
              </textPath>
            </text>
          </svg>
        </div>
        {/* File name or prompt - hidden for screenshot match */}
        {/* Error message */}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        {/* Process Button - white, bold, black text, arrow */}
        <Button
          type="submit"
          disabled={isLoading || !file}
          className="w-full max-w-[260px] h-[56px] rounded-none border-4 border-white bg-white text-[#572100] font-black text-3xl transition-transform active:scale-95 duration-100 mt-2 mb-6 flex items-center justify-center px-10"
          style={{
            background: '#fff',
            backgroundColor: '#fff',
            opacity: 1,
            fontWeight: 900,
            fontSize: '2rem',
            fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <span style={{fontWeight:900, fontSize:'2rem', color:'#572100', letterSpacing: '-0.03em', width:'100%', textAlign:'center'}}>PROCESS</span>
        </Button>
      </form>

      {/* Bottom bar for mobile spacing */}
      <div className="h-[18px] w-full" />
    </main>
  );
}

