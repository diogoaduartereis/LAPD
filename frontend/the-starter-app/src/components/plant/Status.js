import * as React from "react";
import { ScrollView, Image, StyleSheet, View, Text } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import Button from "../../components/Button";
import colors from "../../config/colors";

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: {}
    };
  }

  componentWillMount() {
    this.setState({
      plant: this.props.plant,
    })
  }

  handleWaterPress() {
    
  }

  render() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{
            uri:
              this.state.plant.photoPath
          }}
          style={{
            marginTop: 40,
            width: 230,
            height: 230,
            borderRadius: 230 / 2
          }}
        />

        <View style={{ position: "absolute", top: 45, right: 240 }}>
          <Image
            source={require("../../assets/images/warning.png")}
            style={styles.icon}
          />
        </View>

        <View style={[styles.card, { alignItems: "center", margin: 20 }]}>
          <Text style={{ lineHeight: 30 }}>
            <Text style={{ fontWeight: "bold" }}>Warning!{"\n"}</Text>
            It looks like the plant needs to be watered! 
          </Text>

          <Button 
            style={styles.waterButton} label="WATER THE PLANT" 
            onPress={this.handleWaterPress}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    width: 55,
    height: 55,
    marginRight: 10
  },

  waterButton: {
    backgroundColor: colors.YELLOW,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginVertical: 20
  }
});

export default Status;
