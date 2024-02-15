import { Button, Text } from "@rneui/base";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Logo from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import { StartScreenNavigationProp } from "@navigations/types";

const StartScreen = () => {
  const { navigate } = useNavigation<StartScreenNavigationProp>();

  const onPressNormalLoginButton = () => navigate("Auth", { screen: "Login" });

  const onPressGoogleLoginButton = () => {
    // TODO Google Login 연동
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.sloganContainer}>
        <Text h3Style={styles.slogan} h3={true}>
          친구들과 함께
        </Text>
        <Text h3Style={styles.slogan} h3={true}>
          더 나은 미래를 향해.
        </Text>
      </View>

      <Button
        type={"outline"}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        title={"일반 로그인"}
        titleStyle={styles.buttonTitle}
        onPress={onPressNormalLoginButton}
      />
      <Button
        type={"outline"}
        icon={{
          name: "googleplus",
          type: "antdesign",
          color: "blue",
          size: 15,
        }}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonStyle}
        title={"Google 로그인"}
        titleStyle={styles.buttonTitle}
        onPress={onPressGoogleLoginButton}
      />
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
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
  sloganContainer: {
    justifyContent: "center",
    alignItems: "center",

    marginBottom: hp("30%"),
  },
  slogan: {
    fontFamily: "Pretendard 600",
    fontWeight: "600",
  },

  buttonStyle: {
    borderColor: "#E4E4E4",
  },

  buttonContainer: {
    width: "90%",
    marginVertical: 4,
  },
  buttonTitle: {
    color: "#697176",
    fontFamily: "Pretendard 500",
  },
});
