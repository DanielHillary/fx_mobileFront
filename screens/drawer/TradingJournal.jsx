import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "./tradingjournal.style";
import { COLORS, FONT, SIZES } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import EmptyList from "../../components/EmptyList";
import {
  getAllTradeRecords,
  getTradesByDay,
  getTradesByMonth,
  getTradesByRange,
  getTradesByWeek,
} from "../../api/journalApi";
import JournalCard from "../../components/JournalCard";

const CustomDate = ({ getStartDate, getEndDate, getRangeData }) => {
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isNFocused, setIsNFocused] = useState(false);
  const [isUNFocused, setIsUNFocused] = useState(false);

  return (
    <View style={{ paddingHorizontal: SIZES.medium }}>
      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
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
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
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
          <Text style={styles.buttonText}>Get Records</Text>
        )}
      </TouchableOpacity>
    </View>
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const setStartDateValue = (start) => {
    setStartDate(start);
  };

  const setEndDateValue = (end) => {
    setEndDate(end);
  };

  const { accountDetails } = useContext(AuthContext);

  const getAllRecords = async () => {
    setIsLoading(true);
    try {
      const response = await getTradesByDay(accountDetails.accountId).then(
        (res) => {
          return res.data;
        }
      );

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
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <View style={styles.base}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5, rowGap: SIZES.medium}}>
        <Text style={styles.desc}>
          Your trade journal comprises all the positions you have completed in
          this account. You can print them out to have a comprehensive insight
          into your trading habits over a period of time.
        </Text>
        <TouchableOpacity style={{}}>
          <Image
            source={require("../../assets/icons/printout.png")}
            style={{ height: 40, width: 40 }}
          />
        </TouchableOpacity>
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

        <TouchableOpacity style={styles.searchBtn}>
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
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}

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
        <EmptyList message={"Something went wrong. Please click to refresh"} />
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
