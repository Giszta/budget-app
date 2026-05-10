import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { CATEGORY_META } from "../features/expenses/constants/categories";
import type {
  CreateTransactionPayload,
  Transaction,
  TransactionCategory,
} from "../types/transaction";

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (payload: CreateTransactionPayload) => void;
  deleteTransaction: (id: string) => void;
  clearAll: () => void;
}

// --- Global selectors ---

export const selectTotalIncome = (transactions: Transaction[]): number =>
  transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

export const selectTotalExpenses = (transactions: Transaction[]): number =>
  transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

export const selectBalance = (transactions: Transaction[]): number =>
  selectTotalIncome(transactions) - selectTotalExpenses(transactions);

// Returns total amount spent per expense category
export const selectExpensesByCategory = (
  transactions: Transaction[],
): Record<TransactionCategory, number> => {
  const result = {} as Record<TransactionCategory, number>;

  // Initialize all categories to 0
  for (const key of Object.keys(CATEGORY_META) as TransactionCategory[]) {
    result[key] = 0;
  }

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      result[t.category] = (result[t.category] ?? 0) + t.amount;
    });

  return result;
};

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (payload) =>
        set((state) => ({
          transactions: [
            {
              ...payload,
              id: `txn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
              createdAt: Date.now(),
            },
            ...state.transactions,
          ],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      clearAll: () => set({ transactions: [] }),
    }),
    {
      name: "budget-app-transactions",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
