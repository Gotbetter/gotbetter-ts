import { Button, ButtonGroup, Input } from "@rneui/base";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Logo from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "@navigations/types";

enum OPTION {
  SIGNUP,
  FIND_ID,
  FIND_PASSWORD,
}

const LoginScreen = () => {
  const { navigate } = useNavigation<AuthScreenNavigationProp>();

  const onPressOptionGroup = (index: number) => {
    switch (index) {
      case OPTION.SIGNUP:
        navigate("SignUp");
        break;
      case OPTION.FIND_ID:
        break;
      case OPTION.FIND_PASSWORD:
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.fullScreen}>
      <ScrollView style={styles.fullScreen}>
        <View style={styles.rootContainer}>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
          </View>

          <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            placeholder="아이디"
          />
          <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.inputText}
            placeholder="비밀번호"
            secureTextEntry={true}
          />

          <Button
            containerStyle={styles.buttonContainer}
            title={"로그인"}
            titleStyle={styles.buttonTitle}
            color={"#33F"}
          />
          <ButtonGroup
            onPress={(index) => onPressOptionGroup(index)}
            buttons={["회원가입", "아이디 찾기", "비밀번호 찾기"]}
            textStyle={styles.optionTitle}
            containerStyle={styles.optionGroup}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  fullScreen: { flex: 1 },
  rootContainer: {
    height: hp("100%"),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: wp("2%"),
    paddingBottom: hp("15%"),
  },
  logo: {
    width: wp("80%"),
    height: hp("10%"),
    resizeMode: "contain",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",

    marginBottom: hp("2%"),
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#E4E4E4",

    paddingLeft: 8,
  },
  inputText: {
    fontFamily: "Pretendard 600",
    fontSize: 16,
  },
  buttonContainer: {
    width: "95%",
    borderRadius: 4,
  },
  buttonTitle: {
    fontFamily: "Pretendard 600",
  },
  optionGroup: {
    height: hp("2%"),
    marginTop: hp("2%"),
    borderWidth: 0,
  },
  optionTitle: {
    fontSize: 12,
    fontFamily: "Pretendard 600",
  },
});
