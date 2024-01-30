import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@screens/LoginScreen";
import SignUpScreen from "@screens/SignUpScreen";
import React from "react";
import { AuthParamList } from "./types";

const AuthStack = createNativeStackNavigator<AuthParamList>();

const AuthNavigations = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigations;
