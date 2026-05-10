import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { AddCategoryCard } from "../features/expenses/components/AddCategoryCard";
import { BudgetOverviewCard } from "../features/expenses/components/BudgetOverviewCard";
import { CategoryCard } from "../features/expenses/components/CategoryCard";
import { ExpensesHeader } from "../features/expenses/components/ExpensesHeader";
import { EXPENSE_CATEGORIES } from "../features/expenses/constants/categories";
import {
  selectExpensesByCategory,
  selectTotalExpenses,
  useTransactionStore,
} from "../store/useTransactionStore";

// Monthly budget constant – will move to SettingsScreen / store in a future step
const MONTHLY_BUDGET = 5000;

export default function ExpensesScreen() {
  const transactions = useTransactionStore((s) => s.transactions);

  const [currentMonth] = useState("Maj 2026");

  const expensesByCategory = useMemo(
    () => selectExpensesByCategory(transactions),
    [transactions],
  );

  const totalExpenses = useMemo(
    () => selectTotalExpenses(transactions),
    [transactions],
  );

  const remaining = MONTHLY_BUDGET - totalExpenses;

  // Build ExpenseCategoryWithPercentage from static meta + live store data
  const categoriesWithPercentage = useMemo(() => {
    return EXPENSE_CATEGORIES.map((meta) => {
      const amount = expensesByCategory[meta.value] ?? 0;
      return {
        id: meta.value, // string id instead of number – consistent with TransactionCategory
        name: meta.label,
        icon: meta.icon,
        color: meta.color,
        amount,
        budget: meta.defaultBudget,
        expensePercentage:
          totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
        budgetUsedPercentage:
          meta.defaultBudget > 0 ? (amount / meta.defaultBudget) * 100 : 0,
      };
    }).sort((a, b) => b.amount - a.amount);
  }, [expensesByCategory, totalExpenses]);

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="px-5 pb-10 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <ExpensesHeader
        currentMonth={currentMonth}
        onPrevMonth={() => {}}
        onNextMonth={() => {}}
      />

      <BudgetOverviewCard
        totalExpenses={totalExpenses}
        monthlyBudget={MONTHLY_BUDGET}
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
          {EXPENSE_CATEGORIES.length} kategorii
        </Text>
      </View>

      <View className="mt-4 gap-3">
        {categoriesWithPercentage.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        <AddCategoryCard onPress={() => {}} />
      </View>
    </ScrollView>
  );
}
