import React, { useState } from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ActionButton from "react-native-action-button";
import { Ionicons as Icon } from "@expo/vector-icons";

import BackGroundImage from "../components/BackGroundImage";
import EventComponent from "../components/EventComponent";

const DashBoard = ({ navigation }) => {
  const [events, setEvents] = useState([
    {
      _id: "5fb4c4cfda6a860017aa0749",
      title: "running",
      description: "It is 5k running in Peshawar that is the ",
      price: 12,
      user: "60dfdb42583f550017d9f248",
      thumbnail: "temp",
      eventType: "running",
      date: "2020-11-18T06:53:03.812Z",
      __v: 0,
      thumbnail_url:
        "https://images.everydayhealth.com/images/last-minute-marathon-tips-722x406.jpg",
      id: "5fb4c4cfda6a860017aa0749",
    },
    {
      _id: "5fb4c4cfda6a860017aa0740",
      title: "running",
      description: "It is 5k running in Peshawar that is the ",
      price: 12,
      user: "60dfdb42583f550017d9f248",
      thumbnail: "temp",
      eventType: "running",
      date: "2020-11-18T06:53:03.812Z",
      __v: 0,
      thumbnail_url:
        "https://images.everydayhealth.com/images/last-minute-marathon-tips-722x406.jpg",
      id: "5fb4c4cfda6a860017aa0740",
    },
  ]);
  return (
    <BackGroundImage>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={events}
        keyExtractor={(event) => event.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Event Detail", { event: item })}
          >
            <EventComponent event={item} />
          </TouchableOpacity>
        )}
      />
      <ActionButton buttonColor="rgb(192,64,175)" offsetY={0} offsetX={0}>
        <ActionButton.Item
          buttonColor="rgb(192,64,175)"
          title="New Event"
          onPress={() => console.log("Create A new Event")}
        >
          <Icon name="ios-create" size={80} style={styles.action} />
        </ActionButton.Item>
      </ActionButton>
    </BackGroundImage>
  );
};

const styles = StyleSheet.create({
  flatList: {
    margin: 10,
    padding: 5,
  },
  action: {
    fontSize: 20,
    color: "white",
  },
});
export default DashBoard;
