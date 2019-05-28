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

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      failMessage: "",
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
        failMessage: "Username must be " + min + " to " + max + " characters long"
      });
      return 0;
    }
    else if(!this.state.username.match(/^[a-zA-Z0-9]+$/i)) {
      this.setState({
        failMessage: "Username must be alphanumeric"
      })
      return 0;
    }

    if(this.state.password.length < min || this.state.password.length > max) {
      this.setState({
        failMessage:"Password must be " + min + " to " + max + " characters long"
      })
      return 0;
    }
    else if(!this.state.password.match(/^[a-zA-Z0-9]+$/i)) {
      this.setState({
        failMessage: "Password must be alphanumeric"
      })
      return 0;
    }
    return 1
  }

  handleUsernameChange = username => this.setState({ username });
  handlePasswordChange = password => this.setState({ password });
  handleRegisterPress = () => {
    if(this.validateLogin(5,20) == 0) return;
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
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
    }, 5000)
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
              this.thirdTextInput = input;
            }}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
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
            <Text style={styles.errorMsg}>{this.state.failMessage}</Text>
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
    alignItems: "center"
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
