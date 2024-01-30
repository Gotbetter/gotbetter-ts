import {
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";

type RootStackParamList = {
  Start: undefined;
  Auth: NavigatorScreenParams<AuthParamList>;
  Home: undefined;
};

type AuthParamList = {
  Login: undefined;
  SignUp: undefined;
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
  StartScreenNavigationProp,
  AuthScreenNavigationProp,
};
