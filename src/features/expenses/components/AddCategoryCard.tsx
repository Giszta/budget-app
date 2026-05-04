import { Text, TouchableOpacity, View } from "react-native";

type AddCategoryCardProps = {
  onPress?: () => void;
};

export function AddCategoryCard({ onPress }: AddCategoryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200 items-center justify-center"
      style={{ width: "20%", minHeight: 155 }}
      activeOpacity={0.7}
    >
      <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center mb-2">
        <Text className="text-2xl text-gray-400">+</Text>
      </View>

      <Text className="text-xs font-medium text-gray-500">Dodaj</Text>
    </TouchableOpacity>
  );
}
