import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Inputs from "./formElements/Inputs";

const EventComponent = (props) => {
  const [color, setColor] = useState("blue");

  useEffect(() => {
    if (props.status === "Approved") {
      setColor("green");
    } else if (props.status === "Rejected") {
      setColor("red");
    } else setColor("blue");
  }, [props.status]);
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
        {props.status && (
          <Inputs
            title="Status"
            info={props.status}
            style={{ color, fontWeight: "bold", fontSize: 15 }}
          />
        )}
        {props.approvalButton && (
          <>
            <Inputs title="User Name" info={props.userName} />
            <Inputs title="User Email" info={props.userEmail} />
            <View style={styles.header}>
              <Text style={styles.contentText}>Approval : </Text>
              <TouchableOpacity
                style={{ flex: 1 }}
                disabled={props.eventStatus}
                onPress={props.onApproved}
              >
                {!props.eventStatus && (
                  <Text
                    style={{
                      ...styles.eventTypeButton,
                      backgroundColor: "rgba(0,128,0, 0.6)",
                    }}
                  >
                    Accept
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flex: 1 }}
                disabled={props.eventStatus === undefined || !props.eventStatus}
                onPress={props.onRejected}
              >
                {(props.eventStatus || props.eventStatus === undefined) && (
                  <Text
                    style={{
                      ...styles.eventTypeButton,
                      backgroundColor: "rgba(256,0,0, 0.6)",
                    }}
                  >
                    Reject
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    width: "98%",
    flexDirection: "column",
    alignItems: "stretch",
    borderWidth: 5,
    borderRadius: 20,
    borderColor: "#6e9aa1",
    backgroundColor: "rgba(256,256,256,0.5)",
    margin: 2,
  },
  header: {
    flexDirection: "row",
  },
  contentText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  eventTypeButton: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 20,
    textAlign: "center",
    padding: 2,
    width: "90%",
    backgroundColor: "#af70a6",
    color: "#fff",
  },
});

export default EventComponent;
