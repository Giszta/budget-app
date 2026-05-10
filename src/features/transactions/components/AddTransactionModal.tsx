import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useTransactionStore } from "../../../store/useTransactionStore";
import {
  TransactionCategory,
  TransactionType,
} from "../../../types/transaction";
import { RootStackParamList } from "../../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "AddTransaction">;

// Category config: icon + label displayed in the picker
const CATEGORIES: {
  value: TransactionCategory;
  label: string;
  icon: string;
}[] = [
  { value: "food", label: "Jedzenie", icon: "🥗" },
  { value: "transport", label: "Transport", icon: "🚙" },
  { value: "housing", label: "Dom", icon: "🏡" },
  { value: "entertainment", label: "Rozrywka", icon: "🎭" },
  { value: "health", label: "Zdrowie", icon: "💊" },
  { value: "shopping", label: "Zakupy", icon: "🛍️" },
  { value: "salary", label: "Wynagrodzenie", icon: "💼" },
  { value: "other", label: "Inne", icon: "✨" },
];

export default function AddTransactionModal({ navigation }: Props) {
  const addTransaction = useTransactionStore((s) => s.addTransaction);

  const [type, setType] = useState<TransactionType>("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<TransactionCategory>("food");

  // Today's date as ISO string (date part only)
  const today = new Date().toISOString().split("T")[0];

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const parsedAmount = parseFloat(amount.replace(",", "."));

    if (!trimmedTitle) {
      Alert.alert("Błąd", "Podaj tytuł transakcji.");
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert("Błąd", "Podaj poprawną kwotę większą od 0.");
      return;
    }

    addTransaction({
      type,
      title: trimmedTitle,
      amount: parsedAmount,
      category,
      date: today,
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-950"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerClassName="px-5 pb-16 pt-8"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="mb-8 flex-row items-center justify-between">
          <View>
            <Text className="text-sm font-medium uppercase tracking-[3px] text-emerald-400">
              Nowy wpis
            </Text>
            <Text className="mt-2 text-3xl font-bold text-white">
              Dodaj transakcję
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-11 w-11 items-center justify-center rounded-full bg-slate-800"
          >
            <Text className="text-lg text-slate-300">✕</Text>
          </TouchableOpacity>
        </View>

        {/* Type toggle: income / expense */}
        <View className="mb-6 flex-row rounded-2xl bg-slate-900 p-1">
          {(["expense", "income"] as TransactionType[]).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              className={`flex-1 rounded-xl py-3 items-center ${
                type === t
                  ? t === "income"
                    ? "bg-emerald-500"
                    : "bg-red-500"
                  : ""
              }`}
            >
              <Text
                className={`text-sm font-bold ${
                  type === t ? "text-white" : "text-slate-400"
                }`}
              >
                {t === "income" ? "💰 Przychód" : "💸 Wydatek"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Amount input */}
        <View className="mb-5">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Kwota (PLN)
          </Text>
          <View className="flex-row items-center rounded-2xl border border-slate-800 bg-slate-900 px-4">
            <Text className="mr-2 text-2xl font-bold text-slate-500">zł</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor="#475569"
              keyboardType="decimal-pad"
              className="flex-1 py-4 text-2xl font-bold text-white"
            />
          </View>
        </View>

        {/* Title input */}
        <View className="mb-5">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Tytuł
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="np. Zakupy w Biedronce"
            placeholderTextColor="#475569"
            returnKeyType="done"
            className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 text-base text-white"
          />
        </View>

        {/* Category picker */}
        <View className="mb-8">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Kategoria
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                onPress={() => setCategory(cat.value)}
                className={`flex-row items-center rounded-2xl border px-3 py-2.5 ${
                  category === cat.value
                    ? "border-emerald-500 bg-emerald-500/15"
                    : "border-slate-800 bg-slate-900"
                }`}
              >
                <Text className="mr-1.5">{cat.icon}</Text>
                <Text
                  className={`text-xs font-semibold ${
                    category === cat.value
                      ? "text-emerald-400"
                      : "text-slate-300"
                  }`}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save button */}
        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.85}
          className={`items-center justify-center rounded-3xl py-5 ${
            type === "income" ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          <Text className="text-base font-bold text-white">
            {type === "income" ? "Dodaj przychód" : "Dodaj wydatek"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
