export interface ReceiptItem {
  id: number;
  name: string;
  price: number;
}

export interface Person {
  id: string;
  name: string;
  color: string;
}

export interface Assignment {
  itemId: number;
  personIds: string[];
}
