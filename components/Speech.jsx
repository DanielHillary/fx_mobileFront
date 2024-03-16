import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONT, SIZES } from "../constants";
import useVoiceRecognition from "../hooks/useVoiceRecognition";
import OrderModal from "./modal/OrderModal";

const Options = ({ option }) => {
  return (
    <View style={{ paddingHorizontal: 30, marginTop: 10 }}>
      <View style={styles.option}>
        <Text style={{ color: COLORS.white }}>{option}</Text>
      </View>
    </View>
  );
};

const Speech = ({ placeAudioOrder }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const submitCommand = (value) => {
    setIsModalVisible(false);
    placeAudioOrder(value);
    console.log(value);
  };

  const voiceRecognition = useVoiceRecognition();
  return (
    <View>
      <Text style={styles.text}>
        Press and hold this button to record your command. Release the button to
        stop recording and voilaaa!, your trade is on the way!!!
      </Text>

      <Text style={styles.order}>Make A Request</Text>

      {/* {voiceRecognition.state.results?.map((item) => (
        <Options option={item} />
      ))} */}

      <TouchableOpacity
        onPressIn={() => {
          setIsPressed(true);
          voiceRecognition.startRecognizing();
        }}
        onPressOut={() => {
          setIsPressed(false);
          voiceRecognition.stopRecognizing();
          let speech = voiceRecognition.state.results
          
          setIsModalVisible(true)
          
        }}
        style={styles.recorder(isPressed)}
      >
        <Image
          source={require("../assets/icons/voice1.png")}
          style={{ height: 80, width: 80 }}
        />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <OrderModal
          submitCommand={submitCommand}
          setVisibility={(value) => {
            setIsModalVisible(value);
          }}
          text={voiceRecognition.state.results}
        />
      </Modal>
    </View>
  );
};

export default Speech;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
  },
  order: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    textAlign: "center",
  },
  option: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    width: "auto",
    borderRadius: 10,
    padding: 10,
  },
  text: {
    textAlign: "center",
    color: COLORS.white,
    padding: SIZES.medium,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
  },
  recorder: (isPressed) => ({
    borderColor: isPressed ? "red" : "green",
    height: 130,
    width: 130,
    alignSelf: "center",
    borderWidth: 3,
    borderRadius: 75,
    marginVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  }),
  recording: {
    marginBottom: 50,
    color: COLORS.tertiary,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
});
