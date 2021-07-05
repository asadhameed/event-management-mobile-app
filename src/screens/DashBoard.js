import React, { useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";

import BackGroundImage from "../components/BackGroundImage";
import EventComponent from "../components/EventComponent";

const DashBoard = ({ navigation }) => {
  const [events, setEvents] = useState([
    {
      _id: "5fb4c4cfda6a860017aa0749",
      title: "running",
      description: "It is 5k running in Peshawar that is the ",
      price: 12,
      user: "5fb4c475da6a860017aa0748",
      thumbnail: "temp",
      eventType: "running",
      date: "2020-11-18T06:53:03.812Z",
      __v: 0,
      thumbnail_url:
        "https://images.everydayhealth.com/images/last-minute-marathon-tips-722x406.jpg",
      id: "5fb4c4cfda6a860017aa0749",
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
    </BackGroundImage>
  );
};

const styles = StyleSheet.create({
  flatList: {
    margin: 10,
    padding: 5,
  },
});
export default DashBoard;
