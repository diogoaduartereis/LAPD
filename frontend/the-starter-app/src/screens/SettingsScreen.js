import * as React from "react";
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  View,
  Text
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import FormTextInput from "../components/FormTextInput";
import Button from "../components/Button";
import colors from "../config/colors";

class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  }

  handleNewPassword = newPassword => this.setState({ newPassword });
  handleNewPassword = confirmNewPassword => this.setState({ confirmNewPassword });

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

      <View style={styles.container}>
      <Image
      style={styles.bgImage}
      source={require("../assets/images/background4.png")}
      />

      <View style = {styles.form}>

      <FormTextInput
      placeholder="Old Password"
      returnKeyType="next"
      />

      <FormTextInput
      placeholder="New Password"
      returnKeyType="next"
      />

      <FormTextInput
      placeholder="Confirm New Password"
      returnKeyType="next"
      />

      </View>

      <View style={styles.buttonSection}>
      <Button
      //Verificar a password antiga
      //Se estiver correta verifica se as novas são iguais
      //Se estiver certo, pedir para substituir na db
      style={styles.button}
      label="Change Password"
      //onPress={this.handleAddPress}
      />

      </View>

      <View style={styles.buttonLogoutSection}>
      <Button
      //Verificar a password antiga
      //Se estiver correta verifica se as novas são iguais
      //Se estiver certo, pedir para substituir na db
      style={styles.buttonLogout}
      label="Logout"
      //onPress={this.handleAddPress}
      />
</View>
      </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginBottom: "5%"
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
  }
});

export default SettingsScreen;
