import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function ExpensesScreen() {
  const [currentMonth, setCurrentMonth] = useState("Styczeń 2026");

  // Sample data
  const totalExpenses = 3420;
  const monthlyBudget = 5000;
  const budgetPercentage = (totalExpenses / monthlyBudget) * 100;
  const remaining = monthlyBudget - totalExpenses;

  const categories = [
    {
      id: 1,
      name: "Jedzenie",
      icon: "🥗",
      color: "#FF9B9B",
      amount: 1200,
      budget: 1500,
    },
    {
      id: 2,
      name: "Transport",
      icon: "🚙",
      color: "#A6C8FF",
      amount: 540,
      budget: 600,
    },
    {
      id: 3,
      name: "Rozrywka",
      icon: "🎭",
      color: "#B5E7A0",
      amount: 320,
      budget: 400,
    },
    {
      id: 4,
      name: "Zakupy",
      icon: "🛍️",
      color: "#FFD89C",
      amount: 900,
      budget: 800,
    },
    {
      id: 5,
      name: "Zdrowie",
      icon: "💊",
      color: "#FFB5E8",
      amount: 280,
      budget: 300,
    },
    {
      id: 6,
      name: "Dom",
      icon: "🏡",
      color: "#D4BBFF",
      amount: 300,
      budget: 2000,
    },
    {
      id: 7,
      name: "Edukacja",
      icon: "📖",
      color: "#9FE2E0",
      amount: 0,
      budget: 500,
    },
    {
      id: 8,
      name: "Inne",
      icon: "✨",
      color: "#C9C9C9",
      amount: 0,
      budget: 200,
    },
  ];

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(0)} zł`;
  };

  // Calculate percentage of each category in total expenses
  const categoriesWithPercentage = categories
    .map((cat) => ({
      ...cat,
      expensePercentage:
        totalExpenses > 0 ? (cat.amount / totalExpenses) * 100 : 0,
      budgetUsedPercentage:
        cat.budget > 0 ? (cat.amount / cat.budget) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  const handlePrevMonth = () => {
    // Handle previous month
  };

  const handleNextMonth = () => {
    // Handle next month
  };

  // Helper to darken color for fill
  const darkenColor = (hex: string, amount: number = 40) => {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <View className="flex-1 bg-neutral-50">
      {/* HEADER */}
      <View className="pt-14 pb-4 px-5 bg-white">
        <View className="flex-row items-center justify-center">
          <TouchableOpacity
            onPress={handlePrevMonth}
            className="w-10 h-10 items-center justify-center"
          >
            <Text className="text-3xl text-gray-400 font-light">‹</Text>
          </TouchableOpacity>

          <View className="flex-1 items-center mx-4">
            <Text className="text-2xl font-bold text-gray-800">
              {currentMonth}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleNextMonth}
            className="w-10 h-10 items-center justify-center"
          >
            <Text className="text-3xl text-gray-400 font-light">›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* BUDGET OVERVIEW CARD */}
        <View className="px-5 pt-6 pb-4">
          <View className="bg-white rounded-3xl p-6 shadow-sm">
            {/* Main focus - Remaining budget */}
            <View className="items-center mb-5">
              <Text className="text-sm text-gray-500 mb-2">
                Pozostało do wydania
              </Text>
              <Text
                className={`text-5xl font-bold ${
                  remaining >= 0 ? "text-emerald-500" : "text-red-400"
                }`}
              >
                {formatCurrency(Math.abs(remaining))}
              </Text>
            </View>

            {/* Segmented Progress Bar */}
            <View className="mb-4">
              <View className="h-3 bg-gray-100 rounded-full overflow-hidden flex-row">
                {categoriesWithPercentage
                  .filter((cat) => cat.amount > 0)
                  .map((category, index) => (
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

            {/* Small budget details */}
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
            {/* Legend - show top categories in the bar */}
            <View className="flex-row flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              {categoriesWithPercentage
                .filter((cat) => cat.amount > 0)
                .slice(0, 4)
                .map((category) => (
                  <View
                    key={category.id}
                    className="flex-row items-center mr-3"
                  >
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
        </View>

        {/* CATEGORIES GRID */}
        <View className="px-5 pb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Kategorie
          </Text>

          {/* Grid - 3 columns */}
          <View className="flex-row flex-wrap gap-3 justify-center">
            {categoriesWithPercentage.map((category) => {
              const percentage = Math.min(category.budgetUsedPercentage, 100);
              const isOverBudget = category.amount > category.budget;

              return (
                <TouchableOpacity
                  key={category.id}
                  className="bg-white rounded-3xl shadow-sm overflow-hidden"
                  style={{ width: "20%" }}
                  activeOpacity={0.7}
                >
                  <View className="p-3">
                    {/* Category name on top */}
                    <Text
                      className="text-xs font-semibold text-gray-700 text-center mb-3"
                      numberOfLines={1}
                    >
                      {category.name}
                    </Text>

                    {/* Amount above icon */}
                    <Text
                      className={`text-sm font-bold  text-center mb-2 ${
                        isOverBudget ? "text-red-400" : "text-gray-800"
                      }`}
                    >
                      {formatCurrency(category.amount)}
                    </Text>

                    {/* Icon circle with fill from bottom */}
                    <View className="items-center mb-2">
                      <View
                        className="w-16 h-16 rounded-full overflow-hidden relative items-center justify-center"
                        style={{
                          backgroundColor: category.color,
                        }}
                      >
                        {/* Fill from bottom - darker shade */}
                        <View
                          className="absolute bottom-0 w-full"
                          style={{
                            backgroundColor: isOverBudget
                              ? "#EF4444"
                              : darkenColor(category.color),
                            height: `${percentage}%`,
                          }}
                        />

                        {/* Icon centered */}
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

                    {/* Budget below */}
                    <Text className="text-xs text-gray-400 text-center">
                      z {formatCurrency(category.budget)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* Add Category Card */}
            <TouchableOpacity
              className="bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200 items-center justify-center "
              style={{ width: "20%", minHeight: 155 }}
              activeOpacity={0.7}
            >
              <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mb-2">
                <Text className="text-2xl text-gray-400">+</Text>
              </View>
              <Text className="text-xs font-medium text-gray-500">Dodaj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
