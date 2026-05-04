import { Text, View } from "react-native";

export default function StatisticsScreen() {
  return (
    <View className="flex-1 bg-neutral-50 px-5 pt-16">
      <Text className="text-2xl font-bold text-gray-800 mb-2">Statystyki</Text>

      <Text className="text-base text-gray-500">
        Tutaj dodam wykresy i analizę wydatków.
      </Text>
    </View>
  );
}
