import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  CreateTransactionPayload,
  Transaction,
} from "../types/transaction";

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (payload: CreateTransactionPayload) => void;
  deleteTransaction: (id: string) => void;
  clearAll: () => void;
}

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
