import "./global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    // GestureHandlerRootView must be the outermost wrapper
    // flex: 1 required – without it the app renders invisible
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
