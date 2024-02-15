import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreenBottomTabs from "@components/HomeScreenBottomTabs";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <View style={styles.rootContainer}>
      <Text></Text>
      <HomeScreenBottomTabs />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
