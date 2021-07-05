import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import BackGroundImage from "../components/BackGroundImage";
import Inputs from "../components/formElements/Inputs";

const EventScreen = ({ navigation, route }) => {
  const { event } = route.params;
  return (
    <BackGroundImage>
      <View style={styles.eventScreenContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Image style={styles.image} source={{ uri: event.thumbnail_url }} />

        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Inputs title="Type" info={event.eventType} />
              <Inputs title="Event Date" info={event.eventType} />
              <Inputs title="Event price" info={`${event.price} $`} />
            </View>
            <View style={styles.register}>
              <TouchableOpacity onPress={() => console.log("YOu press ")}>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Description </Text>
            <Text>{event.description}</Text>
          </View>
        </View>
      </View>
    </BackGroundImage>
  );
};

const styles = StyleSheet.create({
  eventScreenContainer: {
    margin: 10,
    padding: 5,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#6e9aa1",
    backgroundColor: "rgba(256,256,256,0.5)",
  },
  image: {
    width: "100%",
    height: "60%",
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    margin: 10,
    padding: 5,
  },
  content: {
    marginHorizontal: 20,
    padding: 3,
    flexDirection: "row",
  },
  register: {
    flex: 1,
    borderWidth: 2,
    borderColor: "rgb(192,64,175)",
    backgroundColor: "rgba(192,64,175,0.6)",
    borderRadius: 30,
    margin: 5,
  },
  registerText: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 5,
  },
});

export default EventScreen;
