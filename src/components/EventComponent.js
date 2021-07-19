import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Inputs from "./formElements/Inputs";

const EventComponent = (props) => {
  return (
    <View style={styles.eventContainer}>
      <View style={styles.header}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 15 }}
          source={{ uri: props.event.thumbnail_url }}
        ></Image>
        <Text style={styles.title}>{props.event.title}</Text>
      </View>
      <View style={styles.content}>
        <Inputs title="Type" info={props.event.eventType} />
        <Inputs title="Event Date" info={props.event.eventType} />
        <Inputs title="Event price" info={`${props.event.price} $`} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    width: "98%",
    flexDirection: "column",
    alignItems: "stretch",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#6e9aa1",
    backgroundColor: "rgba(256,256,256,0.5)",
    margin: 10,
  },
  header: {
    flexDirection: "row",
  },

  title: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EventComponent;
