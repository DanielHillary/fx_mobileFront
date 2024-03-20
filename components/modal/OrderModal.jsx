import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";

const Options = ({ options, chooseOption }) => {
  const [chosen, setChosen] = useState(false);
  return (
    <View style={{ paddingHorizontal: 30, marginTop: 5 }}>
      <TouchableOpacity
        style={styles.option(chosen)}
        onPress={() => {
          setChosen(!chosen);
          chooseOption(options);
        }}
      >
        <Text style={styles.optionT(chosen)}>{options}</Text>
      </TouchableOpacity>
    </View>
  );
};

const OrderModal = ({ setVisibility, text, submitCommand }) => {
  const [command, setCommand] = useState("");

  const chooseCommandOption = (val) => {
    setCommand(val);
  };

  if (text.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={{ alignItems: "center", marginTop: SIZES.small }}>
            <Text style={[styles.note, { fontSize: 30, justifyContent: 'center', padding: 20, textAlign: "center"}]}>
              {" "}
              Please be audible enough for the microphone to capture your request.
            </Text>

            <TouchableOpacity
              onPress={() => {
                setVisibility(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={{ alignItems: "center", marginTop: SIZES.small }}>
          <Text style={styles.note}>
            Please click an option to choose the most accurate command. If no
            option meets our recommended format, please cancel and try again.
          </Text>

          <View style={{ marginTop: 15 }}>
            {text?.map((item) => (
              <Options options={item} chooseOption={chooseCommandOption} />
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              paddingHorizontal: 30,
              position: "absolute",
              bottom: -90,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setVisibility(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (command.length === 0) {
                  Alert.alert("", "Please choose a command request");
                } else {
                  submitCommand(command);
                }
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  optionText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    margin: SIZES.small,
  },
  note: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium - 3,
    marginTop: SIZES.medium,
    paddingHorizontal: 10,
    textAlign: "center"
  },
  modal: {
    backgroundColor: "#09181C",
    height: 450,
    width: "100%",
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: "50%",
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    fontSize: SIZES.large,
    color: "black",
    fontFamily: FONT.bold,
  },
  option: (chosen) => ({
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    width: "auto",
    borderRadius: 10,
    padding: 10,
    backgroundColor: chosen ? COLORS.darkyellow : COLORS.appBackground,
  }),
  optionT: (chosen) => ({
    color: chosen ? "black" : COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  }),
});
