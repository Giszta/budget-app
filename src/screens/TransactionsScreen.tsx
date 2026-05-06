import { ScrollView, Text, View } from "react-native";

import { TransactionListItem } from "../features/transactions/components/TransactionListItem";
import { TransactionsSummary } from "../features/transactions/components/TransactionsSummary";
import { mockTransactions } from "../features/transactions/data/mockTransactions";
import {
  getBalance,
  getTotalExpenses,
  getTotalIncome,
} from "../features/transactions/utils/transactions";

export default function TransactionsScreen() {
  const income = getTotalIncome(mockTransactions);
  const expenses = getTotalExpenses(mockTransactions);
  const balance = getBalance(mockTransactions);

  const hasTransactions = mockTransactions.length > 0;

  return (
    <View className="flex-1 bg-neutral-50">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-16 pb-28"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Transactions
        </Text>

        <Text className="text-base text-gray-500 mb-6">
          Track your income and expenses in one place.
        </Text>

        <TransactionsSummary
          income={income}
          expenses={expenses}
          balance={balance}
        />

        <View className="mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Recent transactions
          </Text>

          {hasTransactions ? (
            mockTransactions.map((transaction) => (
              <TransactionListItem
                key={transaction.id}
                transaction={transaction}
              />
            ))
          ) : (
            <View className="bg-white rounded-3xl p-6 items-center shadow-sm">
              <Text className="text-4xl mb-3">📭</Text>
              <Text className="text-base font-semibold text-gray-800 mb-1">
                No transactions yet
              </Text>
              <Text className="text-sm text-gray-500 text-center">
                Add your first income or expense to start tracking your budget.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
