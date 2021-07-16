import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";

import BackGroundImage from "./BackGroundImage";
import globalStyles from "../constant/stylesSheet";

const windowHight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const ModalComponent = (props) => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();

  const onSaveHandler = () => {
    console.log(
      "file: ModalComponent.js ~ line 25 ~ ModalComponent ~ title",
      title
    );
    console.log(
      "file: ModalComponent.js ~ line 28 ~ ModalComponent ~ price",
      price
    );
    console.log(
      "file: ModalComponent.js ~ line 33 ~ ModalComponent ~ description",
      description
    );
    setTitle("");
    setPrice("");
    setDescription("");
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={props.onCloseModal}
      visible={props.modalVisible}
    >
      <ScrollView style={styles.centeredView}>
        <View style={styles.modalView}>
          <BackGroundImage>
            <Text style={globalStyles.titleText}>Creat a new Event</Text>
            <View style={globalStyles.form}>
              <View>
                <Text style={globalStyles.labelText}>Title</Text>
                <TextInput
                  style={{ ...globalStyles.input, height: 40 }}
                  placeholder="Event Title"
                  placeholderTextColor="rgba(256,256,256,0.4)"
                  autoCapitalize="none"
                  value={title}
                  onChangeText={setTitle}
                />
                <Text style={globalStyles.labelText}>Description</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  style={globalStyles.input}
                  placeholder="Event Description"
                  placeholderTextColor="rgba(256,256,256,0.4)"
                  autoCapitalize="none"
                  value={description}
                  onChangeText={setDescription}
                />
                <Text style={globalStyles.labelText}>Price</Text>
                <TextInput
                  style={{ ...globalStyles.input, height: 40 }}
                  placeholder="Event Price"
                  placeholderTextColor="rgba(256,256,256,0.4)"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={props.onCloseModal}
                >
                  <Text
                    style={{
                      ...globalStyles.buttonStyle,
                      backgroundColor: "#337ab7",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => onSaveHandler()}
                >
                  <Text style={globalStyles.buttonStyle}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BackGroundImage>
        </View>
      </ScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    marginTop: 50,
  },
  modalView: {
    borderRadius: 40,
    borderWidth: 4,
    height: windowHight,
    width: windowWidth,
    borderColor: "white",
    overflow: "hidden",
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ModalComponent;
