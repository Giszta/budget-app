// Core domain types for the budget app

export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "food"
  | "transport"
  | "housing"
  | "entertainment"
  | "health"
  | "shopping"
  | "salary"
  | "other";

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string; // unified: was "description" in types, "title" in mock/components
  amount: number;
  category: TransactionCategory;
  date: string; // ISO 8601, e.g. "2026-05-10"
  createdAt: number; // Unix timestamp for sorting
}

export type CreateTransactionPayload = Omit<Transaction, "id" | "createdAt">;
