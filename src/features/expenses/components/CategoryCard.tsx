import { Text, TouchableOpacity, View } from "react-native";

import { ExpenseCategoryWithPercentage } from "../types";
import { darkenColor } from "../../../utils/colors";
import { formatCurrency } from "../../../utils/currency";

type CategoryCardProps = {
  category: ExpenseCategoryWithPercentage;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const percentage = Math.min(category.budgetUsedPercentage, 100);
  const isOverBudget = category.amount > category.budget;

  return (
    <TouchableOpacity
      className="bg-white rounded-3xl shadow-sm overflow-hidden"
      style={{ width: "20%" }}
      activeOpacity={0.7}
    >
      <View className="p-3">
        <Text
          className="text-xs font-semibold text-gray-700 text-center mb-3"
          numberOfLines={1}
        >
          {category.name}
        </Text>

        <Text
          className={`text-sm font-bold text-center mb-2 ${
            isOverBudget ? "text-red-400" : "text-gray-800"
          }`}
        >
          {formatCurrency(category.amount)}
        </Text>

        <View className="items-center mb-2">
          <View
            className="w-16 h-16 rounded-full overflow-hidden relative items-center justify-center"
            style={{ backgroundColor: category.color }}
          >
            <View
              className="absolute bottom-0 w-full"
              style={{
                backgroundColor: isOverBudget
                  ? "#EF4444"
                  : darkenColor(category.color),
                height: `${percentage}%`,
              }}
            />

            <View
              className="absolute inset-0 flex items-center justify-center"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 28, lineHeight: 32 }}>
                {category.icon}
              </Text>
            </View>
          </View>
        </View>

        <Text className="text-xs text-gray-400 text-center">
          z {formatCurrency(category.budget)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
