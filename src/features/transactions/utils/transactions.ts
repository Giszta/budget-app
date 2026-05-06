import { Transaction } from "../../../types/transaction";

export const getTotalIncome = (transactions: Transaction[]) => {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getTotalExpenses = (transactions: Transaction[]) => {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getBalance = (transactions: Transaction[]) => {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
};
