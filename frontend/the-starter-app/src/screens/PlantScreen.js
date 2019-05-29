import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import colors from "../config/colors";
import Readings from "../components/plant/Readings";
import Status from "../components/plant/Status";
import Tips from "../components/plant/Tips";


class PlantScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${
      navigation.state.params && navigation.state.params.title
        ? navigation.state.params.title
        : "Plant"
    }`,
    headerStyle: {
      backgroundColor: "white"
    },
  });

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
    this.getData();
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
  }
});

export default PlantScreen;
