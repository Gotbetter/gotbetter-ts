import { login } from "@api/auth";
import { AuthScreenNavigationProp } from "@navigations/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button, ButtonGroup, Input } from "@rneui/base";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Logo from "../../assets/logo.png";

enum OPTION {
  SIGNUP,
  FIND_ID,
  FIND_PASSWORD,
}

type LoginForm = {
  username: string;
  password: string;
};

const LoginScreen = () => {
  const { navigate, reset } = useNavigation<AuthScreenNavigationProp>();

  const { control, handleSubmit, setError } = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

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

  const handleLogin = async (data: LoginForm) => {
    try {
      const { data: response } = await login(data);
      const { accessToken, refreshToken } = response.data;

      try {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);

        reset({ routes: [{ name: "Home" }] });
      } catch (err) {}
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError("password", {
            type: "loginFailed",
            message: "아이디 또는 비밀번호가 일치하지 않습니다.",
          });
        }
      }
    }
  };

  return (
    <View style={styles.fullScreen}>
      <ScrollView style={styles.fullScreen}>
        <View style={styles.rootContainer}>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
          </View>

          <Controller
            name="username"
            control={control}
            rules={{
              required: "아이디를 입력해주세요.",
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                maxLength={20}
                inputContainerStyle={styles.input}
                inputStyle={styles.inputText}
                placeholder="아이디"
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "비밀번호를 입력해주세요",
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                inputContainerStyle={styles.input}
                inputStyle={styles.inputText}
                placeholder="비밀번호"
                secureTextEntry={true}
                errorMessage={error?.message}
              />
            )}
          />

          <Button
            containerStyle={styles.buttonContainer}
            title={"로그인"}
            onPress={handleSubmit(handleLogin)}
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
  fullScreen: { flex: 1, backgroundColor: "white" },
  rootContainer: {
    height: hp("100%"),

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
    marginTop: hp("2%"),
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
