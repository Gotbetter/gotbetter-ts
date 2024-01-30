import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";

type useAppLoadingReturnType = {
  isAppReady: boolean;
  isError: boolean;
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const useAppLoading = () => {
  const [isAppReady, setAppReady] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [fontsLoaded, fontError] = useFonts({
    "Pretendard 400": require("../../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard 500": require("../../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard 600": require("../../assets/fonts/Pretendard-SemiBold.otf"),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);
  return [isAppReady, isError];
};
