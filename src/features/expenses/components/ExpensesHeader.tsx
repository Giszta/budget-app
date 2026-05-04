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
    <View className="pt-14 pb-4 px-5 bg-white">
      <View className="flex-row items-center justify-center">
        <TouchableOpacity
          onPress={onPrevMonth}
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
          onPress={onNextMonth}
          className="w-10 h-10 items-center justify-center"
        >
          <Text className="text-3xl text-gray-400 font-light">›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
