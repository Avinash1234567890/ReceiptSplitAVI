import { ReceiptItem, Person } from './types';

export function computeSubtotal(items: ReceiptItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

export function computePersonTotals(
  items: ReceiptItem[],
  people: Person[],
  assignments: Record<number, string[]>,
  taxPercent: number,
  tipPercent: number
): Record<string, { subtotal: number; tax: number; tip: number; total: number }> {
  const result: Record<string, { subtotal: number; tax: number; tip: number; total: number }> = {};

  for (const person of people) {
    result[person.id] = { subtotal: 0, tax: 0, tip: 0, total: 0 };
  }

  for (const item of items) {
    const assignedPeople = assignments[item.id] || [];
    if (assignedPeople.length === 0) continue;
    const share = item.price / assignedPeople.length;
    for (const personId of assignedPeople) {
      if (result[personId] !== undefined) {
        result[personId].subtotal += share;
      }
    }
  }

  for (const person of people) {
    const personSubtotal = result[person.id].subtotal;
    const tax = (taxPercent / 100) * personSubtotal;
    const tip = (tipPercent / 100) * personSubtotal;
    result[person.id].tax = tax;
    result[person.id].tip = tip;
    result[person.id].total = personSubtotal + tax + tip;
  }

  return result;
}
