import * as React from "react";

import { Image, StyleSheet, View, Text } from "react-native";
import Button from "../../components/Button";
import colors from "../../config/colors";

class Tips extends React.Component {
  render() {
    return (
      <View style={[styles.card, { padding: 20, paddingVertical: 30 }]}>
        <Text style={{ fontWeight: "bold", lineHeight: 15 }}>Weather</Text>

        <View style={styles.tip_card}>
          <Image
            source={require("../../assets/images/cloud.png")}
            style={styles.icon}
          />

          <Text style={styles.tipText}>
            This plant prefers full sun but will adapt to partial shade.
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Button
            style={[styles.waterButton, { backgroundColor: colors.BLUE }]}
            label="KNOW MORE"
          />
        </View>

        <View style={[styles.line, {marginBottom:30}]} />

        <Text style={{ fontWeight: "bold", lineHeight: 15 }}>Plant Tip</Text>

        <View style={styles.tip_card}>
          <Image
            source={require("../../assets/images/idea.png")}
            style={styles.icon}
          />

          <Text style={styles.tipText}>
            According to the weather, tomorow there will be an excelent
            humidity.
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Button
            style={[styles.waterButton, { backgroundColor: colors.YELLOW }]}
            label="KNOW MORE"
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

  tip_card: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1
  },

  tipText: {
    lineHeight: 20,
    flex: 1,
    flexWrap: "wrap",
    padding: 5
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
  },

  icon: {
    width: 55,
    height: 55,
    marginRight: 10
  },

  line: {
    borderBottomColor: "#b7babd",
    borderBottomWidth: 0.6,
    alignSelf: "stretch",
    width: "100%",
    marginVertical: 20,
  }
});

export default Tips;
