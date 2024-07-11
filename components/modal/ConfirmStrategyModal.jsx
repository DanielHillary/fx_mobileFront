import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { COLORS, SIZES, FONT } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import { getEntryTechniques, registerTradeSetup } from "../../api/tradingplanApi";

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

const ConfirmStrategyModal = ({ setVisibility, openTrade }) => {
  const [entries, setEntries] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [entryNum, setEntryNum] = useState(0);

  const { accountDetails } = useContext(AuthContext);

  const getEntryTechs = async () => {
    const response = await getEntryTechniques(accountDetails.accountId).then(
      (res) => {
        return res.data;
      }
    );
    if (response.status) {
      setEntries(response.data);
      setEntryNum(response.data.length);
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

  const confirmEntries = async () => {
    if (chosen.length === 0) {
      Alert.alert("Choose", "You haven't selected any entries");
    } else {
      setVisibility(false);
      let percentEntry = 0;
      if (entryNum !== 0) {
        percentEntry = (chosen.length / entryNum) * 100;
      }
      let chosenList = chosen.map((item) => item.indicatorName).join(",");
      openTrade(false, true, percentEntry, chosenList);
    }
  };

  const ignoreEntries = async () => {
    setVisibility(false);
    openTrade(true, false, 0, chosen);
  };


  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <ScrollView style={styles.base}>
          <Text style={styles.text}>
            Please tick as many indicators as you saw before taking the trade.
            This helps you to know whether your strategy is effective or not.
          </Text>
          <Text style={styles.indic}>Indicators</Text>

          <View style={styles.optionContainer}>
            {entries?.map((item) => (
              <Options key={item.id} option={item} updateList={updateList} />
            ))}
          </View>
        </ScrollView>
        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: SIZES.medium * 2,
              paddingHorizontal: SIZES.medium * 1.5,
              position: "absolute",
              bottom: 20
            }}
          >
            <TouchableOpacity
              onPress={() => {
                ignoreEntries();
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Ignore</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                confirmEntries();
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Confirm Entries</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
};

export default ConfirmStrategyModal;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.componentbackground,
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
    width: 135,
    marginTop: 30,
    alignSelf: "center",
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    fontSize: SIZES.medium,
    color: "black",
    fontFamily: FONT.bold,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  //   text: {
  //     color: COLORS.darkyellow,
  //     fontSize: SIZES.xSmall,
  //     fontFamily: FONT.regular,
  //   },
  //   optionText: {
  //     color: COLORS.white,
  //     fontFamily: FONT.medium,
  //     fontSize: SIZES.medium,
  //     margin: SIZES.small,
  //   },
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
  //   buttontext: {
  //     color: "black",
  //     fontSize: SIZES.large,
  //     fontFamily: FONT.bold,
  //   },
  modal: {
    backgroundColor: "#09181C",
    height: "65%",
    width: "100%",
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
