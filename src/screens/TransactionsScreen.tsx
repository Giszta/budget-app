import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { SwipeableTransactionItem } from "../features/transactions/components/SwipeableTransactionItem";
import {
  selectBalance,
  selectTotalExpenses,
  selectTotalIncome,
  useTransactionStore,
} from "../store/useTransactionStore";
import { formatCurrency } from "../utils/currency";
import { RootStackParamList, RootTabParamList } from "../navigation/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, "Transactions">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function TransactionsScreen({ navigation }: Props) {
  const transactions = useTransactionStore((s) => s.transactions);

  const income = selectTotalIncome(transactions);
  const expenses = selectTotalExpenses(transactions);
  const balance = selectBalance(transactions);

  return (
    <ScrollView
      className="flex-1 bg-slate-950"
      contentContainerClassName="px-5 pb-32 pt-14"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-sm font-medium uppercase tracking-[3px] text-emerald-400">
            Money flow
          </Text>
          <Text className="mt-2 text-3xl font-bold text-white">Transakcje</Text>
          <Text className="mt-2 text-sm text-slate-400">
            Ostatnie przychody i wydatki
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate("AddTransaction")}
          className="h-12 w-12 items-center justify-center rounded-full bg-emerald-500"
        >
          <Text className="text-2xl font-bold text-slate-950">+</Text>
        </TouchableOpacity>
      </View>

      {/* Balance card */}
      <View className="mt-7 rounded-[32px] bg-slate-900 p-5">
        <Text className="text-sm font-semibold uppercase tracking-[2px] text-slate-400">
          Bilans miesiąca
        </Text>

        <Text
          className={`mt-3 text-4xl font-black ${
            balance >= 0 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {formatCurrency(balance)}
        </Text>

        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-3xl bg-slate-950 p-4">
            <Text className="text-xs font-semibold uppercase text-slate-500">
              Przychody
            </Text>
            <Text className="mt-2 text-lg font-bold text-emerald-400">
              +{formatCurrency(income)}
            </Text>
          </View>

          <View className="flex-1 rounded-3xl bg-slate-950 p-4">
            <Text className="text-xs font-semibold uppercase text-slate-500">
              Wydatki
            </Text>
            <Text className="mt-2 text-lg font-bold text-red-400">
              -{formatCurrency(expenses)}
            </Text>
          </View>
        </View>
      </View>

      {/* Transaction list */}
      <View className="mt-8 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-white">Historia</Text>
          <Text className="mt-1 text-sm text-slate-400">
            {transactions.length} transakcji
          </Text>
        </View>
        <Text className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300">
          Maj 2026
        </Text>
      </View>

      {transactions.length === 0 ? (
        <View className="mt-16 items-center">
          <Text className="text-5xl">💳</Text>
          <Text className="mt-4 text-lg font-bold text-slate-400">
            Brak transakcji
          </Text>
          <Text className="mt-1 text-sm text-slate-600">
            Naciśnij + aby dodać pierwszą
          </Text>
        </View>
      ) : (
        // GestureHandlerRootView is already provided by expo – no extra wrapper needed
        <View className="mt-4">
          {transactions.map((transaction) => (
            <SwipeableTransactionItem
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
