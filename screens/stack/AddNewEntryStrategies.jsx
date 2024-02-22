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
  import React, { useEffect, useState } from "react";
  import { COLORS, FONT, SIZES } from "../../constants";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { getEntries, registerEntryStrategy } from "../../api/tradingplanApi";
  import AwesomeAlert from "react-native-awesome-alerts";
  import { useNavigation, useRoute } from "@react-navigation/native";
  
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
            key={value}
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
    showCancelButton,
  }) => {
    return (
      <View>
        <AwesomeAlert
          show={isAlert}
          title={title}
          titleStyle={styles.title}
          contentContainerStyle={styles.alertContainer}
          showConfirmButton={false}
          cancelButtonColor={COLORS.darkyellow}
          cancelButtonTextStyle={styles.alertText}
          cancelText="Continue"
          showCancelButton={showCancelButton}
          onCancelPressed={handleCancel}
          onConfirmPressed={handleConfirm}
          closeOnTouchOutside={true}
          onDismiss={handleCancel}
          message="Please enter indicators for your entry strategy"
        />
      </View>
    );
  };
  
  const AddNewEntryStrategies = () => {
    const [entryFocused, setEntryFocused] = useState(false);
    const [entryValue, setEntryValue] = useState("");
    const [hasArrived, setHasArrived] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [number, setNumber] = useState(0);
    const [data, setData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
  
    const navigation = useNavigation();
  
    const route = useRoute();
  
    const accountInfo = route.params?.account || null;
    const tradePlan = route.params.tradePlan || null;
  
    const text1 = "Submit";
    const text2 = "Edit";
  
    const registerEntry = async () => {
      setIsClicked(true);
      const body = {
        accountId: accountInfo.accountId,
        analysisNames: data,
        category: "Price Action",
        entryStrategyName: "Jumbo",
        noteToSelf: "Please always check",
        tradingPlanId: tradePlan.planId,
        tradingPlanName: "Some name",
      };
  
      let response = await registerEntryStrategy(body).then((res) => {
        return res.data;
      });
      if (response.status) {
        console.log(response.message);
        navigation.navigate("AddNewExitStrategy", { account: accountInfo, tradingPlan: tradePlan});
      }else {
        console.log(response.message);
      }
      setIsClicked(false);
    };
  
    let separatedArray = [];
  
    const submit = () => {
      if (entryValue.length == 0) {
        setIsEmpty(true);
      } else {
        setIsClicked(true);
        separatedArray = entryValue.split(",");
        const filtered = separatedArray.filter((item) => item.trim() !== "");
        setNumber(filtered.length);
        setData(filtered);
        setIsEdit(!isEdit);
        setIsClicked(false);
      }
      // console.log(hasArrived);
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
            {!isEdit ? <Options item={data} /> : <></>}
          </View>
  
          <TouchableOpacity
            onPress={() => {
              //   navigate("AutoTrader");
              submit();
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
          <View style={{marginTop: SIZES.large}}>
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
            <TouchableOpacity
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
            </TouchableOpacity>
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
        />
      </View>
    );
  };
  
  export default AddNewEntryStrategies;
  
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
  