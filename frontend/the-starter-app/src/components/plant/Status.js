import * as React from "react";
import { ScrollView, Image, StyleSheet, View, Text } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import Button from "../../components/Button";
import colors from "../../config/colors";
import * as Progress from 'react-native-progress';

class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: {},
      temperature: 0,
      humidity: 0,
      global: 'ok'
    };

    this.handleWaterPress =  this.handleWaterPress.bind(this);
  }

  componentWillMount() {
    this.setState({
      plant: this.props.plant,
    })

    fetch("http://" + global.SERVERIP + "/api/getSensor")
          .then(data => data.json())
          .then(res => {
            this.setState({ 
              temperature: res.data.temperature,
              humidity: res.data.humidity,
            });

            if(this.state.plant.plantMinTemperature && this.state.temperature!=0){
              if( this.state.plant.plantMinTemperature > this.state.temperature ){
                this.setState({ 
                  global: 'warning',
                });
              }
            }
          });
  }

  handleWaterPress() {
    this.setState({
      showLoading: true,
    })
    setTimeout(() => {
      fetch("http://" + global.SERVERIP + "/api/activatePump", {
        method: 'GET',
        headers: {
          username: global.USERNAME,
        },
      }).then(data => {
        if(data.status != 200 || data.status != 304) {
          alert('Successfully activated pump')
          this.setState({
            showLoading: false,
          })
        }
        else {
          alert('Couldn\'t Activate Pump')
          this.setState({
            showLoading: false,
          });
        }
      }).catch((error) => {
        console.log(error);
        this.setState({
          showLoading: false,
          refreshing: false,
        });
      });
    }, 10000)
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
            source={this.state.global=='ok'?require("../../assets/images/success.png"):require("../../assets/images/warning.png")}
            style={styles.icon}
          />
        </View>

        <View style={[styles.card, { alignItems: "center", margin: 20 }]}>
          
        {this.state.global!='ok'? 
        <Text style={{ lineHeight: 30 }}>
            <Text style={{ fontWeight: "bold" }}>Warning!{"\n"}</Text> 
            <Text > It looks like the plant needs to be watered! </Text> 
          </Text>
        : 
        
        <View style={{ paddingVertical:30}}><Text style={{ lineHeight: 30 }}> Everything seems fine! </Text></View>
        }
 

          {this.state.global!='ok'?   <Button 
            style={styles.waterButton} label="WATER THE PLANT" 
            onPress={this.handleWaterPress}
            /> : null}
       

         
          {this.state.loading && <Progress.CircleSnail style={styles.loading} size={100} thickness={5} color={[colors.BLUE, colors.GREEN2, colors.YELLOW]} />}
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
    shadowRadius: 6,
    marginVertical: 20
  },

  loading:{
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
});

export default Status;
