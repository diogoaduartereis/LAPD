import * as React from "react";
import { StyleSheet, TextInput, View, TextInputProps } from "react-native";
import colors from "../config/colors";

type Props = TextInputProps;

class FormTextInput extends React.Component<Props> {

  textInputRef = React.createRef<TextInput>();

  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };


  render() {
    const { style, ...otherProps } = this.props;
    return (

      <View style={styles.inputContainer} >
        <TextInput
          ref={this.textInputRef}
          style={[styles.textInput, style]}
          selectionColor={colors.DODGER_BLUE}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {

    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});

export default FormTextInput;