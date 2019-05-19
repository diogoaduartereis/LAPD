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
      percent: 10
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${
      navigation.state.params && navigation.state.params.title
        ? navigation.state.params.title
        : "Plant"
    }`,
    headerTitleStyle: { textAlign: "center", alignSelf: "center" },
    headerStyle: {
      backgroundColor: "white"
    }
  });

  componentDidMount() {
    let self = this;
    this.intval = setInterval(() => {
      let s = this.state.percent % 100;
      s += 1;
      self.setState({
        percent: s
      });
    }, 1000 / 60);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require("../assets/images/background4.png")}
        />

        <ScrollableTabView
          tabBarActiveTextColor={colors.GREEN2}
          style={{ marginTop: 10 }}
          initialPage={0}
          tabBarUnderlineStyle={{ backgroundColor: colors.GREEN2, height: 3 }}
          renderTabBar={() => <DefaultTabBar />}
        >
          <View tabLabel="Status">
            <Status />
          </View>

          <View tabLabel="Readings">
            <Readings data={this.state.percent} />
          </View>

          <View tabLabel="Tips">
            <Tips />
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});

export default PlantScreen;
