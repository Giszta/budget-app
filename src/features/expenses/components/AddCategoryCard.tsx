import { Text, TouchableOpacity, View } from "react-native";

type AddCategoryCardProps = {
  onPress?: () => void;
};

export function AddCategoryCard({ onPress }: AddCategoryCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="rounded-[28px] border border-dashed border-slate-700 bg-slate-900/50 p-5"
    >
      <View className="flex-row items-center justify-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
          <Text className="text-2xl font-bold text-slate-950">+</Text>
        </View>

        <Text className="text-base font-bold text-white">
          Dodaj nową kategorię
        </Text>
      </View>
    </TouchableOpacity>
  );
}
