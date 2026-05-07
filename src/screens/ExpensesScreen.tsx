import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { AddCategoryCard } from "../features/expenses/components/AddCategoryCard";
import { BudgetOverviewCard } from "../features/expenses/components/BudgetOverviewCard";
import { CategoryCard } from "../features/expenses/components/CategoryCard";
import { ExpensesHeader } from "../features/expenses/components/ExpensesHeader";
import {
  expenseCategories,
  monthlyBudget,
} from "../features/expenses/data/expensesMockData";

export default function ExpensesScreen() {
  const [currentMonth] = useState("Styczeń 2026");

  const totalExpenses = expenseCategories.reduce(
    (sum, category) => sum + category.amount,
    0,
  );

  const remaining = monthlyBudget - totalExpenses;

  const categoriesWithPercentage = useMemo(() => {
    return expenseCategories
      .map((category) => ({
        ...category,
        expensePercentage:
          totalExpenses > 0 ? (category.amount / totalExpenses) * 100 : 0,
        budgetUsedPercentage:
          category.budget > 0 ? (category.amount / category.budget) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [totalExpenses]);

  const handlePrevMonth = () => {};
  const handleNextMonth = () => {};
  const handleAddCategory = () => {};

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="px-5 pb-10 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <ExpensesHeader
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <BudgetOverviewCard
        totalExpenses={totalExpenses}
        monthlyBudget={monthlyBudget}
        remaining={remaining}
        categories={categoriesWithPercentage}
      />

      <View className="mt-8 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-white">Kategorie</Text>
          <Text className="mt-1 text-sm text-slate-400">
            Kontroluj limity miesięczne
          </Text>
        </View>

        <Text className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300">
          {categoriesWithPercentage.length} aktywnych
        </Text>
      </View>

      <View className="mt-4 gap-3">
        {categoriesWithPercentage.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}

        <AddCategoryCard onPress={handleAddCategory} />
      </View>
    </ScrollView>
  );
}
