import { Text, View } from "react-native";

export default function TransactionsScreen() {
  return (
    <View className="flex-1 bg-neutral-50 px-5 pt-16">
      <Text className="text-2xl font-bold text-gray-800 mb-2">Transakcje</Text>

      <Text className="text-base text-gray-500">
        Tutaj pojawi się lista przychodów i wydatków.
      </Text>
    </View>
  );
}
