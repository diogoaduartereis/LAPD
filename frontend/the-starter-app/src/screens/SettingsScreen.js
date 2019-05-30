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


class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      errorMsg: "",
      succMsg: "",
    };
  }

  secondTextInput = React.createRef();
  thirdTextInput = React.createRef();

  validateLogin(min, max)
  {
    if(this.state.confirmNewPassword != this.state.newPassword) {
      this.setState({
        errorMsg:"The passwords don't match"
      })
      return false;
    }

    if(this.state.newPassword.length < min || this.state.newPassword.length > max) {
      this.setState({
        errorMsg:"Password must be " + min + " to " + max + " characters long"
      })
      return false;
    }
    else if(!this.state.newPassword.match(/^[a-zA-Z0-9]+$/i)) {
      this.setState({
        errorMsg: "Password must be alphanumeric"
      })
      return false;
    }
    return true
  }

  handleOldPassword = oldPassword => this.setState({ oldPassword });
  handleNewPassword = newPassword => this.setState({ newPassword });
  handleConfirmNewPassword = confirmNewPassword => this.setState({ confirmNewPassword });

  fetchAndComparePasswords(username) {
    setTimeout(() => {
      fetch("http://" + global.SERVERIP + "/api/comparePW", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          newPassword: this.state.newPassword,
          oldPassword: this.state.oldPassword,
        }),
      })
      .then(data => {
        this.setState({ loading:false })
        if(data.status == 200) {
          this.setState({
            succMsg: "Password successfully updated",
            errorMsg: "",
            loading: false,
          })
          return;
        }
        else {
          this.setState({
            errorMsg: data._bodyText,
            succMsg: "",
            loading: false,
          })
          return;
        }
      }).catch(error => {
        this.setState({ loading:false })
        console.log(error);
        return error;
      });
    }, 3000)
  }

  handlePressChange = () =>{
    if(!this.validateLogin(5,20)) return;
    this.setState({ loading:true })
    this.fetchAndComparePasswords(global.USERNAME);
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.bgImage} source={imageBackground} />

        <View style={styles.form}>
          <FormTextInput
            ref={input => {
              this.secondTextInput = input;  
            }}
            value={this.state.password}
            onChangeText={this.handleOldPassword}
            placeholder={strings.OLDPASSWORD_PLACEHOLDER}
            secureTextEntry={true}
            onSubmitEditing={() => {
              this.thirdTextInput.focus();
            }} 
            returnKeyType="next"
          />

          <FormTextInput
            ref={input => {
              this.secondTextInput = input;  
            }}
            value={this.state.password}
            onChangeText={this.handleNewPassword}
            placeholder={strings.NEWPASSWORD_PLACEHOLDER}
            secureTextEntry={true}
            onSubmitEditing={() => {
              this.thirdTextInput.focus();
            }} 
            returnKeyType="next"
          />

          <FormTextInput
            ref={input => {
              this.secondTextInput = input;  
            }}
            value={this.state.password}
            onChangeText={this.handleConfirmNewPassword}
            placeholder={strings.CONFIRMNEWPASSWORD_PLACEHOLDER}
            secureTextEntry={true}
            onSubmitEditing={() => {
              this.thirdTextInput.focus();
            }} 
            returnKeyType="next"
          />

          <View style={styles.loginButtonSection}>
            <Button
              style={styles.loginButton}
              label={strings.CHANGEPASSWORD_PLACEHOLDER}
              onPress={this.handlePressChange}
            />
          </View>

          <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
          <Text style={styles.succMsg}>{this.state.succMsg}</Text>
        </View>

        <View style={styles.buttonLogoutSection}>
          <Button
          style={styles.buttonLogout}
          label="Logout"
          onPress={() => navigation.navigate("Login")}
          />
        </View>

          {this.state.loading && <Progress.CircleSnail style={styles.loading} size={100} thickness={5} color={[colors.BLUE, colors.GREEN2, colors.YELLOW]} />}

        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  errorMsg: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  succMsg: {
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
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

  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    opacity: 0.4
  },

  button: {
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

  buttonLogout: {
    backgroundColor: "#e31818",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19
  },

  buttonSection: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    marginBottom: "27%"
  },

  buttonLogoutSection: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    //  marginBottom: "5%"
  },

  form: {
    flex: 5,
    marginTop: "5%",
    marginLeft: "10%",
    width: "80%"
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlignVertical: "center"
  },

  card: {
    marginVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    opacity: 0.97,
    flex: 1,
    alignItems: "center"
  },

  FABContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  }, 

  loginButtonSection: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center"
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
});

export default SettingsScreen;
