import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/HomeScreen";
import UserScreen from "./src/UserScreen";
import { RootStackParamList } from "./src/utils/types";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="User"
                options={{ title: "" }}
                component={UserScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
