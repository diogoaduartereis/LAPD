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
import { NavigationActions, StackActions } from "react-navigation";
import imageLogo from "../assets/images/logo6.png";
import imageBackground from "../assets/images/background4.png";
import colors from "../config/colors";
import strings from "../config/strings";
import * as Progress from 'react-native-progress';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      username: "",
      password: "",
      errorMsg: "",
      showLoading: false,
    };
  }

  passwordInputRef = React.createRef();

  handleUsernameChange = username => this.setState({ username });
  handlePasswordChange = password => this.setState({ password });

  handleUsernameSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleLoginPress = () => {
    
    this.setState({ loading:true })

    setTimeout(() => {
      fetch("http://" + global.SERVERIP + "/api/login", {
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

        if(data.status != 200) {
          this.setState({
            errorMsg: data._bodyText,
            showLoading: false,
          })
        }
        else {
          this.setState({
            showLoading: false,
          })
          this.props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: "Home",
                  params: { username: this.state.username },
                })
              ]
            })
          );
        }}).catch(error => {
            this.setState({
              showLoading: false,
            })
            console.log(error);
          });
        }, 3000)
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.bgImage} source={imageBackground} />

        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={imageLogo} />
        </View>

        <View style={styles.form}>
          <FormTextInput
            value={this.state.username}
            onChangeText={this.handleUsernameChange}
            onSubmitEditing={this.handleUsernameSubmitPress}
            placeholder={strings.USERNAME_PLACEHOLDER}
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
            <Button
              style={styles.loginButton}
              label={strings.LOGIN}
              onPress={this.handleLoginPress}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
            <Text style={styles.btnText}>Dont have an account?</Text>
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
    flex: 5,
    justifyContent: "center",
    width: "80%"
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

export default LoginScreen;
