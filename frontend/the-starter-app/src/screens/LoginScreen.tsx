import * as React from "react";
import { KeyboardAvoidingView, Image, StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";


import { NavigationActions, StackActions } from 'react-navigation'

import imageLogo from "../assets/images/logo6.png";   
import imageBackground from "../assets/images/background4.png";  
 
import colors from "../config/colors";
import strings from "../config/strings";

import { iOSUIKit } from 'react-native-typography'  

interface State {
  email: string;
  password: string;
}

class LoginScreen extends React.Component<{}, State> {
  
  static navigationOptions = {
     
  };

  passwordInputRef = React.createRef<FormTextInput>();

  readonly state: State = {
    email: "",
    password: ""
  };

  handleEmailChange = (email: string) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleLoginPress = () => {
    console.log("Login button pressed");

   this.props
   .navigation
   .dispatch(StackActions.reset({
     index: 0,
     actions: [
       NavigationActions.navigate({
         routeName: 'Home',
         //params: { someParams: 'parameters goes here...' },
       }),
     ],
   }))

  };

  render() {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" >
       
            
          <Image style={styles.bgImage} source={imageBackground}/>

            
            <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={imageLogo} />
                  
                   </View>
 

             <View style={styles.form}>
            
                <FormTextInput
                  value={this.state.email}
                  onChangeText={this.handleEmailChange}
                  onSubmitEditing={this.handleEmailSubmitPress}
                  placeholder={strings.EMAIL_PLACEHOLDER}
                  returnKeyType="next"
                 
                />
                
                <FormTextInput
                  ref={this.passwordInputRef}
                  value={this.state.password}
                  onChangeText={this.handlePasswordChange}
                  placeholder={strings.PASSWORD_PLACEHOLDER}
                  secureTextEntry
                  returnKeyType="done"
                /> 

                <View style={styles.loginButtonSection}>
                    <Button style={styles.loginButton} label={strings.LOGIN} onPress={this.handleLoginPress} />

              </View>

                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.btnText}>Dont have an account?</Text>
                </TouchableOpacity>

            </View>

      

  </KeyboardAvoidingView>

        //<Image source={imageLogo} style={styles.logo} />
        
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },


   loginButtonSection: {
      width: '100%',
      height: '20%',
      justifyContent: 'center',
      alignItems: 'center'
   },

  loginContainer:{
        alignItems: 'center',
        flex: 2,
        justifyContent: 'center',
        marginTop:20

    },
  logo: {
    position: 'absolute',
        width: 300,
        height: 100

  },

  form: {
    flex: 5,
    justifyContent: "center",
    width: "80%"
  },
  
  text: {
    flex: 1,
    alignSelf: "center",
    textAlign: 'center',
    color: 'black',
    marginTop:150,

    flex: 1,
    width: "100%",
 
  },

  bgImage:{
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    opacity: 0.8,
  },

  loginButton:{
    backgroundColor: colors.GREEN2,

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  
  btnText:{
    color:"white",
    fontWeight:'bold',
    textAlign: 'center',
  }

});
  
export default LoginScreen;


/*import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
*/