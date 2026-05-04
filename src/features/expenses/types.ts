export type ExpenseCategory = {
  id: number;
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
