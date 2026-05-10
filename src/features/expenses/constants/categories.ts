import { TransactionCategory } from "../../../types/transaction";

export type CategoryMeta = {
  value: TransactionCategory;
  label: string;
  icon: string;
  color: string;
  defaultBudget: number;
};

// Single source of truth for category metadata across the entire app
export const CATEGORY_META: Record<TransactionCategory, CategoryMeta> = {
  food: {
    value: "food",
    label: "Jedzenie",
    icon: "🥗",
    color: "#FF9B9B",
    defaultBudget: 1500,
  },
  transport: {
    value: "transport",
    label: "Transport",
    icon: "🚙",
    color: "#A6C8FF",
    defaultBudget: 600,
  },
  housing: {
    value: "housing",
    label: "Dom",
    icon: "🏡",
    color: "#D4BBFF",
    defaultBudget: 2000,
  },
  entertainment: {
    value: "entertainment",
    label: "Rozrywka",
    icon: "🎭",
    color: "#B5E7A0",
    defaultBudget: 400,
  },
  health: {
    value: "health",
    label: "Zdrowie",
    icon: "💊",
    color: "#FFB5E8",
    defaultBudget: 300,
  },
  shopping: {
    value: "shopping",
    label: "Zakupy",
    icon: "🛍️",
    color: "#FFD89C",
    defaultBudget: 800,
  },
  salary: {
    value: "salary",
    label: "Wynagrodzenie",
    icon: "💼",
    color: "#9FE2E0",
    defaultBudget: 0, // income category – no budget limit
  },
  other: {
    value: "other",
    label: "Inne",
    icon: "✨",
    color: "#C9C9C9",
    defaultBudget: 200,
  },
};

// Ordered list for display (salary last – it's income, not expense)
export const EXPENSE_CATEGORIES = (
  Object.values(CATEGORY_META) as CategoryMeta[]
).filter((c) => c.value !== "salary");
