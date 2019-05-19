import React from "react";
import colors from "./src/config/colors";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PlantScreen from "./src/screens/PlantScreen";

import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: { headerTintColor: "black" }
    },

    Plant: {
      screen: PlantScreen,
      navigationOptions: {
        headerTintColor: "black",
        // title: "Plant",
        headerTitleStyle: { flex: 1, textAlign: "center" },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: colors.GREEN2
        }
      }
    },

    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "IOGreen",
        // headerTitleStyle: { flex: 1, textAlign: 'left' },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: colors.GREEN2
        }
      }
    }
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);
