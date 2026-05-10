export type ExpenseCategory = {
  id: string; // changed: was number, now matches TransactionCategory string
  name: string;
  icon: string;
  color: string;
  amount: number;
  budget: number;
};

export type ExpenseCategoryWithPercentage = ExpenseCategory & {
  expensePercentage: number;
  budgetUsedPercentage: number;
};
