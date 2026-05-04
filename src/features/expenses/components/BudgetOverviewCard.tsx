import { Text, View } from "react-native";

import { ExpenseCategoryWithPercentage } from "../types";
import { darkenColor } from "../../../utils/colors";
import { formatCurrency } from "../../../utils/currency";

type BudgetOverviewCardProps = {
  totalExpenses: number;
  monthlyBudget: number;
  remaining: number;
  categories: ExpenseCategoryWithPercentage[];
};

export function BudgetOverviewCard({
  totalExpenses,
  monthlyBudget,
  remaining,
  categories,
}: BudgetOverviewCardProps) {
  const categoriesWithExpenses = categories.filter(
    (category) => category.amount > 0,
  );

  return (
    <View className="bg-white rounded-3xl p-6 shadow-sm">
      <View className="items-center mb-5">
        <Text className="text-sm text-gray-500 mb-2">Pozostało do wydania</Text>

        <Text
          className={`text-5xl font-bold ${
            remaining >= 0 ? "text-emerald-500" : "text-red-400"
          }`}
        >
          {formatCurrency(Math.abs(remaining))}
        </Text>
      </View>

      <View className="mb-4">
        <View className="h-3 bg-gray-100 rounded-full overflow-hidden flex-row">
          {categoriesWithExpenses.map((category) => (
            <View
              key={category.id}
              className="h-full"
              style={{
                backgroundColor: darkenColor(category.color),
                width: `${category.expensePercentage}%`,
              }}
            />
          ))}
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-xs text-gray-400 mb-0.5">Wydano</Text>
          <Text className="text-sm font-semibold text-gray-600">
            {formatCurrency(totalExpenses)}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-xs text-gray-400 mb-0.5">Budżet</Text>
          <Text className="text-sm font-semibold text-gray-600">
            {formatCurrency(monthlyBudget)}
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
        {categoriesWithExpenses.slice(0, 4).map((category) => (
          <View key={category.id} className="flex-row items-center mr-3">
            <View
              className="w-3 h-3 rounded-full mr-1.5"
              style={{ backgroundColor: category.color }}
            />

            <Text className="text-xs text-gray-600">
              {category.icon} {category.expensePercentage.toFixed(0)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
