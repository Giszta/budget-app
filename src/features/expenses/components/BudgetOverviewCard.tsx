import { Text, View } from "react-native";

import { formatCurrency } from "../../../utils/currency";
import { ExpenseCategoryWithPercentage } from "../types";

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
  const usedPercentage = Math.min((totalExpenses / monthlyBudget) * 100, 100);
  const categoriesWithExpenses = categories.filter(
    (category) => category.amount > 0,
  );

  return (
    <View className="overflow-hidden rounded-[32px] bg-emerald-500 p-6 shadow-2xl">
      <View className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20" />
      <View className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-slate-950/10" />

      <Text className="text-sm font-semibold uppercase tracking-[2px] text-emerald-950/70">
        Pozostało w budżecie
      </Text>

      <Text className="mt-3 text-5xl font-black text-slate-950">
        {formatCurrency(Math.abs(remaining))}
      </Text>

      <Text className="mt-2 text-sm font-medium text-slate-900/70">
        {remaining >= 0
          ? "Jesteś w limicie. Dobra robota."
          : "Budżet został przekroczony."}
      </Text>

      <View className="mt-6 h-4 overflow-hidden rounded-full bg-slate-950/20">
        <View
          className="h-full rounded-full bg-slate-950"
          style={{ width: `${usedPercentage}%` }}
        />
      </View>

      <View className="mt-5 flex-row justify-between">
        <View>
          <Text className="text-xs font-semibold uppercase text-slate-900/60">
            Wydano
          </Text>
          <Text className="mt-1 text-lg font-bold text-slate-950">
            {formatCurrency(totalExpenses)}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-xs font-semibold uppercase text-slate-900/60">
            Budżet
          </Text>
          <Text className="mt-1 text-lg font-bold text-slate-950">
            {formatCurrency(monthlyBudget)}
          </Text>
        </View>
      </View>

      <View className="mt-6 flex-row flex-wrap gap-2">
        {categoriesWithExpenses.slice(0, 4).map((category) => (
          <View
            key={category.id}
            className="flex-row items-center rounded-full bg-slate-950/15 px-3 py-2"
          >
            <Text className="mr-2">{category.icon}</Text>
            <Text className="text-xs font-bold text-slate-950">
              {category.expensePercentage.toFixed(0)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
