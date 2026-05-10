import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import {
  selectBalance,
  selectTotalExpenses,
  selectTotalIncome,
  useTransactionStore,
} from "../store/useTransactionStore";
import { formatCurrency } from "../utils/currency";
import { RootStackParamList, RootTabParamList } from "../navigation/types";

// Composite type: this screen lives in Tab but needs to navigate in Stack
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

        {/* Opens AddTransaction modal */}
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
        // Empty state
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
        <View className="mt-4 gap-3">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";

            return (
              <TouchableOpacity
                key={transaction.id}
                activeOpacity={0.85}
                className="flex-row items-center justify-between rounded-3xl border border-slate-800 bg-slate-900 p-4"
              >
                <View className="flex-1 flex-row items-center">
                  <View
                    className={`h-12 w-12 items-center justify-center rounded-2xl ${
                      isIncome ? "bg-emerald-500/20" : "bg-red-500/20"
                    }`}
                  >
                    <Text className="text-xl">{isIncome ? "↙️" : "↗️"}</Text>
                  </View>

                  <View className="ml-3 flex-1">
                    <Text className="text-base font-bold text-white">
                      {transaction.title}
                    </Text>
                    <Text className="mt-1 text-xs text-slate-400">
                      {transaction.category} • {transaction.date}
                    </Text>
                  </View>
                </View>

                <Text
                  className={`ml-3 text-base font-black ${
                    isIncome ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {isIncome ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}
