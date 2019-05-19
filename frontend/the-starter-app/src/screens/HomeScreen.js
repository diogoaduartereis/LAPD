import * as React from "react";
import {
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  View,
  Text
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require("../assets/images/background4.png")}
        />

        <FlatList
          style={{ paddingTop: 20 }}
          contentContainerStyle={{ paddingBottom: 50 }}
          data={[
            {
              key: "Ficus Benjamina",
              src:
                "https://mashtalegypt.com/wp-content/uploads/2017/05/update-1.png"
            },
            {
              key: "Spathiphyllum Wallisii",
              src:
                "https://images-na.ssl-images-amazon.com/images/I/411sdVaQHYL._SY355_.jpg"
            },
            {
              key: "Epipremnum Aureum",
              src:
                "https://cdn.shopify.com/s/files/1/1706/1307/products/Epipremnum-aureum-Golden-Pothos-40cm_600x.jpg?v=1552147263"
            },
            {
              key: "Ficus Pumila",
              src:
                "https://smhttp-ssl-52271.nexcesscdn.net/media/catalog/product/f/i/ficus_pumila_variegata_creeping_fig_josh_s_frogs_-_068.jpg"
            }
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                this.props.navigation.navigate("Plant", { title: item.key })
              }
            >
              <Text style={styles.item}>{item.key}</Text>

              <Image
                style={{
                  width: 55,
                  height: 55,
                  margin: 10
                }}
                source={{ uri: item.src }}
              />
            </TouchableOpacity>
          )}
        />

        <View
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            alignSelf: "flex-end"
          }}
        >
          <Image
            source={require("../assets/images/add_.png")}
            style={{
              width: 55,
              height: 55
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});

export default HomeScreen;
