import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import BackGroundImage from "./BackGroundImage";

const windowHight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const ModalComponent = (props) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={props.onCloseModal}
      visible={props.modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <BackGroundImage>
            <TouchableOpacity onPress={props.onCloseModal}>
              <Text>Close the Modal</Text>
            </TouchableOpacity>
          </BackGroundImage>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 50,
  },
  modalView: {
    flex: 1,
    borderRadius: 40,
    borderWidth: 4,
    height: windowHight,
    width: windowWidth,
    borderColor: "white",
    overflow: "hidden",
  },
});

export default ModalComponent;
