import { Transaction } from "../../../types/transaction";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Salary",
    amount: 5000,
    type: "income",
    date: "2026-01-01",
    category: "Work",
  },
  {
    id: "2",
    title: "Groceries",
    amount: 320,
    type: "expense",
    date: "2026-01-03",
    category: "Food",
  },
  {
    id: "3",
    title: "Netflix",
    amount: 60,
    type: "expense",
    date: "2026-01-05",
    category: "Entertainment",
  },
  {
    id: "4",
    title: "Freelance",
    amount: 1200,
    type: "income",
    date: "2026-01-07",
    category: "Work",
  },
  {
    id: "5",
    title: "Transport",
    amount: 120,
    type: "expense",
    date: "2026-01-08",
    category: "Transport",
  },
];
