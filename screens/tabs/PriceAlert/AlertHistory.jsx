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
} from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { getAllUserAlert } from "../../../api/priceAlertApi";
import EmptyList from "../../../components/EmptyList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../../context/AuthContext";

const CustomDate = () => {
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
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
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          //   navigate("AutoTrader");
          // getRangeData();
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
        navigation.navigate("AlertDetails", { alertDetails: alerts });
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
                Trigger date: Oct 20, 2020
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

const SearchFilter = () => {
  const [allPressed, setAllPressed] = useState(true);
  const [alertPressed, setAlertPressed] = useState(false);
  const [ongoingPressed, setOngoingPressed] = useState(false);
  const [exitPressed, setExitPressed] = useState(false);
  const [custom, setCustom] = useState(false);
  const [todayPressed, setTodayPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setRestInActive = (item) => {
    let search = "All";
    if (item == "exit") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
      setTodayPressed(false);
    } else if (item == "All") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setExitPressed(false);
      setCustom(false);
      setTodayPressed(false);
    } else if (item == "Today") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setExitPressed(false);
      setCustom(false);
      setAllPressed(false);
    } else if (item == "ongoing") {
      search = item;
      setExitPressed(false);
      setAlertPressed(false);
      setAllPressed(false);
      setCustom(false);
      setTodayPressed(false);
    } else if (item == "alerts") {
      search = item;
      setExitPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
      setCustom(false);
      setTodayPressed(false);
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

const AlertHistory = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [alertList, setAlertList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const route = useRoute();

  const inactiveAlertList = route.params?.inactiveList || null;

  // console.log(inactiveAlertList);

  const { accountDetails } = useContext(AuthContext);

  useEffect(() => {
    if(inactiveAlertList.length === 0){
      setIsEmpty(true);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setIsLoading(true);
    setError(false);
    getAllUserAlert(accountDetails.accountId)
      .then((res) => {
        let alerts = res.data.data;
        if (res.data.status) {
          setIsEmpty(false);
          setIsLoading(false);
          setAlertList(alerts.inactiveAlertList);
          // console.log(alerts.inactiveAlertList);
        }
        setRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setRefreshing(false);
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={styles.baseContainer}>
      <SearchFilter />
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.darkyellow} />
      ) : error ? (
        <EmptyList message={"Something went wrong."} />
      ) : isEmpty ? (
        <EmptyList message={"No History on alerts"} />
      ) : (
        <FlatList
          data={inactiveAlertList.length == 0 ? alertList : inactiveAlertList}
          renderItem={({ item }) => <Alerts alerts={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#0000ff"]}
            />
          }
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
    fontSize: SIZES.large,
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
