import { Text } from "@rneui/base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { ThemeProvider } from "@rneui/themed";
import theme from "@styles/theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Pretendard 400": require("./assets/fonts/Pretendard-Regular.otf"),
    "Pretendard 500": require("./assets/fonts/Pretendard-Medium.otf"),
    "Pretendard 600": require("./assets/fonts/Pretendard-SemiBold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Text style={{ fontFamily: "Pretendard 400" }}>pretendard 400</Text>
        <Text style={{ fontFamily: "Pretendard 500" }}>pretendard 500</Text>
        <Text style={{ fontFamily: "Pretendard 600" }}>pretendard 600</Text>

        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
