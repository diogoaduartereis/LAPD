import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Image, ScrollView, Linking } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import colors from "../config/colors";
import Moment from 'moment';
import Button from "../components/Button";

class WeatherScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            forecast: [],
            showLoading: false
        };
    }

    componentWillMount() {
        this.setState({ showLoading: true });
    }

    componentDidMount() {

        // Get the user's location
        this.getLocation();
    }

    getLocation() {

        // Get the current position of the user
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState(
                    (prevState) => ({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }), () => { this.getWeather(); }
                );
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    getWeather() {

        // Construct the API url to call
        let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=0c897a3f52b79390b136a9a2e1e36921&cnt=5';

        // Call the API, and set the state of the weather forecast
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState((prevState, props) => ({
                    forecast: data,
                    showLoading: false
                }));
            }).catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
    }

    render() {

        if (this.state.showLoading === true) {
            return (

                <View style={styles.container}>
                    <Image
                        style={styles.bgImage}
                        source={require("../assets/images/background4.png")} />

                    <View style={{ marginTop: 200 }}>
                        <Progress.CircleSnail size={100} color={[colors.BLUE, colors.GREEN2, colors.YELLOW]} />
                    </View>
                </View>
            )
        } else {

            let firstElement = this.state.forecast.list[0];

            console.log(firstElement);

            return (

                <ScrollView >
                    <View style={styles.container}>
                        <Image
                            style={styles.bgImage}
                            source={require("../assets/images/background4.png")} />


                        <View style={{ alignItems: "center" }}>
                            <Image
                                source={{
                                    uri:
                                        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2000px-Solid_white.svg.png"
                                }}
                                style={{
                                    marginTop: 50,
                                    width: 150,
                                    height: 150,
                                    borderRadius: 150 / 2
                                }}
                            />

                            <View style={{ alignItems: "center", position: "absolute" }}>
                                <Image
                                    source={{ uri: "https://openweathermap.org/img/w/" + firstElement.weather[0].icon + ".png" }}
                                    style={{ width: 150, height: 150, left: 50 }}
                                />
                                <Text style={{ fontSize: 20, fontWeight: "bold", bottom: 40 }}>{firstElement.main.temp} K</Text>
                                <Text style={{ fontSize: 15, bottom: 20 }}>{firstElement.weather[0].description}</Text>

                            </View>
                        </View>

                        <View style={[styles.card, { padding: 20, paddingVertical: 30, marginTop: 20 }]}>

                            <Text style={{ lineHeight: 30 }}>
                                <Text style={{ fontWeight: "bold" }}>Location: </Text>
                                {this.state.forecast.city.name} {"\n"}
                            </Text>

                            <View style={{ alignItems: "center", alignContent: "center" }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',

                                }}>
                                    <View style={styles.iconWeather} >
                                        <Image
                                            source={require("../assets/images/humidity.png")}
                                            style={styles.icon}
                                        />

                                        <Text>{firstElement.main.humidity}%</Text>
                                    </View>


                                    <View style={styles.iconWeather} >
                                        <Image
                                            source={require("../assets/images/drops.png")}
                                            style={styles.icon}
                                        />

                                        <Text>{firstElement.rain ? firstElement.rain['3h'] : 0} mm</Text>
                                    </View>
                                    <View style={{ alignItems: "center", alignContent: "center", width: 100, height: 70 }} >
                                        <Image
                                            source={require("../assets/images/wind.png")}
                                            style={styles.icon}
                                        />
                                        <Text>{firstElement.wind.speed} m/s</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.line, { paddingTop: 10 }]} />

                            <FlatList data={this.state.forecast.list.slice(1)} keyExtractor={item => item.dt_txt} renderItem={({ item, index }) =>

                                <View style={{ paddingRight: 15 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Image style={{ width: 75, height: 75 }} source={{ uri: "https://openweathermap.org/img/w/" + item.weather[0].icon + ".png" }} />
                                        <Text> {Moment(item.dt_txt).calendar()}</Text>
                                        <Text> {item.main.temp} K</Text>

                                    </View>
                                    <Divider style={{ backgroundColor: '#dfe6e9', marginVertical: 10 }} />
                                </View>
                            } />
                            <View style={{ alignItems: "center", alignContent: "center" }}>
                                <Button onPress={() => Linking.openURL("https://openweathermap.org/city")} style={styles.waterButton} label="EXTENDED FORECAST" />
                            </View>
                        </View>
                    </View>
                </ScrollView>

            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },

    iconWeather: {
        alignItems: "center",
        alignContent: "center",
        width: 100,
        height: 70,
        borderRightWidth: 1,
        borderRightColor: '#b7babd'
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

    line: {
        borderBottomColor: "#b7babd",
        borderBottomWidth: 0.6,
        alignSelf: "stretch",
        width: "100%",
        marginVertical: 20,
    },
    icon: {
        width: 30,
        height: 30,
        marginBottom: 10
    },

    waterButton: {
        backgroundColor: "#57A384",
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

export default WeatherScreen;
