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
      data: []
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
 
  getData(){
    setTimeout(() => {
      fetch("http://localhost:3001/api/getSensor")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
    }, 5000)
  }

  componentDidMount(){
    this.getData();
  }

  render() {

    const { data } = this.state;

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
            <Readings data={data} />
          </View>

          <View tabLabel="Tips">
            <Tips navigation ={this.props.navigation}/>
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
