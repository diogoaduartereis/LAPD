import * as React from "react";
import { Image, StyleSheet, View, Text, Platform } from "react-native";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import colors from "../config/colors";
import Readings from "../components/plant/Readings";
import Status from "../components/plant/Status";
import Tips from "../components/plant/Tips";
import Button from "../components/Button";
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import strings from "../config/strings";

const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={23} color="blue" />
);


class PlantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      plant: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title:  navigation.state.params.title,
      headerRight: (
        <Button 
          style={styles.settingsButton}
          label={strings.SETTINGS_PLACEHOLDER}
          onPress={() => params.handleSettingsPress()}
        /> 
      ),
      headerStyle: {
        backgroundColor: "white"
      },
    }
  };

  getData() {
    setTimeout(() => {
      fetch("http://" + global.SERVERIP + "/api/getSensor")
        .then(data => data.json())
        .then(res => {
          this.setState({ data: res.data });
        });
    }, 3000);
  }

  componentWillMount() {
    let plant = this.props.navigation.state.params.plant;
    let photoPath = this.processPhotoPath(plant.photoPath);
    if(photoPath === null) photoPath = "https://mashtalegypt.com/wp-content/uploads/2017/05/update-1.png"
    plant.photoPath = photoPath;
    this.setState({
      plant: plant,
    })
    this.props.navigation.setParams({handleSettingsPress: this.handleSettingsPress.bind(this)});
    this.getData();
    
  }

  processPhotoPath(uripath){
    if(uripath.includes("backend/uploads")){
      let parts = uripath.split("/")
      if(!parts[parts.length-1].includes("jpg"))
        return "http://"+global.SERVERIP+"/"+parts[parts.length-1]+".jpg"
      return "http://"+global.SERVERIP+"/"+parts[parts.length-1]
    }
    return uripath
  }

  handleSettingsPress() {
    this.props.navigation.navigate("Settings");
  }

  render() {
    const data = this.state.data;
    return (
      <ScrollableTabView
        initialPage={0}
        style={{marginTop:10}}
        tabBarUnderlineStyle={{ backgroundColor: colors.GREEN2, height: 3 }}
        renderTabBar={() => <DefaultTabBar />}
      >
        <View style={styles.container} tabLabel="Status">
          <Image
            style={styles.bgImage}
            source={require("../assets/images/background4.png")}
          />
          <Status plant={this.state.plant} />
        </View>
        <View tabLabel="Readings" style={styles.container}>
          <Image
            style={styles.bgImage}
            source={require("../assets/images/background4.png")}
          />
          <Readings data={data} />
        </View>
        <View tabLabel="Tips" style={styles.container}>
          <Image
            style={styles.bgImage}
            source={require("../assets/images/background4.png")}
          />
          <Tips navigation={this.props.navigation} />
        </View>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    opacity: 0.4
  },

  settingsButton: {
    backgroundColor: colors.GREEN,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginVertical: 20,
    width: 90,
  },
});

export default PlantScreen;
