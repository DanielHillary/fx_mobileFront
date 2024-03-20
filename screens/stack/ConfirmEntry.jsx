import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import { getEntryTechniques } from "../../api/tradingplanApi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { confirmEntries } from "../../api/placeTradeApi";
import SuccessModal from "../../components/modal/SuccessModal";

const Options = ({ option, updateList }) => {
  const [entry, setEntry] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setEntry((prev) => !prev);
        updateList(option, entry);
      }}
      style={{ flexDirection: "row" }}
    >
      <View>
        {entry ? (
          <Image
            source={require("../../assets/icons/checkbox.png")}
            style={styles.image}
          />
        ) : (
          <View style={styles.checkbox} />
        )}
      </View>

      <View style={{ width: "auto", marginLeft: 8 }}>
        <Text style={[styles.optionText, { fontSize: SIZES.large }]}>
          {option.indicatorName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ConfirmEntry = () => {
  const [entries, setEntries] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [entryNum, setEntryNum] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const { accountDetails } = useContext(AuthContext);

  const navigation = useNavigation();

  const route = useRoute();

  let details = route.params?.tradeDetail || null;

  const setVisibility = (val) => {
    setIsModalVisible(val);
    navigation.goBack();
  };

  const getEntryTechs = async () => {
    const response = await getEntryTechniques(accountDetails.accountId).then(
      (res) => {
        return res.data;
      }
    );
    if (response.status) {
      setEntries(response.data);
      setEntryNum(response.data.length);
    } else {
      if (response.data.length === 0) {
        setIsEmpty(true);
      }
    }
  };

  useEffect(() => {
    getEntryTechs();
  }, []);

  const updateList = (option, status) => {
    setChosen((prevChosen) => {
      const alreadyExists = prevChosen.findIndex((obj) => obj.id === option.id);

      if (alreadyExists === -1 && !status) {
        // Add to chosen list
        return [...prevChosen, option];
      } else if (alreadyExists !== -1 && status) {
        // Remove from chosen list
        return prevChosen.filter((obj) => obj.id !== option.id);
      }
      // No change
      return prevChosen;
    });
  };

  const confirmEntry = async () => {
    if (chosen.length == 0) {
      Alert.alert("Empty", "You haven't selected any entries yet");
    } else {
      let percentEntry = 0;
      if (entryNum !== 0) {
        percentEntry = (chosen.length / entryNum) * 100;
      }
      const response = await confirmEntries(details, percentEntry).then(
        (res) => {
          return res;
        }
      );
      if (response.status) {
        setIsModalVisible(true);
      }
    }
    setIsClicked(false);
  };

  return (
    <ScrollView style={styles.base}>
      {!isEmpty ? (
        <Text style={styles.text}>
          Please tick as many indicators as you saw before taking the trade.
          This helps you to know whether your strategy is effective or not.
        </Text>
      ) : (
        <Text style={styles.text}>
          Unfortunately, you haven't registered your entry strategy with us.
          Kindly do so to score better on your trades.
        </Text>
      )}
      {!isEmpty && <Text style={styles.indic}>Indicators</Text>}

      {entries.length === 0 ? (
        <View
          style={{
            backgroundColor: COLORS.appBackground,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={styles.optionContainer}>
          {entries?.map((item) => (
            <Options key={item.id} option={item} updateList={updateList} />
          ))}
        </View>
      )}

      {isEmpty ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Plan");
          }}
          style={styles.button}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText}>Setup Entry plan</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setIsClicked(true);
            confirmEntry();
          }}
          style={styles.button}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText}>Confirm Entries</Text>
          )}
        </TouchableOpacity>
      )}

      <Modal
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <SuccessModal setVisibility={setVisibility} />
      </Modal>
    </ScrollView>
  );
};

export default ConfirmEntry;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    padding: SIZES.medium,
  },
  indic: {
    color: COLORS.darkyellow,
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    alignSelf: "center",
    marginTop: SIZES.large,
  },
  select: {
    color: COLORS.darkyellow,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    marginTop: SIZES.xSmall - 2,
  },
  optionContainer: {
    paddingVertical: SIZES.medium,
    rowGap: SIZES.large,
  },
  image: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    borderRadius: 15,
    marginLeft: 5,
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  optionText: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 60,
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
});
