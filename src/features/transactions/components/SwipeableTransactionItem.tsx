import { useRef } from "react";
import {
  Alert,
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTransactionStore } from "../../../store/useTransactionStore";
import { Transaction } from "../../../types/transaction";
import { formatCurrency } from "../../../utils/currency";

type Props = {
  transaction: Transaction;
};

const SWIPE_THRESHOLD = -72;
const DELETE_BUTTON_WIDTH = 72;

export function SwipeableTransactionItem({ transaction }: Props) {
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction);
  const isIncome = transaction.type === "income";

  const translateX = useRef(new Animated.Value(0)).current;
  const isOpen = useRef(false);

  const snapTo = (toValue: number, callback?: () => void) => {
    Animated.spring(translateX, {
      toValue,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start(callback);
  };

  const confirmDelete = () => {
    Alert.alert(
      "Usuń transakcję",
      `Czy na pewno chcesz usunąć „${transaction.title}"?`,
      [
        {
          text: "Anuluj",
          style: "cancel",
          onPress: () => {
            snapTo(0);
            isOpen.current = false;
          },
        },
        {
          text: "Usuń",
          style: "destructive",
          onPress: () => {
            // Slide off screen then remove from store
            Animated.timing(translateX, {
              toValue: -400,
              duration: 250,
              useNativeDriver: true,
            }).start(() => deleteTransaction(transaction.id));
          },
        },
      ],
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      // Only activate for clear horizontal swipes
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 8 &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5,

      onPanResponderMove: (_, gestureState) => {
        const base = isOpen.current ? SWIPE_THRESHOLD : 0;
        const next = base + gestureState.dx;
        // Clamp: only allow left swipe, max DELETE_BUTTON_WIDTH
        translateX.setValue(Math.min(0, Math.max(next, -DELETE_BUTTON_WIDTH)));
      },

      onPanResponderRelease: (_, gestureState) => {
        const base = isOpen.current ? SWIPE_THRESHOLD : 0;
        const movedTo = base + gestureState.dx;

        if (movedTo < SWIPE_THRESHOLD / 2) {
          snapTo(SWIPE_THRESHOLD);
          isOpen.current = true;
        } else {
          snapTo(0);
          isOpen.current = false;
        }
      },

      onPanResponderTerminate: () => {
        snapTo(0);
        isOpen.current = false;
      },
    }),
  ).current;

  // Delete button opacity tied to swipe progress
  const deleteOpacity = translateX.interpolate({
    inputRange: [-DELETE_BUTTON_WIDTH, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View className="mb-3">
      {/* Delete button behind the row */}
      <Animated.View
        style={{ opacity: deleteOpacity }}
        className="absolute bottom-0 right-0 top-0 w-[72px] items-center justify-center rounded-3xl bg-red-500"
      >
        <TouchableOpacity
          onPress={confirmDelete}
          className="h-full w-full items-center justify-center"
        >
          <Text className="text-2xl">🗑️</Text>
          <Text className="mt-1 text-[10px] font-bold text-white">Usuń</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Swipeable row */}
      <Animated.View
        style={{ transform: [{ translateX }] }}
        {...panResponder.panHandlers}
        className="flex-row items-center justify-between rounded-3xl border border-slate-800 bg-slate-900 p-4"
      >
        <View
          className={`h-12 w-12 items-center justify-center rounded-2xl ${
            isIncome ? "bg-emerald-500/20" : "bg-red-500/20"
          }`}
        >
          <Text className="text-xl">{isIncome ? "↙️" : "↗️"}</Text>
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-base font-bold text-white" numberOfLines={1}>
            {transaction.title}
          </Text>
          <Text className="mt-1 text-xs text-slate-400">
            {transaction.category} • {transaction.date}
          </Text>
        </View>

        <Text
          className={`ml-3 text-base font-black ${
            isIncome ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </Text>
      </Animated.View>
    </View>
  );
}
