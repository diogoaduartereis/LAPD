import * as React from "react";
import {
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  View,
  Text
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import colors from "../config/colors";

class AddPlant extends React.Component {


//Estou com erro no super(props)
constructor(props) {
  super(props);
  this.state = {
    plantName: "",
    plantSpecie: "",
    plantPicture: "",
  };
  }

  handlePlantNameChange = username => this.setState({ plantName });
  handlePlantSpecie = password => this.setState({ plantSpecie });

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require("../assets/images/background4.png")}
        />
      </View>
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

export default AddPlant;
