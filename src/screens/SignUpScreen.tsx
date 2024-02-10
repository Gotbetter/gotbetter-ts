import SignUpForm from "@components/forms/SignUpForm";

import { Text } from "@rneui/base";
import { Divider } from "@rneui/themed";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const SignUpScreen = () => {
  return (
    <View style={styles.fullScreen}>
      <ScrollView style={styles.fullScreen}>
        <View style={styles.rootContainer}>
          <Text h4={true} h4Style={styles.title}>
            회원가입
          </Text>
          <Divider
            style={styles.divider}
            width={1}
            color={"#979797"}
            insetType="middle"
          />
          <SignUpForm />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    height: hp("100%"),

    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontFamily: "Pretendard 600",
    fontWeight: "600",
    color: "#979797",

    paddingTop: hp("6%"),
    paddingBottom: hp("2%"),
  },
  divider: {
    width: "100%",
    marginBottom: hp("2%"),
  },
});
