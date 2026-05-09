import { Person, ReceiptItem } from './types';

export function generateVenmoNote(
  person: Person,
  items: ReceiptItem[],
  assignments: Record<number, string[]>,
  total: number
): string {
  const assignedItems = items.filter(
    (item) => (assignments[item.id] || []).includes(person.id)
  );
  const itemNames = assignedItems.map((item) => item.name).join(' + ');
  return `Dinner split: ${itemNames}. Tax & tip included. Total: $${total.toFixed(2)}`;
}

export function getVenmoLink(username: string, amount: number, note: string): string {
  const encodedNote = encodeURIComponent(note);
  return `venmo://paycharge?txn=pay&recipients=${encodeURIComponent(username)}&amount=${amount.toFixed(2)}&note=${encodedNote}`;
}
