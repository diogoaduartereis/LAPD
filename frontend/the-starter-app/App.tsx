import React from "react";
import colors from "./src/config/colors";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";

import { createStackNavigator, createAppContainer } from "react-navigation";


const AppNavigator = createStackNavigator(
{
    Login: {

    	screen:LoginScreen,
    	navigationOptions: {
       		header: null
       
    	},
    	},
    Register: {
    	screen: RegisterScreen,
    	navigationOptions: {headerTintColor: 'black',}
    },

    Home:{
		screen: HomeScreen,
		navigationOptions: {
			title: "IOGreen",
			headerTitleStyle: {  flex: 1, textAlign: 'left'},
			headerTintColor: "white",
    headerStyle: {
      backgroundColor: colors.GREEN2
    }
		}
    	},

  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}