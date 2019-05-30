import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import colors from "../config/colors";
import Button from "../components/Button";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";

class TipsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      refreshing: false,
    };
  }

  _keyExtractor = (item, index) => item._id;

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.fetchPlants();
    })
  }

  componentWillMount() {
    this.setState({ showLoading: true });
  }

  render() {
    const { navigation } = this.props;
    return (

      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            style={styles.bgImage}
            source={require("../assets/images/background4.png")}
          />
        </View>

      <Text> "Minimum Temperature : 20 °C" </Text>
      <Text> "Shade Tolerance : Medium" </Text>
      <Text> "Maximum Precipitation : 32 cm" </Text>
      <Text> "Minimum Precipitation : 97 cm" </Text>

      </View>

    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  card: {
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 15,
    width: "100%",
    borderColor: "#DADADA",
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7
  },

  icon: {
    width: 30,
    height: 30,
    marginBottom: 10
  },
});


export default TipsScreen;
