import { StatusBar } from 'expo-status-bar';
import ExpensesScreen from './app/screens/ExpensesScreen';

export default function App() {
  return (
    <>
      <ExpensesScreen />
      <StatusBar style="auto" />
    </>
  );
}
