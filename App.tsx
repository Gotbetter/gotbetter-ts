import { useAppLoading } from "@hooks/useAppLoading";
import AuthNavigations from "@navigations/AuthNavigations";
import { RootStackParamList } from "@navigations/types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import StartScreen from "@screens/StartScreen";
import theme from "@styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {
  const [isAppReady, isError] = useAppLoading();

  if (!isAppReady) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootStack.Navigator
            initialRouteName="Start"
            screenOptions={{ headerShown: false }}
          >
            <RootStack.Screen name="Start" component={StartScreen} />
            <RootStack.Screen name="Auth" component={AuthNavigations} />
          </RootStack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
