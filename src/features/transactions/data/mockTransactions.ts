import { Transaction } from "../../../types/transaction";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Groceries",
    amount: 120,
    type: "expense",
    date: "2026-05-01",
    category: "Food",
  },
  {
    id: "2",
    title: "Salary",
    amount: 5000,
    type: "income",
    date: "2026-05-01",
    category: "Job",
  },
  {
    id: "3",
    title: "Netflix",
    amount: 40,
    type: "expense",
    date: "2026-05-02",
    category: "Entertainment",
  },
];
