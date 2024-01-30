import { Button, Icon, Input, Text } from "@rneui/base";
import { Divider } from "@rneui/themed";
import React from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {};

const SignUpScreen = (props: Props) => {
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
          <View style={styles.inputContainer}>
            <Input
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              placeholder="아이디"
              label="아이디 *"
              rightIcon={
                <Button
                  title={"중복확인"}
                  buttonStyle={styles.duplicateButton}
                  titleStyle={styles.duplicateButtonTitle}
                />
              }
              labelStyle={styles.inputLabel}
            />

            <Input
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              placeholder="비밀번호"
              label="비밀번호 *"
              labelStyle={styles.inputLabel}
            />
            <Input
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              placeholder="비밀번호 확인"
            />

            <Input
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              placeholder="닉네임"
              label="닉네임 *"
              labelStyle={styles.inputLabel}
            />
          </View>
          <Button
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            title={"회원가입"}
            titleStyle={styles.buttonTitle}
          />
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

  inputContainer: { width: "100%" },
  input: {
    height: hp("6%"),
    borderWidth: 0,
    borderRadius: 4,
    borderColor: "#E4E4E4",

    backgroundColor: "#F5F5F5",

    paddingLeft: 8,
  },
  inputLabel: {
    paddingBottom: 4,

    fontFamily: "Pretendard 600",
    color: "#BDBDBD",
  },
  inputText: {
    fontFamily: "Pretendard 600",
    fontSize: 16,
  },
  buttonContainer: {
    width: "95%",
    marginTop: "auto",
    marginBottom: hp("4%"),
    borderRadius: 4,
  },
  duplicateButton: {
    backgroundColor: "#E0E0E0",
  },
  duplicateButtonTitle: {
    fontFamily: "Pretendard 600",
    color: "#9E9E9E",
  },
  button: {
    backgroundColor: "#979797",
  },
  buttonTitle: {
    fontFamily: "Pretendard 600",
  },
});
