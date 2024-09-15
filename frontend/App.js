import NavigationContainer from "expo-router/build/fork/NavigationContainer.native";
import TabNavigator from "./app/navigation/TabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
}
