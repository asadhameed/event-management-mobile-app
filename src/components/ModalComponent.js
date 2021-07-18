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
  Image,
} from "react-native";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import BackGroundImage from "./BackGroundImage";
import globalStyles from "../constant/stylesSheet";

const windowHight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const ModalComponent = (props) => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [eventType, setEventType] = useState("Running");
  const [image, setImage] = useState();
  const [date, setDate] = useState(new Date(Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onPickImageHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,

      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) setImage(result.uri);
  };
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
  const onChangeDateHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  return (
    <ScrollView style={styles.centeredView}>
      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={props.onCloseModal}
        visible={props.modalVisible}
      >
        <View style={styles.modalView}>
          <BackGroundImage imageBackground={styles.imageBackground}>
            <Text style={globalStyles.titleText}>Creat a new Event</Text>
            <ScrollView style={globalStyles.form}>
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
                  placeholder="Event Price in $00,00"
                  placeholderTextColor="rgba(256,256,256,0.4)"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View style={{ ...styles.viewContainer, flexDirection: "row" }}>
                  <Text
                    style={{
                      ...styles.modalButton,
                      width: "20%",
                      textAlign: "left",
                      padding: 5,
                      marginLeft: 10,
                    }}
                  >
                    <Fontisto name="date" size={25} />
                  </Text>

                  <Text style={globalStyles.labelText}>
                    {date.toLocaleDateString()}
                  </Text>
                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      minimumDate={new Date(Date.now())}
                      onChange={onChangeDateHandler}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={globalStyles.labelText}>Event Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  onValueChange={(value) => setEventType(value)}
                  selectedValue={eventType}
                  style={styles.picker}
                  mode="dropdown"
                >
                  <Picker.Item label="Running" value="running" />
                  <Picker.Item label="Walking" value="walking" />
                  <Picker.Item label="Swimming" value="swimming" />
                  <Picker.Item label="Cycling" value="cycling" />
                </Picker>
              </View>
              <View style={styles.viewContainer}>
                <TouchableOpacity onPress={onPickImageHandler}>
                  <Text style={styles.modalButton}>
                    <MaterialIcons name="add-a-photo" size={50} />
                  </Text>
                </TouchableOpacity>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode="center"
                  />
                )}
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
            </ScrollView>
          </BackGroundImage>
        </View>
      </Modal>
    </ScrollView>
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
  // container: {
  //   flex: 1,
  //   alignItems: "flex-start",
  // },
  imageBackground: {
    //  width: windowWidth,
    // height: windowHight,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewContainer: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    //  height: 200,
  },
  image: {
    height: 200,
    width: 200,
    flex: 1,
    alignSelf: "center",
    margin: 5,
    borderWidth: 1,
    borderColor: "white",
  },
  picker: { flex: 1, ...globalStyles.labelText },
  pickerContainer: {
    height: 40,
    borderColor: "#ffffff",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderWidth: 1,
    borderRadius: 4,
  },
  modalButton: {
    ...globalStyles.buttonStyle,
    width: "100%",
    marginVertical: 5,
    backgroundColor: "rgba(0,0,0,0.0)",
    borderWidth: 0,
  },
});

export default ModalComponent;
