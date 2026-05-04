import { Text, View } from "react-native";

import { formatCurrency } from "../../../utils/currency";

type TransactionsSummaryProps = {
  income: number;
  expenses: number;
  balance: number;
};

export function TransactionsSummary({
  income,
  expenses,
  balance,
}: TransactionsSummaryProps) {
  const isPositiveBalance = balance >= 0;

  return (
    <View className="bg-white rounded-3xl p-5 shadow-sm mb-6">
      <Text className="text-sm text-gray-500 mb-2">Balance</Text>

      <Text
        className={`text-4xl font-bold mb-5 ${
          isPositiveBalance ? "text-emerald-500" : "text-red-400"
        }`}
      >
        {formatCurrency(balance)}
      </Text>

      <View className="flex-row gap-3">
        <View className="flex-1 bg-emerald-50 rounded-2xl p-4">
          <Text className="text-xs text-emerald-600 mb-1">Income</Text>
          <Text className="text-lg font-bold text-emerald-600">
            {formatCurrency(income)}
          </Text>
        </View>

        <View className="flex-1 bg-red-50 rounded-2xl p-4">
          <Text className="text-xs text-red-500 mb-1">Expenses</Text>
          <Text className="text-lg font-bold text-red-500">
            {formatCurrency(expenses)}
          </Text>
        </View>
      </View>
    </View>
  );
}
