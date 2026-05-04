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

  const handlePrevMonth = () => {
    // TODO: implement month navigation
  };

  const handleNextMonth = () => {
    // TODO: implement month navigation
  };

  const handleAddCategory = () => {
    // TODO: implement add category action
  };

  return (
    <View className="flex-1 bg-neutral-50">
      <ExpensesHeader
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-6 pb-4">
          <BudgetOverviewCard
            totalExpenses={totalExpenses}
            monthlyBudget={monthlyBudget}
            remaining={remaining}
            categories={categoriesWithPercentage}
          />
        </View>

        <View className="px-5 pb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Kategorie
          </Text>

          <View className="flex-row flex-wrap gap-3 justify-center">
            {categoriesWithPercentage.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}

            <AddCategoryCard onPress={handleAddCategory} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
