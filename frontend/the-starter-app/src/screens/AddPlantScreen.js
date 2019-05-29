import * as React from "react";
import {
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import { NavigationActions, StackActions } from "react-navigation";
import { ImagePicker, Permissions } from 'expo';
import colors from "../config/colors";
import imageBackground from "../assets/images/background4.png";
import placeholderImage from "../assets/images/uploadPlaceholder.png";
import { Ionicons } from '@expo/vector-icons';

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
  handlePlantSpeciesChange = plantSpecies => this.setState({ plantSpecies });

  render() {
    let {
      plantPicture
    } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.bgImage} source={imageBackground} />

        <TouchableOpacity activeOpacity={.5} onPress={this._takePhoto}>
          {this._maybeRenderImage()}
        </TouchableOpacity>

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
            onChangeText={this.handlePlantSpeciesChange}
            placeholder="Plant species"
            secureTextEntry
            returnKeyType="done"
          />
          <Button
            icon={
              <Ionicons
                name="md-search"
                size={15}
                color="white"
              />
            }
            iconRight
            style={styles.button}
            label="Search species"
            onPress={this.searchPlantsAPI}
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

  searchPlantsAPI = async () => {
    setTimeout(() => {
      fetch("https://trefle.io//api/plants", {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+ TVN0UVB5Vml3TitoL0JMRUdUVFQ5QT09, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
      .then(data => {
        console.log(data);
        if(data.status != 200) {
          this.setState({
            errorMsg: data._bodyText
          })
        }
        else {
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
            console.log(error);
          });
        }, 3000)
  }

  _takePhoto = async () => {
    console.log("inside take photo");
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _maybeRenderImage = () => {
    let {
      plantPicture
    } = this.state;

    if (!plantPicture) {
      return (<Image
        source={placeholderImage}
        style={styles.uploadImage}
      />);
    }

    return (
      <Image
        source={{ uri: plantPicture }}
        style={styles.uploadImage}
      />
    );
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();

        this.setState({
          plantPicture: uploadResult.location
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
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
});

export default AddPlantScreen;
