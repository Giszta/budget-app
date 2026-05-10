import { NavigatorScreenParams } from "@react-navigation/native";

export type RootTabParamList = {
  Expenses: undefined;
  Transactions: undefined;
  Statistics: undefined;
  Settings: undefined;
};

// Root stack wraps tabs + modal screens that appear above tabs
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<RootTabParamList>;
  AddTransaction: undefined;
};
