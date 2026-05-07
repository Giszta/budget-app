import { Text, TouchableOpacity, View } from "react-native";

import { formatCurrency } from "../../../utils/currency";
import { ExpenseCategoryWithPercentage } from "../types";

type CategoryCardProps = {
  category: ExpenseCategoryWithPercentage;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const percentage = Math.min(category.budgetUsedPercentage, 100);
  const isOverBudget = category.amount > category.budget;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <View
            className="h-11 w-11 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${category.color}25` }}
          >
            <Text className="text-xl">{category.icon}</Text>
          </View>

          <View className="ml-3 flex-1">
            <Text className="text-base font-bold text-white" numberOfLines={1}>
              {category.name}
            </Text>

            <Text className="mt-1 text-xs text-slate-400">
              Limit: {formatCurrency(category.budget)}
            </Text>
          </View>
        </View>

        <View className="ml-3 items-end">
          <Text className="text-base font-bold text-white">
            {formatCurrency(category.amount)}
          </Text>

          <Text
            className={`mt-1 text-xs font-semibold ${
              isOverBudget ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {percentage.toFixed(0)}%
          </Text>
        </View>
      </View>

      <View className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <View
          className={`h-full rounded-full ${
            isOverBudget ? "bg-red-400" : "bg-emerald-400"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </View>
    </TouchableOpacity>
  );
}
