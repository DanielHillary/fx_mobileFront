import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getEntries,
  registerEntryStrategy,
  updateEntryStrategies,
} from "../../../api/tradingplanApi";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../context/AuthContext";

const Options = ({ item }) => {
  return (
    <ScrollView
      horizontal
      style={{
        paddingBottom: SIZES.large,
        columnGap: SIZES.large,
      }}
    >
      {item?.map((value) => (
        <View
          key={value.id}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: SIZES.large,
          }}
        >
          <View style={styles.asset}>
            <Text
              style={{
                color: COLORS.lightWhite,
                fontSize: SIZES.medium + 2,
                fontFamily: FONT.medium,
                textAlign: "center",
                paddingHorizontal: SIZES.small,
              }}
            >
              {value}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const AlertModal = ({
  title,
  isAlert,
  handleConfirm,
  handleCancel,
  message,
  showCancelButton,
  showConfirmButton,
}) => {
  return (
    <View>
      <AwesomeAlert
        show={isAlert}
        title={title}
        titleStyle={styles.title}
        contentContainerStyle={styles.alertContainer}
        showConfirmButton={showConfirmButton}
        cancelButtonColor={COLORS.darkyellow}
        cancelButtonTextStyle={styles.alertText}
        confirmButtonColor={COLORS.darkyellow}
        confirmButtonTextStyle={styles.alertText}
        cancelText="Review"
        confirmText="Continue"
        showCancelButton={showCancelButton}
        onCancelPressed={handleCancel}
        onConfirmPressed={handleConfirm}
        closeOnTouchOutside={true}
        onDismiss={handleCancel}
        message={message}
      />
    </View>
  );
};

const EntryPlan = () => {
  const [entryFocused, setEntryFocused] = useState(false);
  const [entryValue, setEntryValue] = useState("");
  const [hasArrived, setHasArrived] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [number, setNumber] = useState(0);
  const [data, setData] = useState([]);
  const [entryData, setEntryData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [initialData, setInitialData] = useState(false);
  const [warning, setWarning] = useState(false);

  const navigation = useNavigation();

  const { accountDetails } = useContext(AuthContext);

  const getAccount = async () => {
    setAccountInfo(accountDetails);
  };

  const getEntryTechs = async () => {
    const response = await getEntries(accountDetails.accountId).then((res) => {
      return res.data;
    });
    if (response.status) {
      setData(response.data);
      setEntryValue((value) => {
        value = response.data.join(",");
        return value;
      });
      setNumber(response.data.length);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getEntryTechs();
    getAccount();
    setInitialData(true);
  }, []);

  const text1 = "Submit";
  const text2 = "Edit";

  const submit = (edit) => {
    if (entryValue.length === 0 && isEdit) {
      setIsEmpty(true);
      return;
    }

    const separatedArray = entryValue.split(",");
    const filtered = separatedArray.filter((item) => item.trim() !== "");

    setNumber(filtered.length);
    setEntryData(filtered);
    setInitialData(false);

    const diff = data.length - entryData.length;
    if (diff !== 0 && edit) {
      setWarning(true);
    }else{
      setIsEdit(prev => !prev);
    }
  };

  const updateEntries = async () => {
    const body = {
      accountId: accountInfo.accountId,
      techList: entryData,
      category: "Price Action",
    };
    try {
      const response = await updateEntryStrategies(body);
      if (response.status) {
        setData(entryData);
        console.log("Update Successful:", response.data);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error("Update Failed:", error.message);
    }

    setIsEdit(!isEdit);
    setIsClicked(false);
  };

  return (
    <View style={styles.baseContainer}>
      <View>
        <View>
          <Text
            style={{
              color: COLORS.lightWhite,
              fontFamily: FONT.bold,
              fontSize: SIZES.xxLarge,
            }}
          >
            Entry Strategy
          </Text>
          <View>
            {isEdit ? (
              <View>
                <Text style={[styles.text, { fontSize: SIZES.medium }]}>
                  Please separate your entry techniques with a comma ",".
                </Text>
                <Text style={[styles.text, { fontSize: SIZES.medium }]}>
                  Example:
                </Text>
                <Text
                  style={[
                    styles.text,
                    { fontSize: SIZES.medium, color: COLORS.darkyellow },
                  ]}
                >
                  "Support, Resistance, Supply, Demand, Overbought, Divergence,"
                </Text>
              </View>
            ) : (
              <Text style={[styles.text, { fontSize: SIZES.medium }]}>
                Here is a list of indicators and a complete set up that you must
                confirm before you place any trade. Always endeavor to analyze
                every trade before entry and stick to an entry strategy.
              </Text>
            )}
          </View>
        </View>

        {isEdit && (
          <View style={{ width: "90%", marginTop: SIZES.medium }}>
            <Text
              style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}
            >
              Entry techniques
            </Text>
            <TextInput
              placeholder="Enter your techniques"
              placeholderTextColor={COLORS.gray}
              style={styles.email(entryFocused)}
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) => {
                setEntryValue(text);
              }}
              value={entryValue}
              onFocus={() => {
                setEntryFocused(true);
                setHasArrived(false);
              }}
              onBlur={() => {
                setEntryFocused(false);
              }}
            />
          </View>
        )}

        <View style={{ alignItems: "center" }}>
          {!isEdit && (
            <Text
              style={{
                color: COLORS.lightWhite,
                marginVertical: SIZES.medium - 4,
                fontSize: SIZES.large,
              }}
            >
              {number}
            </Text>
          )}
          {!isEdit ? <Options key={data} item={initialData ? data : entryData} /> : <></>}
        </View>

        <TouchableOpacity
          onPress={() => {
            submit(isEdit);
          }}
          style={styles.button(isEdit)}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText}>{!isEdit ? text2 : text1}</Text>
          )}
        </TouchableOpacity>
      </View>

      {!isEdit && (
        <View style={{ marginTop: SIZES.large }}>
          <Text
            style={[
              styles.text,
              {
                padding: SIZES.small,
                fontFamily: FONT.medium,
                fontSize: SIZES.medium - 2,
              },
            ]}
          >
            In order to use this service, you have to agree to our terms and
            condition. This service strictly monitors ALL your trades and would
            shut down any trade that is not in compliance with your trading
            plan.
          </Text>
          {/* <TouchableOpacity
            onPress={() => {
              registerEntry();
            }}
            style={styles.buttonContinue}
          >
            {isClicked ? (
              <ActivityIndicator size="large" colors={"black"} />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity> */}
        </View>
      )}

      <AlertModal
        isAlert={isEmpty}
        item={data}
        title={"Empty values"}
        showCancelButton={true}
        handleCancel={() => {
          setIsEmpty(false);
          setData([]);
        }}
        message={"Please enter some entry techniques"}
      />

      <AlertModal
        isAlert={warning}
        item={data}
        title={"Empty values"}
        showCancelButton={true}
        handleCancel={() => {
          setWarning(false);
        }}
        showConfirmButton={true}
        handleConfirm={() => {
          updateEntries();
          setWarning(false);
        }}
        message={"Are you sure you want to update your techniques?"}
      />
    </View>
  );
};

export default EntryPlan;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  intro: {
    color: COLORS.lightWhite,
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
  title: {
    color: COLORS.darkyellow,
    // borderWidth: 1,
    // borderColor: COLORS.darkyellow,
  },
  alertContainer: {
    backgroundColor: "black",
    borderRadius: SIZES.medium,
    width: 200,
  },
  optionText: {
    backgroundColor: COLORS.appBackground,
    borderColor: COLORS.darkyellow,
    borderRadius: SIZES.large,
    height: 50,
    borderWidth: 0.2,
    width: "auto",
    alignItems: "center",
  },
  options: {
    flexDirection: "row",
    width: "auto",
    padding: SIZES.small,
    borderRadius: 25,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.3,
  },
  text: {
    color: COLORS.lightWhite,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    marginTop: SIZES.small,
  },
  dots: {
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
  },
  email: (focused) => ({
    borderColor: focused ? COLORS.darkyellow : COLORS.gray,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    height: 60,
    color: COLORS.white,
    fontSize: SIZES.medium,
  }),
  alertText: {
    color: "black",
    fontFamily: FONT.bold,
  },
  asset: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    borderRadius: SIZES.xSmall - 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  button: (edit) => ({
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 80,
    marginTop: 10,
    alignSelf: edit ? "flex-end" : "center",
    marginRight: edit ? SIZES.large + 10 : 0,
  }),
  buttonContinue: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 200,
    marginTop: 20,
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
