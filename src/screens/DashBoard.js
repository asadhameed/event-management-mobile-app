import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useIsFocused } from "@react-navigation/core";
import ActionButton from "react-native-action-button";
import {
  Ionicons as Icon,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

import BackGroundImage from "../components/BackGroundImage";
import EventComponent from "../components/EventComponent";
import ModalComponent from "../components/ModalComponent";
import { useHttpClient } from "../services/BackEndAPI";
import { AuthContext } from "../contexts/AuthContext";
import { EventContext } from "../contexts/EventContext";
import AlertIndicator from "../components/formElements/AlertIndicator";
import globalStyle from "../constant/stylesSheet";
import { EVENT_SCREEN } from "../StringOfApp";

const DashBoard = ({ navigation }) => {
  const [modelIsVisible, setModelIsVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [isActiveIndicator, setIsActiveIndicator] = useState(false);
  const { sendRequest } = useHttpClient();
  const { isLogin, token } = useContext(AuthContext);
  const eventContext = useContext(EventContext);
  const isFocused = useIsFocused();

  const getAllEvent = async (query = "") => {
    setIsActiveIndicator(true);
    const response = await sendRequest(`events/${query}`);
    if (response.status === 200) {
      const responseDate = await response.json();

      setEvents(responseDate);
    }
    setIsActiveIndicator(false);
  };

  const getEventByUser = async () => {
    setIsActiveIndicator(true);
    const headers = { "x-auth-token": token };
    const response = await sendRequest("event/byuser/", "GET", headers);
    if (response.status === 200) {
      const responseDate = await response.json();

      setEvents(responseDate);
    }
    setIsActiveIndicator(false);
  };
  useEffect(() => {
    getAllEvent();
  }, [modelIsVisible, isFocused]);

  useEffect(() => {
    if (isLogin) {
      const headers = { "x-auth-token": token };
      eventContext.getSubscribedEventsOfUser(headers);
    }
  }, [isLogin, navigation, isFocused]);
  //console.log("-------->subscribedEvent", eventContext.subscribedEvent);
  const headerView = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => getAllEvent()}>
          <Text style={styles.eventTypeButton}>
            <FontAwesome5 name="atom" size={30} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => getAllEvent("running")}
        >
          <Text style={styles.eventTypeButton}>
            <FontAwesome5 name="running" size={25} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => getAllEvent("walking")}
        >
          <Text style={styles.eventTypeButton}>
            <FontAwesome5 name="walking" size={25} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => getAllEvent("swimming")}
        >
          <Text style={styles.eventTypeButton}>
            <FontAwesome5 name="swimmer" size={25} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => getAllEvent("cycling")}
        >
          <Text style={styles.eventTypeButton}>
            <FontAwesome5 name="biking" size={25} />
          </Text>
        </TouchableOpacity>

        {isLogin && (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => getEventByUser()}
          >
            <Text style={styles.eventTypeButton}>
              <FontAwesome name="openid" size={24} />
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderEvents = () => {
    return events.length > 0 ? (
      <FlatList
        //   numColumns={2}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={events}
        keyExtractor={(event) => event.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(EVENT_SCREEN, { event: item })}
          >
            <EventComponent event={item} />
          </TouchableOpacity>
        )}
      />
    ) : (
      <Text style={globalStyle.notFoundTextStyle}>
        There isn't define a event.
      </Text>
    );
  };

  return (
    <BackGroundImage imageBackground={{ justifyContent: "flex-start" }}>
      {headerView()}
      {isActiveIndicator && (
        <AlertIndicator isActiveIndicator={isActiveIndicator} />
      )}

      {!isActiveIndicator && renderEvents()}
      {modelIsVisible && (
        <ModalComponent
          modalVisible={modelIsVisible}
          onCloseModal={() => setModelIsVisible(!modelIsVisible)}
        />
      )}
      {isLogin && (
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
  header: {
    flexDirection: "row",
    alignSelf: "flex-start",
    // borderWidth: 2,
    //  borderRadius: 10,
    marginTop: 10,
    //  borderColor: "#ffffff",
    padding: 2,
  },
  eventTypeButton: {
    ...globalStyle.buttonStyle,
    backgroundColor: "rgba(256,256,256,0)",
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  flatList: {
    marginHorizontal: 10,
    padding: 5,
    // borderWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRadius: 10,
    borderColor: "#ffffff",
    backgroundColor: "rgba(256, 256, 256, 0.4)",
  },
  action: {
    fontSize: 20,
    color: "white",
  },
});
export default DashBoard;
