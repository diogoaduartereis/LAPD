import * as React from "react";
import { KeyboardAvoidingView, Image, StyleSheet, View, ImageBackground, Text, TextInput, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";

import imageLogo from "../assets/images/logo6.png";   
import imageBackground from "../assets/images/background4.png";  
 
import colors from "../config/colors";
import strings from "../config/strings";

import { iOSUIKit } from 'react-native-typography'  

interface State {
  email: string;
  password: string;
}

class RegisterScreen extends React.Component<{}, State> {

  static navigationOptions = ({navigation}) => { 
    return {  headerTransparent: true, 
      headerStyle: { borderBottomWidth: 0, } } 
    };

secondTextInput = React.createRef<FormTextInput>();
thirdTextInput = React.createRef<FormTextInput>();

  readonly state: State = {
    username: "",
    email: "",
    password: ""
  };

  handleEmailChange = (email: string) => {
    this.setState({ email: email });
  };

  handleUsernameChange = (username: string) => {
    this.setState({ username: username });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
  };

  handleLoginPress = () => {
    console.log("Login button pressed");
  };

  render() {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" >
      
          <Image style={styles.bgImage} source={imageBackground}/>
            
             <View style={styles.form}>
            
                <FormTextInput
                  value={this.state.username}
                  onChangeText={this.handleUsernameChange}
                  placeholder={strings.USERNAME_PLACEHOLDER}
                  returnKeyType="next"
                  
                  onSubmitEditing={() => { this.secondTextInput.focus(); }}
                  blurOnSubmit={false}
                />


                <FormTextInput
                  ref={(input) => { this.secondTextInput = input; }}
                  value={this.state.email}
                  onChangeText={this.handleEmailChange}
                  placeholder={strings.EMAIL_PLACEHOLDER}
                  returnKeyType="next"
                  keyboardType="email-address"
                  
                  onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                  blurOnSubmit={false}
                />
                
                <FormTextInput
                  ref={(input) => { this.thirdTextInput = input; }}
                  value={this.state.password}
                  onChangeText={this.handlePasswordChange}
                  placeholder={strings.PASSWORD_PLACEHOLDER}
                  secureTextEntry={true}
                  returnKeyType="done"
                /> 


                <View style={styles.loginButtonSection}>
                    <Button style={styles.loginButton} label={strings.REGISTER} onPress={this.handleLoginPress} />

              </View>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.btnText}>Already have a account?</Text>
                </TouchableOpacity>

            </View>



  </KeyboardAvoidingView>


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
    flex: 1,
    justifyContent: "center",
    width: "80%",
    marginTop:30
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
    backgroundColor: colors.GREEN2 ,

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
  
export default RegisterScreen;
