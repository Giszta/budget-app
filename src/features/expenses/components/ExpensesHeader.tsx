import { Text, TouchableOpacity, View } from "react-native";

type ExpensesHeaderProps = {
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export function ExpensesHeader({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: ExpensesHeaderProps) {
  return (
    <View className="mb-6 flex-row items-center justify-between">
      <View>
        <Text className="text-sm font-medium uppercase tracking-[3px] text-emerald-400">
          Budget App
        </Text>
        <Text className="mt-2 text-3xl font-bold text-white">Wydatki</Text>
      </View>

      <View className="flex-row items-center rounded-full bg-slate-900 p-1">
        <TouchableOpacity
          onPress={onPrevMonth}
          className="h-10 w-10 items-center justify-center rounded-full bg-slate-800"
        >
          <Text className="text-2xl text-white">‹</Text>
        </TouchableOpacity>

        <Text className="px-4 text-sm font-semibold text-slate-200">
          {currentMonth}
        </Text>

        <TouchableOpacity
          onPress={onNextMonth}
          className="h-10 w-10 items-center justify-center rounded-full bg-emerald-500"
        >
          <Text className="text-2xl text-slate-950">›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
