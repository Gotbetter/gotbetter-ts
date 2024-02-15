import {
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";

type RootStackParamList = {
  Start: undefined;
  Auth: NavigatorScreenParams<AuthParamList>;
  Home: NavigatorScreenParams<HomeParamList>;
};

type AuthParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: NavigatorScreenParams<HomeParamList>;
};

type HomeParamList = {
  Main: undefined;
};

type StartScreenNavigationProp = NavigationProp<RootStackParamList>;

type AuthScreenNavigationProp = NavigationProp<AuthParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export {
  RootStackParamList,
  AuthParamList,
  HomeParamList,
  StartScreenNavigationProp,
  AuthScreenNavigationProp,
};
