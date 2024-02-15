import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import { HomeParamList } from "./types";
import HomeScreen from "@screens/HomeScreen";

const HomeStack = createNativeStackNavigator<HomeParamList>();

const HomeNavigations = () => {
  return (
    <HomeStack.Navigator initialRouteName="Main">
      <HomeStack.Screen name="Main" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigations;
