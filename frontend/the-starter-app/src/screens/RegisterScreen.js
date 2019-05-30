import * as React from "react";
import {
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import imageBackground from "../assets/images/background4.png";
import colors from "../config/colors";
import strings from "../config/strings";
import { NavigationActions, StackActions } from "react-navigation";
import * as Progress from 'react-native-progress';


class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      username: "",
      password: "",
      confirmPassword: "",
      errorMsg: "",
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0 }
    };
  };

  secondTextInput = React.createRef();
  thirdTextInput = React.createRef();

  validateLogin(min, max)
  {
    if(this.state.username.length < min || this.state.username.length > max) {
      this.setState({
        errorMsg: "Username must be " + min + " to " + max + " characters long"
      });
      return false;
    }
    else if(!this.state.username.match(/^[a-zA-Z0-9]+$/i)) {
      this.setState({
        errorMsg: "Username must be alphanumeric"
      })
      return false;
    }

    if(this.state.confirmPassword != this.state.password) {
      this.setState({
        errorMsg:"The passwords don't match"
      })
      return false;
    }

    if(this.state.password.length < min || this.state.password.length > max) {
      this.setState({
        errorMsg:"Password must be " + min + " to " + max + " characters long"
      })
      return false;
    }
    else if(!this.state.password.match(/^[a-zA-Z0-9]+$/i)) {
      this.setState({
        errorMsg: "Password must be alphanumeric"
      })
      return false;
    }
    return true
  }

  handleUsernameChange = username => this.setState({ username });
  handlePasswordChange = password => this.setState({ password });
  handlePasswordConfirmChange = confirmPassword => this.setState({ confirmPassword });
  handleRegisterPress = () => {

    if(!this.validateLogin(5,20)) return;
    this.setState({ loading:true })
    setTimeout(() => {
      fetch("http://" + global.SERVERIP + "/api/register", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
      .then(data => {
        
        this.setState({ loading:false })

        if(data.status == 200) {
          this.props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: "Home",
                  params: { username: this.state.username }
                })
              ]
            })
          );
        }
      }).catch(error => {
        this.setState({ loading:false })
        console.log(error);
      });
    }, 3000)
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.bgImage} source={imageBackground} />

        <View style={styles.form}>
          <FormTextInput
            value={this.state.username}
            onChangeText={this.handleUsernameChange}
            placeholder={strings.USERNAME_PLACEHOLDER}
            returnKeyType="next"
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            blurOnSubmit={false}
          />

          <FormTextInput
            ref={input => {
              this.secondTextInput = input;  
            }}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
            secureTextEntry={true}
            onSubmitEditing={() => {
              this.thirdTextInput.focus();
            }} 
            returnKeyType="next"
          />

          <FormTextInput
            ref={input => {
              this.thirdTextInput = input;
            }}
            value={this.state.confirmPassword}
            onChangeText={this.handlePasswordConfirmChange}
            placeholder={strings.CONFIRMPASSWORD_PLACEHOLDER}
            secureTextEntry={true}
            returnKeyType="done"
          />

          <View style={styles.loginButtonSection}>
            <Button
              style={styles.loginButton}
              label={strings.REGISTER}
              onPress={this.handleRegisterPress}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
            <Text style={styles.btnText}>Already have a account?</Text>
          </TouchableOpacity>
        </View>

        {this.state.loading && <Progress.CircleSnail style={styles.loading} size={100} thickness={5} color={[colors.BLUE, colors.GREEN2, colors.YELLOW]} />}
 
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  loading:{
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  loginButtonSection: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center"
  },

  loginContainer: {
    alignItems: "center",
    flex: 2,
    justifyContent: "center",
    marginTop: 20
  },
  logo: {
    position: "absolute",
    width: 300,
    height: 100
  },

  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%",
    marginTop: 30
  },

  text: {
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    color: "black",
    marginTop: 150,
    width: "100%"
  },

  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    opacity: 0.8
  },

  loginButton: {
    backgroundColor: colors.GREEN2,

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }, 

  errorMsg: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },   
});

export default RegisterScreen;
