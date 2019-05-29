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

global.USERNAME = '';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      msg: "",
      plants: [],
    };
  }

  _keyExtractor = (item, index) => item._id;

  componentDidMount() {
    let username = this.props.navigation.state.params.username;
    this.setState({username: username});
    global.USERNAME = username;
    setTimeout(() => {
      fetch("http://" + global.SERVERIP + "/api/myPlants", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
        }),
      }).then(data => {
        if(data.status != 200) {
          this.setState({
            msg: "You currently don't have any plants."
          })
        }
        else {
          this.setState({
            plants: JSON.parse(data._bodyText),
          });
        }
      });
    }, 3000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require("../assets/images/background4.png")}
        />

        <FlatList
          style={{ paddingTop: 20 }}
          contentContainerStyle={{ paddingBottom: 50 }}
          data={this.state.plants}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                this.props.navigation.navigate("Plant", { plant: item })
              }
            >
              <Text style={styles.item}>{item.name}</Text>

              <Image
                style={{
                  width: 55,
                  height: 55,
                  margin: 10
                }}
                source={{ uri: item.photoPath }}
              />
            </TouchableOpacity>
          )}
        />

        <View style={styles.FABontainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate("AddPlant")}
            style={styles.TouchableOpacityStyle}>
            <Image
              source={require('../assets/images/add_.png')}
              style={styles.FloatingButtonStyle}
            />
          </TouchableOpacity>
        </View>
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
  },

  FABContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  }
});

export default HomeScreen;
