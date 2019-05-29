import * as React from "react";
import {
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  View,
} from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import { NavigationActions, StackActions } from "react-navigation";
import { ImagePicker, Permissions } from 'expo';
import colors from "../config/colors";
import imageBackground from "../assets/images/background4.png";
import placeholderImage from "../assets/images/uploadPlaceholder.png";

class AddPlantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plantName: "",
      plantSpecies: "",
      plantPicture: null,
      uploading: false,
    };
  }

  handlePlantNameChange = plantName => this.setState({ plantName });
  handlePlantSpecies = plantSpecies => this.setState({ plantSpecies });

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.bgImage} source={imageBackground} />

        <Image
          source={placeholderImage}
          style={styles.uploadImage}
        />

        <View style={styles.form}>
          <FormTextInput
            value={this.state.plantName}
            onChangeText={this.handlePlantNameChange}
            onSubmitEditing={this.handleUsernameSubmitPress}
            placeholder="Plant name or nickname"
            returnKeyType="next"
          />

          <FormTextInput
            ref={this.passwordInputRef}
            value={this.state.plantSpecies}
            onChangeText={this.handlePasswordChange}
            placeholder="Plant species"
            secureTextEntry
            returnKeyType="done"
          />

          <View style={styles.buttonSection}>
            <Button
              style={styles.button}
              label="Add plant"
              onPress={this.handleAddPress}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

async function takeAndUploadPhotoAsync() {
  // Display the camera to the user and wait for them to take a photo or to cancel
  // the action
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (result.cancelled) {
    return;
  }

  // ImagePicker saves the taken photo to disk and returns a local URI to it
  let localUri = result.uri;
  let filename = localUri.split('/').pop();

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  formData.append('photo', { uri: localUri, name: filename, type });

  return await fetch(YOUR_SERVER_URL, {
    method: 'POST',
    body: formData,
    header: {
      'content-type': 'multipart/form-data',
    },
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  form: {
    flex: 5,
    justifyContent: "center",
    width: "80%"
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

  buttonSection: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center"
  },

  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    opacity: 0.4
  },

  uploadImage: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    marginTop: 20 
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
  }
});

export default AddPlantScreen;
