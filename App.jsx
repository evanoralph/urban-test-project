// In App.js in a new project
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./pages/home";
import ProfilePage from "./pages/profile-page";
import { NativeBaseProvider, Box } from "native-base";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
const Stack = createSharedElementStackNavigator();


function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              useNativeDriver: true,
              headerShown: false,
              headerMode: "none",
              gestureEnabled: false
            }}
            name="Home" component={Home} />
          <Stack.Screen
            options={{
              useNativeDriver: true,
              headerShown: false,
              headerMode: "none",
            }}
            name="profile-page"
            component={ProfilePage}
            sharedElements={route => {
              const { user } = route.params;
              return [
                {
                  id: user.id,
                  animation: "move",
                  resize: "stretch",
                },
              ];
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
