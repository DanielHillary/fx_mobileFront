import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { COLORS, SIZES, FONT } from "../../constants";
import React from "react";

const CustomDate = ({  }) => {
  

  return <View></View>;
};

const CustomDateModal = ({ setVisibility,getStartDate, getEndDate, getRangeData }) => {
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isNFocused, setIsNFocused] = useState(false);
  const [isUNFocused, setIsUNFocused] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={[styles.text, { paddingHorizontal: SIZES.small }]}>
          Please choose one package
        </Text>
        <View style={{ paddingHorizontal: SIZES.medium }}>
          <View style={{ width: "80%", marginTop: SIZES.medium }}>
            <Text
              style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}
            >
              Start Date
            </Text>
            <TextInput
              placeholder="10-03-2023"
              placeholderTextColor={COLORS.gray}
              style={styles.email(startDate)}
              onFocus={() => {
                setStartDate(true);
              }}
              onBlur={() => {
                setStartDate(false);
              }}
              onChange={(val) => {
                setStartValue(val);
                getStartDate(val);
              }}
              value={startValue}
            />
          </View>

          <View style={{ width: "80%", marginTop: SIZES.medium }}>
            <Text
              style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}
            >
              End Date
            </Text>
            <TextInput
              placeholder="11-3-2023"
              placeholderTextColor={COLORS.gray}
              style={styles.email(endDate)}
              onFocus={() => {
                setEndDate(true);
              }}
              onBlur={() => {
                setEndDate(false);
              }}
              onChange={(val) => {
                setEndValue(val);
                getEndDate(val);
              }}
              value={endValue}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            //   navigate("AutoTrader");
            getRangeData();
            setVisibility(false);
          }}
          style={styles.buttonStyle}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttontext}>Get Records</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDateModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    color: COLORS.darkyellow,
    fontSize: SIZES.xSmall,
    fontFamily: FONT.regular,
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
    fontSize: SIZES.medium,
    marginTop: SIZES.medium,
  },
  buttonStyle: {
    backgroundColor: COLORS.darkyellow,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    width: 200,
    margin: SIZES.small,
    marginTop: SIZES.large * 2,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    padding: SIZES.small,
  },
  buttontext: {
    color: "black",
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
  modal: {
    backgroundColor: "#09181C",
    height: 300,
    width: "100%",
    borderRadius: SIZES.medium,
  },
  choose: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    width: 200,
    alignSelf: "flex-start",
    marginLeft: SIZES.medium,
  },
});
