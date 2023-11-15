import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "./tradingjournal.style";
import { COLORS, SIZES } from "../../constants";

const CustomDate = () => {
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [isNFocused, setIsNFocused] = useState(false);
  const [isUNFocused, setIsUNFocused] = useState(false);


  return (
    <View style={{paddingHorizontal: SIZES.medium}}>
      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          Start Date
        </Text>
        <TextInput
          placeholder="10-03-2023"
          placeholderTextColor={COLORS.gray}
          style={styles.email(isNFocused)}
          onFocus={() => {
            setIsNFocused(true);
          }}
          onBlur={() => {
            setIsNFocused(false);
          }}
        />
      </View>

      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          End Date
        </Text>
        <TextInput
          placeholder="11-3-2023"
          placeholderTextColor={COLORS.gray}
          style={styles.email(isUNFocused)}
          onFocus={() => {
            setIsUNFocused(true);
          }}
          onBlur={() => {
            setIsUNFocused(false);
          }}
        />
      </View>
    </View>
  )
}

const TradingJournal = () => {

  const [allPressed, setAllPressed] = useState(true);
  const [alertPressed, setAlertPressed] = useState(false);
  const [ongoingPressed, setOngoingPressed] = useState(false);
  const [exitPressed, setExitPressed] = useState(false);
  const [custom, setCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setRestInActive = (item) => {
    let search = "All";
    if (item == "exit") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
    } else if (item == "All") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setExitPressed(false);
      setCustom(false);
    } else if (item == "ongoing") {
      search = item;
      setExitPressed(false);
      setAlertPressed(false);
      setAllPressed(false);
      setCustom(false);
    } else if (item == "alerts") {
      search = item;
      setExitPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
      setCustom(false);
    }

    return search;
  };
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <View style={styles.base}>      
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
            placeholder="Pick an asset"
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.searchBtn}>
          <Image
            source={require("../../assets/icons/search.png")}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={{padding: SIZES.small, marginTop: SIZES.medium}}>
        <ScrollView styles={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
        
          <View style={{ flexDirection: "row", gap: SIZES.small - 2 }}>
            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 70,
                padding: SIZES.small - 3,
                backgroundColor: allPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setAllPressed(true);
                setRestInActive("All");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 100,
                padding: SIZES.small - 3,
                backgroundColor: alertPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setAlertPressed(true);
                setRestInActive("alerts");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Last Week</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 120,
                padding: SIZES.small - 3,
                backgroundColor: ongoingPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setOngoingPressed(true);
                setRestInActive("ongoing");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Last Month</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 100,
                padding: SIZES.small - 3,
                backgroundColor: exitPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setExitPressed(true);
                setRestInActive("exit");
                setCustom(true);
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Custom date</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {custom && <CustomDate />}
    </View>
  );
};

export default TradingJournal;
