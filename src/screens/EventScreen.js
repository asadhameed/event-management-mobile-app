import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import BackGroundImage from "../components/BackGroundImage";
import Inputs from "../components/formElements/Inputs";
import { AuthContext } from "../contexts/AuthContext";
import { EventContext } from "../contexts/EventContext";
import { AUTH_TAB, DASHBOARD_SCREEN } from "../StringOfApp";
import { useHttpClient } from "../services/BackEndAPI";
import AlertIndicator from "../components/formElements/AlertIndicator";
import globalStyles from "../constant/stylesSheet";

const EventScreen = ({ navigation, route }) => {
  const { isLogin, user, token } = useContext(AuthContext);
  const eventContext = useContext(EventContext);
  const { event } = route.params;
  const { sendRequest } = useHttpClient();
  const [isActiveIndicator, setIsActiveIndicator] = useState(false);
  const [eventStatus, setEventStatus] = useState();
  const [statusTextColor, setStatusTextColor] = useState("blue");

  const onDeleteEventHandler = async () => {
    setIsActiveIndicator(true);
    const headers = { "x-auth-token": token };
    const response = await sendRequest(`event/${event.id}`, "DELETE", headers);
    setIsActiveIndicator(false);
    if (response.status === 204) {
      navigation.navigate(DASHBOARD_SCREEN);
    }
    //  setIsActiveIndicator(false);
  };
  const onRegisterHandler = async (event) => {
    setIsActiveIndicator(true);
    const headers = { "x-auth-token": token };
    const response = await sendRequest(
      `eventRegister/${event._id}`,
      "POST",
      headers
    );
    setIsActiveIndicator(false);
    if (response.status == 200) {
      navigation.navigate(DASHBOARD_SCREEN);
    }
  };

  useEffect(() => {
    const findEventSubscribed = eventContext.subscribedEvent.find(
      (eventSub) => eventSub.event._id === event._id
    );
    if (!findEventSubscribed) setEventStatus(false);
    else if (findEventSubscribed.approved) {
      setEventStatus("Approved");
      setStatusTextColor("green");
    } else {
      if (findEventSubscribed.approved === false) {
        setEventStatus("Rejected");
        setStatusTextColor("red");
      } else setEventStatus("Pending");
    }
  }, []);

  return (
    <BackGroundImage>
      {isActiveIndicator && (
        <AlertIndicator isActiveIndicator={isActiveIndicator} />
      )}
      <View style={styles.eventScreenContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Image style={styles.image} source={{ uri: event.thumbnail_url }} />

        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Inputs title="Type" info={event.eventType} />
              <Inputs title="Event Date" info={event.date.toString()} />
              <Inputs title="Event price" info={`${event.price} $`} />
            </View>
            {isLogin && user === event.user && (
              <View>
                {/* <TouchableOpacity
                  onPress={() => console.log("You want edit the event ")}
                >
                  <Text style={styles.registerText}>
                    <MaterialIcons
                      name="edit"
                      size={30}
                      color="rgb(192,64,175)"
                    />
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={onDeleteEventHandler}>
                  <Text style={styles.registerText}>
                    <MaterialIcons
                      name="delete"
                      size={60}
                      color="rgb(192,64,175)"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {isLogin && eventStatus && (
              <View>
                <Text
                  style={{ ...styles.eventStatusText, color: statusTextColor }}
                >
                  {eventStatus}
                </Text>
              </View>
            )}
            {isLogin && !eventStatus && user !== event.user && (
              //<View style={styles.register}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => onRegisterHandler(event)}
              >
                <Text style={globalStyles.buttonStyle}>Register</Text>
              </TouchableOpacity>
              // </View>
            )}
            {!isLogin && (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => navigation.navigate(AUTH_TAB)}
              >
                <Text style={globalStyles.buttonStyle}>LogIn for Register</Text>
              </TouchableOpacity>
            )}
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
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
    padding: 5,
  },
  eventStatusText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#ffffff",
    backgroundColor: "rgba(256, 256, 256, 0.6)",
    padding: 5,
  },
  loginRegisterText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
  },
});

export default EventScreen;
