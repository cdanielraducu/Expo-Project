import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DefaultTheme,
  IconButton,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/HomeScreen";
import BookScreen from "./src/BookScreen";
import { RootStackParamList } from "./src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Book"
            component={BookScreen}
            options={({ route }) => ({ title: route.params.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
