import React from "react";
import colors from "./src/config/colors";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PlantScreen from "./src/screens/PlantScreen";
import WeatherScreen from "./src/screens/WeatherScreen";
import AddPlantScreen from "./src/screens/AddPlantScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

import { createStackNavigator, createAppContainer } from "react-navigation";

global.SERVERIP = '94.60.211.16:3001';
global.USERNAME = 'admin';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    AddPlant: {
      screen: AddPlantScreen,
      navigationOptions: {
        headerTintColor: "black",
        title: "Add new plant",
        headerTitleStyle: { flex: 1, textAlign: "center" },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: colors.GREEN2
        }
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
    },

    Weather: {
      screen: WeatherScreen,
      navigationOptions: {
        title: "Weather",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: colors.GREEN2
        }
      }

    },


  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      headerTintColor: "black",
      title: "Settings",
      headerTitleStyle: { flex: 1, textAlign: "center" },
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.GREEN2
      }
    }
  }
}  ,

  {
    initialRouteName: "Settings"
  }
);

export default createAppContainer(AppNavigator);
