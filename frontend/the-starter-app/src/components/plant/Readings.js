import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import PercentageCircle from "react-native-percentage-circle";
import colors from "../../config/colors";
import strings from "../../config/strings";
import Button from "../../components/Button";

class Readings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 0,
      humidity: 0,
    };
  }

  handleRefreshPress = () => {
      setTimeout(() => {
        fetch("http://" + global.SERVERIP + "/api/getSensor")
          .then(data => data.json())
          .then(res => {
            this.setState({ 
              temperature: res.data.temperature,
              humidity: res.data.humidity,
            });
          });
      }, 3000);
  }

  componentDidMount() {
    const temperature = this.props.data.temperature ? this.props.data.temperature : 0;
    const humidity = this.props.data.humidity ? this.props.data.humidity : 0;
    if(!temperature || !humidity) {
      this.handleRefreshPress();
    }
    else {
      this.setState({
        temperature: temperature,
        humidity: humidity,
      })
    }
  }

  render() {
    return (
      <View style={[styles.card, { padding: 20, paddingVertical: 30 }]}>
        <Text style={{ lineHeight: 15 }}>
          <Text style={{ fontWeight: "bold" }}>Temperature {"\n"}</Text>
        </Text>

        <View style={{ alignItems: "center" }}>
          <PercentageCircle radius={60} percent={this.state.temperature} color={"#F2988F"}>
            <Text style={{ fontSize: 20, color: "#F2988F" }}>{this.state.temperature}</Text>
            <Text style={{ fontSize: 12, color: "#999" }}>ºC</Text>
          </PercentageCircle>
          <Text style={{ paddingTop: 10 }}> {this.state.temperature}ºC</Text>
        </View>

        {/*<Progress.Bar height={9} color={colors.BLUE} progress={0.3} width={600} />*/}

        <Text style={{ marginTop: 40, lineHeight: 15 }}>
          <Text style={{ fontWeight: "bold" }}>Humidity {"\n"}</Text>
        </Text>

        <View style={{ alignItems: "center" }}>
          <PercentageCircle radius={60} percent={this.state.humidity} color={"#F2988F"}>
            <Text style={{ fontSize: 20, color: "#F2988F" }}>{this.state.humidity}</Text>
            <Text style={{ fontSize: 12, color: "#999" }}>RH</Text>
          </PercentageCircle>
          <Text style={{ paddingTop: 10 }}> {this.state.humidity}RH</Text>
        </View>

        <View style={styles.refreshButtonSection}>
            <Button
              style={styles.refreshButton}
              label={strings.REFRESH_PLACEHOLDER}
              onPress={this.handleRefreshPress}
            />
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  refreshButtonSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop:50,
    marginBottom:10
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

  refreshButton: {
    backgroundColor: colors.GREEN2,

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
 
  },
});

export default Readings;

 