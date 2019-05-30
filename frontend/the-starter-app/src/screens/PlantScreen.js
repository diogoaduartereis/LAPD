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
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title:  navigation.state.params.title,
      headerRight: (
        <Ionicons 
          name={Platform.OS === "ios" ? "ios-notifications" : "md-notifications"}
          size={25}
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
    this.props.navigation.setParams({handleSettingsPress: this.handleSettingsPress.bind(this)});
    this.getData();
  }

  handleSettingsPress() {
    
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
          <Status />
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

  settings: {
    color:"white",
    fontWeight: "bold",
  }
});

export default PlantScreen;
