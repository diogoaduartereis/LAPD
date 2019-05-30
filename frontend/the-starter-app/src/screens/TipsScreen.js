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

              <View style = {styles.container}>
                <View style={styles.container}>
                  <Image
                    style={styles.bgImage}
                    source={require("../assets/images/background4.png")}
                  />
                </View>

                <FlatList
                  style={{ paddingTop: 20 }}
                  contentContainerStyle={{ paddingBottom: 50 }}
                  data={"Olá, sou a primeira cena"}
                  keyExtractor={this._keyExtractor}
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => navigation.navigate("Plant")
                      }
                      onLongPress={() =>
                        this._onLongPressButton(item._id, item.name)
                      }
                    >
                    <Text style={styles.item}>{item.name}</Text>
                    />
                    </TouchableOpacity>
                  )}
                  />

                </View>
/*
                <FlatList
                  style={{ paddingTop: 20 }}
                  contentContainerStyle={{ paddingBottom: 50 }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => navigation.navigate("Plant")}
                    >


                    </TouchableOpacity>
                  )}
                />

*/

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
