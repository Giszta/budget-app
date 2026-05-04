import { ExpenseCategory } from "../types";

export const monthlyBudget = 5000;

export const expenseCategories: ExpenseCategory[] = [
  {
    id: 1,
    name: "Jedzenie",
    icon: "🥗",
    color: "#FF9B9B",
    amount: 1200,
    budget: 1500,
  },
  {
    id: 2,
    name: "Transport",
    icon: "🚙",
    color: "#A6C8FF",
    amount: 540,
    budget: 600,
  },
  {
    id: 3,
    name: "Rozrywka",
    icon: "🎭",
    color: "#B5E7A0",
    amount: 320,
    budget: 400,
  },
  {
    id: 4,
    name: "Zakupy",
    icon: "🛍️",
    color: "#FFD89C",
    amount: 900,
    budget: 800,
  },
  {
    id: 5,
    name: "Zdrowie",
    icon: "💊",
    color: "#FFB5E8",
    amount: 280,
    budget: 300,
  },
  {
    id: 6,
    name: "Dom",
    icon: "🏡",
    color: "#D4BBFF",
    amount: 300,
    budget: 2000,
  },
  {
    id: 7,
    name: "Edukacja",
    icon: "📖",
    color: "#9FE2E0",
    amount: 0,
    budget: 500,
  },
  {
    id: 8,
    name: "Inne",
    icon: "✨",
    color: "#C9C9C9",
    amount: 0,
    budget: 200,
  },
];
