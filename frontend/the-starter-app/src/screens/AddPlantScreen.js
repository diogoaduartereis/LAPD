import * as React from "react";
import {
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity, 
  FlatList,
  Text
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
      plantMinTemperature:0,
      plantShadeTolerance:"",
      plantPrecipitationMax:0,
      plantPrecipitationMin:0,
      plantSpecies: "",
      plantSpeciesQuery: "",
      plantCommonName:"",
      plantPicture: null,
      plantPicLocation: null,
      uploading: false,
      plantList: [],
    };
  }

  handlePlantNameChange = plantName => this.setState({ plantName });
  handlePlantSpeciesChange = plantSpeciesQuery => this.setState({ plantSpeciesQuery });
  handlePlantList = plantList => this.setState({plantList:plantList});
  handlePlantData = plantData => {
    const {temperature_minimum, shade_tolerance, precipitation_minimum, precipitation_maximum} = plantData.main_species.growth
    let temperature_minimum_deg = null
    let precipitation_maximum_val = null
    let precipitation_minimum_val = null
    if(temperature_minimum)
      temperature_minimum_deg = temperature_minimum.deg_c
    if(precipitation_maximum)
      precipitation_maximum_val = precipitation_maximum.cm
    if(precipitation_minimum)
      precipitation_minimum_val = precipitation_minimum.cm
    this.setState({
      plantMinTemperature:temperature_minimum_deg,
      plantShadeTolerance:shade_tolerance,
      plantPrecipitationMax:precipitation_maximum_val,
      plantPrecipitationMin:precipitation_minimum_val,
      plantCommonName:plantData.common_name,
      plantSpecies:plantData.scientific_name ? plantData.scientific_name : "unknown"
    })
  }

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
            value={this.state.plantSpeciesQuery}
            onChangeText={this.handlePlantSpeciesChange}
            placeholder="Plant species"
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
          <View>    
            <FlatList
              style = {styles.plantListContainer}
              data={this.state.plantList}
              renderItem={({item,i}) => (
              <TouchableOpacity key={i} onPress={()=>this.searchPlant(item.id)} >
                <Text style={styles.plant} >{item.common_name ? item.common_name + " - " + item.scientific_name : item.scientific_name}</Text>
              </TouchableOpacity>
              )}
              />
          </View>
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

  handleAddPress = () => {
    fetch("http://" + global.SERVERIP + "/api/addPlant", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username:global.USERNAME ? global.USERNAME : "admin",
        name:this.state.plantName,
        species:this.state.plantSpecies,
        photoPath:this.state.plantPicLocation,
        plantPrecipitationMax:this.state.plantPrecipitationMax,
        plantPrecipitationMin:this.state.plantPrecipitationMin,
        plantShadeTolerance:this.state.plantShadeTolerance,
        plantMinTemperature:this.state.plantMinTemperature
      }),
    })
    .then(data => {
      if(data.status != 200) {
        this.setState({
          errorMsg: data._bodyText,
        })
      }
      return data.text()
    })
    .then(res => {
      console.log(res)
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "Home",
              params: { username: global.USERNAME ? global.USERNAME : "admin" }
            })
          ]
        })
      );
    })
  }

  searchPlant = (plantID) => {
    fetch("https://trefle.io/api/plants/"+plantID, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+ 'TVN0UVB5Vml3TitoL0JMRUdUVFQ5QT09', 
        'Content-Type': 'application/json',
      }
    })
    .then(data => {
      if(data.status != 200) {
        this.setState({
          errorMsg: data._bodyText
        })
      }
      return data.json()
    })
    .then(json => {
      this.handlePlantData(json)
    })
    .catch(error => {
      console.log(error);
    })
  }

  searchPlantsAPI = () => {
      fetch("https://trefle.io/api/plants?q="+this.state.plantSpeciesQuery, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+ 'TVN0UVB5Vml3TitoL0JMRUdUVFQ5QT09', 
          'Content-Type': 'application/json',
        }
      })
      .then(data => {
        if(data.status != 200) {
          this.setState({
            errorMsg: data._bodyText
          })
        }
        return data.json()
      })
      .then(json => {
        this.handlePlantList(json)
      })
      .catch(error => {
        console.log(error);
      })
  }

  _takePhoto = async () => {
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
      this.setState({
        plantPicture: pickerResult.uri
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

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({plantPicLocation:uploadResult.path})
      }
    } catch (e) {
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = "http://" + global.SERVERIP + "/api/uploadPlantImage";

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('file',{
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
    flex: 2,
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
    height: "10%",
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

  plantListContainer: {
    height: "30%",
    paddingTop: 22,
    marginBottom: 22
  },

  plant: {
    padding: 5,
    fontSize: 12,
    height: 49,
  },
});

export default AddPlantScreen;
