import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ExpensesScreen from "../screens/ExpensesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import { RootTabParamList } from "./types";

const Tab = createBottomTabNavigator<RootTabParamList>();

type TabIconProps = {
  focused: boolean;
  icon: string;
};

function TabIcon({ focused, icon }: TabIconProps) {
  return (
    <Text
      style={{
        fontSize: 22,
        color: focused ? "#34d399" : "#64748b",
      }}
    >
      {icon}
    </Text>
  );
}

export default function RootNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Expenses"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#34d399",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          height: 84,
          paddingTop: 10,
          paddingBottom: 18,
          borderTopWidth: 1,
          borderTopColor: "#1e293b",
          backgroundColor: "#020617",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          title: "Wydatki",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="💰" />,
        }}
      />

      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          title: "Transakcje",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="💳" />,
        }}
      />

      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          title: "Statystyki",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="📈" />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Ustawienia",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="⚙️" />,
        }}
      />
    </Tab.Navigator>
  );
}
