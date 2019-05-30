import React, { Component } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity
} from "react-native";

class TipsScreen extends React.Component {
  render() {
    const plant = this.props.navigation.state.params.plant;

    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require("../assets/images/background4.png")}
        />

        <View style={[styles.card, { padding: 20, paddingVertical: 30 }]}>
          <Text
            style={{
              marginBottom: 20,
              lineHeight: 30,
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            Some facts about {plant.species} specie
          </Text>

          <Text style={{ lineHeight: 40, fontSize: 14 }}>
            {plant.plantMinTemperature ? (
              <Text>
                Minimum temperature: {plant.plantMinTemperature}
                {"\n"}
              </Text>
            ) : null}

            {plant.plantShadeTolerance ? (
              <Text>
                Shade tolerance: {plant.plantShadeTolerance}
                {"\n"}
              </Text>
            ) : null}

            {plant.plantPrecipitationMax ? (
              <Text>
                Minimum precipitation: {plant.plantPrecipitationMax}
                {"\n"}
              </Text>
            ) : null}

            {plant.plantPrecipitationMin ? (
              <Text>
                Maximum precipitation: {plant.plantPrecipitationMin}
                {"\n"}
              </Text>
            ) : null}
          </Text>
        </View>
      </View>
    );
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
  }
});

export default TipsScreen;
