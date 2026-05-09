import { ReceiptItem, Person } from './types';

export const mockReceiptItems: ReceiptItem[] = [
  { id: 1, name: "Burger", price: 15.99 },
  { id: 2, name: "Fries", price: 7.50 },
  { id: 3, name: "Sushi Roll", price: 18.25 },
];

export const mockPeople: Person[] = [
  { id: "1", name: "Alice", color: "#6366f1" },
  { id: "2", name: "Bob", color: "#ec4899" },
];

export const personColors = [
  "#6366f1", "#ec4899", "#10b981", "#f59e0b", "#3b82f6", "#ef4444"
];
