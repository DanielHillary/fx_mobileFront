import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  Alert,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "./tradingjournal.style";
import { COLORS, FONT, SIZES } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import EmptyList from "../../components/EmptyList";
import { useFocusEffect } from "@react-navigation/native";
import {
  getAllTradeRecords,
  getTradesByDay,
  getTradesByMonth,
  getTradesByRange,
  getTradesByWeek,
  searchForSymbol,
} from "../../api/journalApi";
import JournalCard from "../../components/JournalCard";

const CustomDate = ({ getStartDate, getEndDate, getRangeData }) => {
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isNFocused, setIsNFocused] = useState(false);
  const [isUNFocused, setIsUNFocused] = useState(false);
  const [isStartValidFormat, setIsStartValidFormat] = useState(false);
  const [isEndValidFormat, setIsEndValidFormat] = useState(false);

  const screenHeight = Dimensions.get("window").height;

  const validateStartDateFormat = (input) => {
    
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    const isValid = dateFormatRegex.test(input);
    if(input.length === 0){
      setIsStartValidFormat(false);
    }else {
      setIsStartValidFormat(!isValid);
    }

    return isValid;
  };

  const validateEndDateFormat = (input) => {
  
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    const isValid = dateFormatRegex.test(input);

    if(input.length === 0){
      setIsEndValidFormat(false);
    }else {
      setIsEndValidFormat(!isValid);
    }

    return isValid;
  };

  return (
    <ScrollView style={{ paddingHorizontal: SIZES.medium, height: screenHeight}}>
      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          Start Date
        </Text>
        <TextInput
          placeholder="yyyy-mm-dd"
          placeholderTextColor={COLORS.gray}
          style={styles.email(startDate)}
          onFocus={() => {
            setStartDate(true);
          }}
          onBlur={() => {
            setStartDate(false);
          }}
          onChangeText={(val) => {
            setStartValue(val);
            validateStartDateFormat(val);
            getStartDate(val);
          }}
          value={startValue}
        />
        {isStartValidFormat && <Text style={{ color: "red", paddingLeft: SIZES.small - 4}}>
          Invalid date format
        </Text>}
      </View>

      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          End Date
        </Text>
        <TextInput
          placeholder="yyyy-mm-dd"
          placeholderTextColor={COLORS.gray}
          style={styles.email(endDate)}
          onFocus={() => {
            setEndDate(true);
          }}
          onBlur={() => {
            setEndDate(false);
          }}
          onChangeText={(val) => {
            setEndValue(val);
            getEndDate(val);
            validateEndDateFormat(val)
          }}
          value={endValue}
        />
        {isEndValidFormat && <Text style={{ color: "red", paddingLeft: SIZES.small - 4}}>
          Invalid date format
        </Text>}
      </View>

      <TouchableOpacity
        onPress={() => {
          //   navigate("AutoTrader");
          getRangeData();
        }}
        style={styles.button}
      >
        {isClicked ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttontext}>Get Records</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const TradingJournal = () => {
  const [allPressed, setAllPressed] = useState(true);
  const [alertPressed, setAlertPressed] = useState(false);
  const [ongoingPressed, setOngoingPressed] = useState(false);
  const [exitPressed, setExitPressed] = useState(false);
  const [custom, setCustom] = useState(false);
  const [todayPressed, setTodayPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [tradeRecords, setTradeRecords] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const setStartDateValue = (start) => {
    setStartDate(start);
  };

  const setEndDateValue = (end) => {
    setEndDate(end);
  };

  const { accountDetails } = useContext(AuthContext);

  const getAllRecords = async () => {
    try {
      setIsLoading(true);
      const response = await getTradesByDay(accountDetails.accountId).then(
        (res) => {
          return res.data;
        }
      );

      if (response.status) {
        if (response.data.length == 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
          setTradeRecords(response.data);
        }
      } else {
        console.log(response.message);
        setError(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllRecords();
  }, []);

  const getTradesByDateRange = async () => {
    try {
      setIsLoading(true);
      const response = await getTradesByRange(
        startDate,
        endDate,
        accountDetails.accountId
      ).then((res) => {
        return res.data;
      });

      if (response.status) {
        if (response.data.length == 0) {
          setIsEmpty(true);
        } else {
          setTradeRecords(response.data);
        }
      } else {
        console.log(response.message);
      }
      setIsLoading(false);
      setCustom(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
      setCustom(false);
    }
  };

  const setRestInActive = async (item) => {
    let search = "";
    if (item == "exit") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
      setTodayPressed(false);
    } else if (item == "All") {
      // search = item;
      // setAlertPressed(false);
      // setOngoingPressed(false);
      // setExitPressed(false);
      // setCustom(false);
      // setTodayPressed(false);
      // try {
      //   setIsLoading(true);
      //   const response = await getAllTradeRecords(
      //     accountDetails.accountId
      //   ).then((res) => {
      //     return res.data;
      //   });
      //   if (response.status) {
      //     if (response.data.length == 0) {
      //       setIsEmpty(true);
      //     } else {
      //       setIsEmpty(false);
      //       setTradeRecords(response.data);
      //     }
      //   } else {
      //     console.log(response.message);
      //   }
      //   setIsLoading(false);
      // } catch (error) {
      //   console.log(error);
      //   setError(true);
      //   setIsLoading(false);
      // }
    } else if (item == "month") {
      search = item;
      setExitPressed(false);
      setAlertPressed(false);
      setAllPressed(false);
      setCustom(false);
      setTodayPressed(false);
      try {
        setIsLoading(true);
        const response = await getTradesByMonth(accountDetails.accountId).then(
          (res) => {
            return res.data;
          }
        );

        if (response.status) {
          if (response.data.length == 0) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
            setTradeRecords(response.data);
          }
        } else {
          console.log(response.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
      }
    } else if (item == "week") {
      search = item;
      setExitPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
      setCustom(false);
      setTodayPressed(false);
      try {
        setIsLoading(true);
        const response = await getTradesByWeek(accountDetails.accountId).then(
          (res) => {
            return res.data;
          }
        );

        if (response.status) {
          if (response.data.length == 0) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
            setTradeRecords(response.data);
          }
        } else {
          console.log(response.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
      }
    } else if (item == "Today") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setExitPressed(false);
      setCustom(false);
      setAllPressed(false);
      try {
        setIsLoading(true);
        const response = await getTradesByDay(accountDetails.accountId).then(
          (res) => {
            return res.data;
          }
        );
        if (response.status) {
          if (response.data.length == 0) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
            setTradeRecords(response.data);
          }
        } else {
          console.log(response.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
      }
    }
    return search;
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllRecords();
    }, [accountDetails])
    
  );
  const [searchTerm, setSearchTerm] = useState("");

  const searchRecordsBySymbol = async () => {
    try {
      if (searchTerm.length === 0) {
        Alert.alert("", "Please enter a valid asset/symbol to search");
      } else {
        setIsLoading(true);
        const response = await searchForSymbol(
          accountDetails.accountId,
          searchTerm
        ).then((res) => {
          return res.data;
        });
        if (response.status) {
          if (response.data.length === 0) {
            setIsEmpty(true);
          } else {
            setTradeRecords(response.data);
            setIsEmpty(false);
          }
          setIsLoading(false);
        } else {
          setIsEmpty(true);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.base}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 5,
          rowGap: SIZES.medium,
        }}
      >
        <Text style={styles.desc}>
          Your trade journal comprises all the positions you have completed in
          this account. PsyDTrader sends you regular reports on all records for
          the month with insights to help improve your trade.
        </Text>

        <Image
          source={require("../../assets/images/3.png")}
          style={{ height: 80, width: 80 }}
        />
      </View>
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

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            searchRecordsBySymbol();
          }}
        >
          <Image
            source={require("../../assets/icons/search.png")}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={{ padding: SIZES.small, marginTop: SIZES.medium }}>
        <ScrollView
          styles={styles.container}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row", gap: SIZES.small - 2 }}>
            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 80,
                padding: SIZES.small - 3,
                backgroundColor: todayPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setTodayPressed(true);
                setRestInActive("Today");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Today</Text>
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
                setRestInActive("week");
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
                setRestInActive("month");
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

      {/* <View style={{ gap: SIZES.small}}> */}
      {isLoading ? (
        <ActivityIndicator size="large" colors={COLORS.darkyellow} />
      ) : error ? (
        <EmptyList message={"Something went wrong. Please retry"} />
      ) : isEmpty ? (
        <EmptyList message={"No records at this time"} />
      ) : (
        <FlatList
          data={tradeRecords}
          renderItem={({ item }) => (
            <JournalCard
              item={item}
              handleCardPress={() => {
                // navigate("RecordDetails", { details : item });
              }}
            />
          )}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          vertical
          showsHorizontalScrollIndicator={false}
        />
      )}
      {/* </View> */}
      {custom && (
        <CustomDate
          getStartDate={setStartDateValue}
          getEndDate={setEndDateValue}
          getRangeData={getTradesByDateRange}
        />
      )}
    </View>
  );
};

export default TradingJournal;
