import React, { useState, useContext } from "react";
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
import { AuthContext } from "../contexts/AuthContext";
import { useHttpClient } from "../services/BackEndAPI";
import AlertIndicator from "./formElements/AlertIndicator";

const windowHight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const ModalComponent = (props) => {
  const [title, setTitle] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [price, setPrice] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [description, setDescription] = useState(null);
  const [eventType, setEventType] = useState("running");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date(Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const authContext = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [isActiveIndicator, setIsActiveIndicator] = useState(false);

  const onPickImageHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,

      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) setImage(result.uri);
  };
  const validationInputFields = () => {
    let isValid = true;

    if (!title) {
      isValid = false;
      setTitleError("Please give an event title");
    } else {
      setTitleError(null);
    }
    if (!price || price < 1) {
      isValid = false;
      setPriceError("Please gives price greater then zero");
    } else {
      setPriceError(null);
    }

    return isValid;
  };
  const onSaveHandler = async () => {
    setIsActiveIndicator(true);
    if (validationInputFields()) {
      const body = { title, eventType, price, description, date };
      const headers = {
        "x-auth-token": authContext.token,
        "Content-Type": "Application/json",
      };
      const response = await sendRequest(
        "event",
        "POST",
        headers,
        JSON.stringify(body)
      );

      // const responseData = await response.json();
      //console.log(responseData);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setTitle(null);
        setPrice(null);
        setDescription(null);
        setImage(null);
        setDate(new Date(Date.now()));
        setEventType("running");
        props.onCloseModal();
      }
    }
    setIsActiveIndicator(false);
  };
  const onChangeDateHandler = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const eventView = () => {
    return (
      <>
        <Text style={globalStyles.titleText}>Creat a new Event</Text>
        <ScrollView style={globalStyles.form}>
          <View>
            <Text style={globalStyles.labelText}>Title</Text>
            <TextInput
              style={{ ...globalStyles.input, height: 40, marginBottom: 5 }}
              placeholder="Event Title"
              placeholderTextColor="rgba(256,256,256,0.4)"
              autoCapitalize="none"
              value={title}
              onChangeText={setTitle}
            />
            <View style={{ marginBottom: 10 }}>
              {titleError && <Text style={{ color: "red" }}>{titleError}</Text>}
            </View>
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
              style={{ ...globalStyles.input, height: 40, marginBottom: 5 }}
              placeholder="Event Price in $00,00"
              placeholderTextColor="rgba(256,256,256,0.4)"
              autoCapitalize="none"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
            <View style={{ marginBottom: 10 }}>
              {priceError && <Text style={{ color: "red" }}>{priceError}</Text>}
            </View>
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
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={{ flex: 1 }} onPress={props.onCloseModal}>
            <Text
              style={{
                ...globalStyles.buttonStyle,
                backgroundColor: "#337ab7",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => onSaveHandler()}>
            <Text style={globalStyles.buttonStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </>
    );
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
            {isActiveIndicator ? (
              <AlertIndicator isActiveIndicator={isActiveIndicator} />
            ) : (
              eventView()
            )}
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
    //  marginTop: 20,
    marginBottom: 15,
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
