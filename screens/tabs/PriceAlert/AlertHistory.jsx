import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { getAlertsByDateRange, getAlertsByRagne, getAlertsForTheDay, getAllUserAlert, searchForSymbol } from "../../../api/priceAlertApi";
import EmptyList from "../../../components/EmptyList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../../context/AuthContext";

const CustomDate = ({ getStartDate, getEndDate, getAlertsByRagne }) => {
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [startValue, setStartValue] = useState("")
  const [endValue, setEndValue] = useState("")
  const [isNFocused, setIsNFocused] = useState(false);
  const [isUNFocused, setIsUNFocused] = useState(false);
  const [isStartValidFormat, setIsStartValidFormat] = useState(false);
  const [isEndValidFormat, setIsEndValidFormat] = useState(false);

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
    <View style={{ paddingHorizontal: SIZES.medium }}>
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
          getAlertsByRagne()
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

const Alerts = ({ alerts }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("AlertDetails", { alertDetails: alerts, fromhistory: true });
      }}
    >
      <View style={styles.alertlist}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 0.2,
            width: 320,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/icons/dollar.png")}
              resizeMode="contain"
              style={[
                styles.image,
                {
                  marginTop: 5,
                },
              ]}
            />
            <View style={{ marginBottom: 5, alignSelf: "flex-start" }}>
              <Text style={[styles.text, styles.btc]}>{alerts.symbol}</Text>
              <Text
                style={[styles.text, { marginLeft: 10, fontSize: SIZES.small }]}
              >
                Trigger date: {alerts.alertTriggerTime}
              </Text>
            </View>
          </View>

          <View style={{ width: 120 }}>
            <Text
              style={[
                styles.text,
                {
                  marginLeft: 65,
                  marginTop: 7,
                },
              ]}
            >
              {alerts.position}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  marginLeft: 65,
                  color: COLORS.darkyellow,
                },
              ]}
            >
              {alerts.watchPrice}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SearchFilter = ({ id, updateList, updateLoading, updateEmpty }) => {
  const [allPressed, setAllPressed] = useState(true);
  const [alertPressed, setAlertPressed] = useState(false);
  const [ongoingPressed, setOngoingPressed] = useState(false);
  const [exitPressed, setExitPressed] = useState(false);
  const [custom, setCustom] = useState(false);
  const [todayPressed, setTodayPressed] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setStart = (val) => {
    setStartDate(val);
  }
  const setEnd = (val) => {
    setEndDate(val);
  }
  
  const { accountDetails } = useContext(AuthContext);

  const getAlertsForToday = async() => {
    updateLoading(true);
    const response = await getAlertsForTheDay(id).then((res) => {
      return res.data;
    })
    if (response.status) {
      if (response.data.length == 0) {
        updateEmpty(true);
      } else {
        updateList(response.data);
        updateEmpty(false);
      }
    } else {
      console.log(response.message);
    }
    updateLoading(false);
  }

  const getByTimeRange = async(range) => {
    updateLoading(true);
    const response = await getAlertsByRagne(id, range).then((res) => {
      return res.data;
    })
    if (response.status) {
      if (response.data.length == 0) {
        updateEmpty(true);
      } else {
        updateList(response.data);
        updateEmpty(false);
      }
    } else {
      console.log(response.message);
    }
    updateLoading(false);
  }

  const getAssetsByDateRange = async () => {
    try {
      setIsLoading(true);
      const response = await getAlertsByDateRange(
        startDate,
        endDate,
        accountDetails.accountId
      ).then((res) => {
        return res.data;
      });
      if (response.status) {
        if (response.data.length == 0) {
          updateEmpty(true);
        } else {
          updateList(response.data);
          updateEmpty(false);
        }
      } else {
        console.log(response.message);
      }
      updateLoading(false);
      setCustom(false);
    } catch (error) {
      console.log(error);
      setError(true);
      updateLoading(false);
      setCustom(false);
    }
  };

  const setRestInActive = (item) => {
    let search = "All";
    if (item == "exit") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
      setTodayPressed(false);
    } else if (item == "Today") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setExitPressed(false);
      setCustom(false);
      setAllPressed(false);
      getAlertsForToday();
    } else if (item == "Last Week") {
      search = item;
      setExitPressed(false);
      setAllPressed(false);
      setCustom(false);
      setTodayPressed(false);
      setOngoingPressed(false);
      getByTimeRange(7);
    } else if (item == "Month") {
      search = item;
      setExitPressed(false);
      setAllPressed(false);
      setCustom(false);
      setAlertPressed(false);
      setTodayPressed(false);
      getByTimeRange(30);
    }

    return search;
  };
  const [searchTerm, setSearchTerm] = useState("");

  const searchByAssetName = async () => {
    try {
      if (searchTerm.length === 0) {
        Alert.alert("", "Please enter a valid asset/symbol to search");
      } else {
        updateLoading(true)
        const response = await searchForSymbol(
          accountDetails.accountId,
          searchTerm,
          false
        ).then((res) => {
          return res.data;
        });
        if (response.status) {
          updateList(response.data);
          updateLoading(false)
        }else{
          updateLoading(false);
          Alert.alert("Empty", "No alerts with this symbol");
          console.log(response.message);
        }
      }
    } catch (error) {
      updateLoading(false)
      Alert.alert("Failed transaction", "Something went wrong, please try again");
      console.log(error);
    }
  };
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

        <TouchableOpacity style={styles.searchBtn}
          onPress={() => {
            searchByAssetName();
          }}
        >
          <Image
            source={require("../../../assets/icons/search.png")}
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
                setRestInActive("Last Week");
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
                setRestInActive("Month");
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

      {custom && <CustomDate getStartDate={setStart} getEndDate={setEnd} getAlertsByRagne={getAssetsByDateRange} />}
    </View>
  );
};

const AlertHistory = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [alertList, setAlertList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [useCurrentList, setUseCurrentList] = useState(false);

  const route = useRoute();

  const inactiveAlertList = route.params?.inactiveList || null;

  // console.log(inactiveAlertList);

  const { accountDetails } = useContext(AuthContext);

  useEffect(() => {
    if(inactiveAlertList.length === 0){
      setIsEmpty(true);
    }
  }, []);

  const updateList = (value) => {
    setAlertList(value)
    setUseCurrentList(true)
  }

  const updateLoading = (value) => {
    setIsLoading(value);
  }

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);

  //   setIsLoading(true);
  //   setError(false);
  //   getAllUserAlert(accountDetails.accountId)
  //     .then((res) => {
  //       let alerts = res.data.data;
  //       if (res.data.status) {
  //         setIsEmpty(false);
  //         setIsLoading(false);
  //         setAlertList(alerts.inactiveAlertList);
  //         // console.log(alerts.inactiveAlertList);
  //       }
  //       setRefreshing(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(true);
  //       setRefreshing(false);
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <View style={styles.baseContainer}>
      <SearchFilter id={accountDetails.accountId} updateLoading={updateLoading} updateList={updateList} updateEmpty={setIsEmpty}/>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.darkyellow} />
      ) : error ? (
        <EmptyList message={"Something went wrong."} />
      ) : isEmpty ? (
        <EmptyList message={"No History on alerts"} />
      ) : (
        <FlatList
          data={useCurrentList ? alertList : inactiveAlertList}
          renderItem={({ item }) => <Alerts alerts={item} />}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={onRefresh}
          //     colors={["#0000ff"]}
          //   />
          // }
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{ rowGap: SIZES.medium + 5 }}
          vertical
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default AlertHistory;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: "#111",
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
  },
  image: {
    height: 26,
    width: 30,
    marginBottom: 10,
  },
  line: {
    backgroundColor: "white",
    height: 0.4,
    width: 120,
    marginTop: 5,
  },
  alertlist: {
    alignItems: "center",
    marginTop: 10,
    gap: 30,
  },
  btc: {
    fontSize: SIZES.medium,
    fontWeight: "400",
    marginLeft: 10,
  },
  trigger: {
    marginLeft: 10,
  },
  email: (focused) => ({
    borderColor: focused ? COLORS.darkyellow : COLORS.gray,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    height: 50,
    color: COLORS.white,
  }),
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    marginHorizontal: SIZES.small,
    // padding: SIZES.small - 6,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.darkyellow,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginVertical: 30,
    marginBottom: 40,
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
