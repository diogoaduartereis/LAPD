import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import PercentageCircle from "react-native-percentage-circle";

class Readings extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <View style={[styles.card, { padding: 20, paddingVertical: 30 }]}>
        <Text style={{ lineHeight: 15 }}>
          <Text style={{ fontWeight: "bold" }}>Temperature {"\n"}</Text>
        </Text>

        <View style={{ alignItems: "center" }}>
          <PercentageCircle radius={60} percent={data} color={"#F2988F"}>
            <Text style={{ fontSize: 20, color: "#F2988F" }}>{data}</Text>
            <Text style={{ fontSize: 12, color: "#999" }}>ºC</Text>
          </PercentageCircle>
          <Text style={{ paddingTop: 10 }}> {data}ºC</Text>
        </View>

        {/*<Progress.Bar height={9} color={colors.BLUE} progress={0.3} width={600} />*/}

        <Text style={{ marginTop: 40, lineHeight: 15 }}>
          <Text style={{ fontWeight: "bold" }}>Humidity {"\n"}</Text>
        </Text>

        <View style={{ alignItems: "center" }}>
          <PercentageCircle radius={60} percent={data} color={"#F2988F"}>
            <Text style={{ fontSize: 20, color: "#F2988F" }}>{data}</Text>
            <Text style={{ fontSize: 12, color: "#999" }}>RH</Text>
          </PercentageCircle>
          <Text style={{ paddingTop: 10 }}> {data}RH</Text>
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
  }
});

export default Readings;
