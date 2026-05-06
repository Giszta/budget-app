import { Text, View } from "react-native";

import { Transaction } from "../../../types/transaction";
import { formatCurrency } from "../../../utils/currency";

type TransactionListItemProps = {
  transaction: Transaction;
};

export function TransactionListItem({ transaction }: TransactionListItemProps) {
  const isIncome = transaction.type === "income";

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View
            className={`w-11 h-11 rounded-full items-center justify-center mr-3 ${
              isIncome ? "bg-emerald-50" : "bg-red-50"
            }`}
          >
            <Text className="text-xl">{isIncome ? "💰" : "💸"}</Text>
          </View>

          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">
              {transaction.title}
            </Text>

            <Text className="text-xs text-gray-400 mt-0.5">
              {transaction.category} • {transaction.date}
            </Text>
          </View>
        </View>

        <Text
          className={`text-base font-bold ${
            isIncome ? "text-emerald-500" : "text-red-400"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </Text>
      </View>
    </View>
  );
}
