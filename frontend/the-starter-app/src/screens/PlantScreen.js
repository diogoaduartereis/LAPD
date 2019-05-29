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

/*When add pressed go to AddPlant*/
  handleAddPress = () => {
    
  }

  getData(){
    setTimeout(() => {
      fetch("http://" + global.SERVERIP + "/api/getSensor")
      .then(data => data.json())
      .then(res => {
        this.setState({ data: res.data })
      });
    }, 3000)
  }

  componentDidMount(){
    this.getData();
  }

  render() {

    const data = this.state.data;
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require("../assets/images/background4.png")}
        />

        <ScrollableTabView
          tabBarActiveTextColor={colors.GREEN2}
          style={{ marginTop: 10 }}
          initialPage={1}
          tabBarUnderlineStyle={{ backgroundColor: colors.GREEN2, height: 3 }}
          renderTabBar={() => <DefaultTabBar />}
        >
          <View key={0} tabLabel="Status">
            <Status />
          </View>

          <View key={1} tabLabel="Readings">
            <Readings data={data} />
          </View>

          <View key={2} tabLabel="Tips">
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
