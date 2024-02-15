import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Tab } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

enum TAB_ITEMS {
  HOME,
  FIND_ROOM,
  CREATE_ROOM,
  LOGOUT,
}

const HomeScreenBottomTabs = () => {
  const { reset } = useNavigation();

  const onChange = (index: number) => {
    switch (index) {
      case TAB_ITEMS.HOME:
        break;
      case TAB_ITEMS.FIND_ROOM:
        break;
      case TAB_ITEMS.CREATE_ROOM:
        break;
      case TAB_ITEMS.LOGOUT:
        handleLogout();
        break;

      default:
        break;
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      reset({ routes: [{ name: "Start" }] });
    } catch (err) {}
  };

  return (
    <Tab
      style={styles.bottom}
      containerStyle={styles.container}
      titleStyle={styles.tabTitle}
      disableIndicator={true}
      onChange={onChange}
    >
      <Tab.Item
        type="clear"
        title="홈"
        icon={{ name: "home", type: "feather", color: "#979797" }}
      />
      <Tab.Item
        title="방 참가"
        icon={{ name: "search", type: "feather", color: "#979797" }}
      />
      <Tab.Item
        title="방 만들기"
        icon={{
          name: "plus-circle",
          type: "feather",
          color: "#979797",
        }}
      />
      <Tab.Item
        title="로그아웃"
        icon={{ name: "user", type: "feather", color: "#979797" }}
      />
    </Tab>
  );
};

export default HomeScreenBottomTabs;

const styles = StyleSheet.create({
  bottom: {
    marginTop: "auto",
  },
  container: {
    backgroundColor: "white",
  },
  tabTitle: {
    marginTop: hp("0.25%"),

    color: "#979797",
    fontSize: 9,
    fontFamily: "Pretendard 600",
  },
});
