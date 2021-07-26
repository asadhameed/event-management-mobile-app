import React, { useState, useEffect, useContext } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/core";

import BackGroundImage from "../components/BackGroundImage";
import { useHttpClient } from "../services/BackEndAPI";
import { AuthContext } from "../contexts/AuthContext";
import EventComponent from "../components/EventComponent";
import AlertIndicator from "../components/formElements/AlertIndicator";
import globalStyle from "../constant/stylesSheet";

const SubscribedEventScreen = () => {
  const [events, setEvent] = useState([]);
  const [isActiveIndicator, setIsActiveIndicator] = useState(false);
  const { token } = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const isFocused = useIsFocused();
  const getSubscribedEvents = async () => {
    setIsActiveIndicator(true);
    const headers = { "x-auth-token": token };
    const response = await sendRequest("eventsSubscribed", "GET", headers);
    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData);
      setEvent(responseData);
    }
    setIsActiveIndicator(false);
  };

  useEffect(() => {
    getSubscribedEvents();
  }, [isFocused]);

  const isApproved = (status) => (status ? "Approved" : "Rejected");

  const renderEvents = () => {
    return (
      <>
        <Text style={globalStyle.notFoundTextStyle}>your subscription</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          data={events}
          keyExtractor={(event) => event._id}
          renderItem={({ item }) => (
            <EventComponent
              event={item.event}
              status={
                item.approved === undefined
                  ? "Pending"
                  : isApproved(item.approved)
              }
            />
          )}
        />
      </>
    );
  };

  const renderText = () => {
    return !isActiveIndicator ? (
      <Text style={globalStyle.notFoundTextStyle}>
        you don't subscribe a event.
      </Text>
    ) : null;
  };
  return (
    <BackGroundImage>
      {isActiveIndicator && (
        <AlertIndicator isActiveIndicator={isActiveIndicator} />
      )}
      {events.length > 0 ? renderEvents() : renderText()}
    </BackGroundImage>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: 20,
    padding: 5,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRadius: 10,
    borderColor: "#ffffff",
    backgroundColor: "rgba(256, 256, 256, 0.4)",
  },
});

export default SubscribedEventScreen;
