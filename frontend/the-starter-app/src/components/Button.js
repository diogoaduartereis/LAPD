import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

class Button extends React.Component {
  render() {
    const { label, onPress, style } = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "50%",
    borderRadius: 30,
    backgroundColor: "transparent"
  },

  text: {
    color: colors.WHITE,
    textAlign: "center",
    height: 20
  }
});

export default Button;
