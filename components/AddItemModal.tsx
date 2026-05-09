'use client';

import { useState } from 'react';
import { useSplit } from '@/app/context/SplitContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

export default function AddItemModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { addItem } = useSplit();

  const handleSubmit = () => {
    const priceValue = parseFloat(price);
    if (name && !isNaN(priceValue) && priceValue > 0) {
      addItem(name, priceValue);
      setIsOpen(false); // Close the modal
      setName(''); // Reset state for next time
      setPrice('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-600">
          <Plus size={14} /> Add Item
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price (e.g., 12.99)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0.01"
            step="0.01"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
