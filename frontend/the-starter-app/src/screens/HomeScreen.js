import * as React from "react";
import {
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  Alert
} from "react-native";
import * as Progress from 'react-native-progress';
import colors from "../config/colors";

global.USERNAME = '';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      msg: "",
      plants: [],
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

  deletePlant(_id) {
    this.setState({
      showLoading: true,
    })
    setTimeout(() => {
      fetch("http://" + global.SERVERIP + "/api/deletePlant", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: _id,
        }),
      })
      .then(data => {
        if(data.status == 200) {
          this.fetchPlants();
        }
        else {
          alert("Failed to delete plant");
        }
      }).catch(error => {
        console.log(error);
      });
    }, 3000)
  }

  _onLongPressButton(_id, name) {
    Alert.alert(
      'Delete ' + name,
      'Are you sure you want to delete this plant?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deletePlant(_id)},
      ],
      {cancelable: false},
    );
  }

  fetchPlants() {
    setTimeout(() => {
      fetch("http://" + global.SERVERIP + "/api/myPlants", {
        method: 'GET',
        headers: {
          username: global.USERNAME,
        },
      }).then(data => {
        if(data.status != 200) {
          this.setState({
            msg: "You currently don't have any plants.",
            showLoading: false,
            refreshing: false,
          })
        }
        else {
          this.setState({
            plants: JSON.parse(data._bodyText),
            showLoading: false,
            refreshing: false,
          });
        }
      }).catch((error) => {
        console.log(error);
        this.setState({
          showLoading: false,
          refreshing: false,
        });
      });
    }, 3000)
  }

  componentWillMount() {
    this.setState({ showLoading: true });
    let username = this.props.navigation.state.params.username;
    this.setState({username: username});
    global.USERNAME = username;
    this.fetchPlants();
  }

  render() {
    if (this.state.showLoading === true) {
      return (

          <View style={styles.loadingContainer}>
              <Image
                  style={styles.bgImage}
                  source={require("../assets/images/background4.png")} />

              <View style={{ marginTop: 200 }}>
                  <Progress.CircleSnail size={100} color={[colors.BLUE, colors.GREEN2, colors.YELLOW]} />
              </View>
          </View>
      )
  } else {
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
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  this.props.navigation.navigate("Plant", { title:item.name, plant: item })
                }
                onLongPress={() =>
                  this._onLongPressButton(item._id, item.name)
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
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center"
  },

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
