import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import { getEntryTechniques } from "../../api/tradingplanApi";
import { AuthContext } from "../../context/AuthContext";

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

  const { accountDetails } = useContext(AuthContext);

  const getEntryTechs = async () => {
    const response = await getEntryTechniques(accountDetails.accountId).then(
      (res) => {
        return res.data;
      }
    );
    if (response.status) {
      setEntries(response.data);
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
    console.log(chosen);
  };

  const setSelect = () => {
    setSelectAll(false);
  };
  return (
    <ScrollView style={styles.base}>
      <Text style={styles.text}>
        Please tick as many indicators as you saw before taking the trade. This
        helps you to know whether your strategy is effective or not.
      </Text>
      <Text style={styles.indic}>Indicators</Text>

      <View style={styles.optionContainer}>
        {entries?.map((item) => (
          <Options key={item.id} option={item} updateList={updateList} />
        ))}
      </View>

      <TouchableOpacity
        onPress={() => {
          confirmEntries();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Confirm Entries</Text>
      </TouchableOpacity>
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
    marginTop: SIZES.large
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
