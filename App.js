import React, { useContext } from "react";
import { View, Text, Image, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from "./src/AuthContext";
import Wait from "./src/Wait";
import SignUp from "./src/SignUp";
import Hello from "./src/Hello";
import LogIn from "./src/Login";

const Stack = createNativeStackNavigator();

function App() {
  const { userToken, isLoading } = useContext(AuthContext);

  // Display a splash screen while the isLoading state is true
  if (isLoading) {
    return <Wait />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <Stack.Screen name="Hello" component={Hello} />
        ) : (
          <Stack.Screen
            name="SignUp"
            component={LogIn}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
