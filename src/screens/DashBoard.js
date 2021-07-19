import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/core";
import ActionButton from "react-native-action-button";
import { Ionicons as Icon } from "@expo/vector-icons";

import BackGroundImage from "../components/BackGroundImage";
import EventComponent from "../components/EventComponent";
import ModalComponent from "../components/ModalComponent";
import { useHttpClient } from "../services/BackEndAPI";
import { AuthContext } from "../contexts/AuthContext";
import AlertIndicator from "../components/formElements/AlertIndicator";

const DashBoard = ({ navigation }) => {
  const [modelIsVisible, setModelIsVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [isActiveIndicator, setIsActiveIndicator] = useState(false);
  const { sendRequest } = useHttpClient();
  const authContext = useContext(AuthContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    const getAllEvent = async () => {
      setIsActiveIndicator(true);
      const response = await sendRequest("events");
      if (response.status === 200) {
        const responseDate = await response.json();
        console.log(responseDate);
        setEvents(responseDate);
      }
      setIsActiveIndicator(false);
      //  console.log(response);
    };

    getAllEvent();
  }, [sendRequest, modelIsVisible, isFocused]);
  return (
    <BackGroundImage>
      {isActiveIndicator && (
        <AlertIndicator isActiveIndicator={isActiveIndicator} />
      )}
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
      {modelIsVisible && (
        <ModalComponent
          modalVisible={modelIsVisible}
          onCloseModal={() => setModelIsVisible(!modelIsVisible)}
        />
      )}
      {authContext.isLogin && (
        <ActionButton buttonColor="rgb(192,64,175)" offsetY={0} offsetX={0}>
          <ActionButton.Item
            buttonColor="rgb(192,64,175)"
            title="New Event"
            onPress={() => setModelIsVisible(true)}
          >
            <Icon name="ios-create" size={80} style={styles.action} />
          </ActionButton.Item>
        </ActionButton>
      )}
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
