import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import { getAllActiveAlerts } from "../../../api/dashboardApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isNull } from "lodash";
import EmptyList from "../../../components/EmptyList";
import { searchForSymbol } from "../../../api/priceAlertApi";
import { LogBox } from "react-native";

const screenWidth = Dimensions.get('window').width;

const ActiveAlerts = ({ alerts, navigate }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigate("AlertDetails", { alertDetails: alerts });
      }}
    >
      <View style={styles.alertlist}>
        <View
          style={{
            flexDirection: "row",
            width: screenWidth/1.13,
            justifyContent: "space-between",
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
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.text}>{alerts.symbol}</Text>
              <Text style={[styles.text, { marginLeft: 10 }]}>
                Watch Price:{" "}
                <Text style={styles.trigger}>{alerts.watchPrice}</Text>
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: 5 }}>
            <Text style={[styles.text, { alignSelf: "flex-end" }]}>
              {alerts.openTime}
            </Text>
            <Text style={[styles.text, { marginLeft: 10 }]}>
              {alerts.subject}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ActiveAlertsScreen = ({ account, alerts }) => {
  // const [accountInfo, setAccountInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [alertList, setAlertList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [useCurrentList, setUseCurrentList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tempList, setTempList] = useState([]);

  useEffect(() => {
    let alertLists = alerts.activeAlertList;
    if (alertList.length == 0) {
      setIsEmpty(true);
      setUseCurrentList(true);
      setAlertList([{}]);
      console.log("It is empty");
    }
  }, []);

  const { navigate } = useNavigation();

  LogBox.ignoreLogs([`Warning: Each child in a list should have a unique "key" prop`]);

  const getCurrentAlerts = () => {
    getAllActiveAlerts(account.accountId)
      .then((res) => {
        let alerts = res.data.data;
        if (res.data.status) {
          if (alerts.length == 0) {
            setIsEmpty(true);
            setAlertList([{}]);
          } else {
            setAlertList(alerts);
            setIsEmpty(false);
          }
        } else {
          setAlertList([{}]);
          setRefreshing(false);
          console.log("Alerts went wrong");
        }
        setRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setRefreshing(false);
      });
  };

  const onRefresh = useCallback(() => {
    // Set refreshing to true to show the loading indicator
    setRefreshing(true);

    // setIsLoading(true);
    setError(false);
    setUseCurrentList(true);
    getCurrentAlerts();
  }, [account]);

  useFocusEffect(
    React.useCallback(() => {
      // async function fetchData() {
      getCurrentAlerts();
      // }
      // fetchData();
    }, [account])
  );

  const searchByAssetName = async () => {
    try {
      if (searchTerm.length === 0) {
        Alert.alert("", "Please enter a valid asset/symbol to search");
      } else {
        setIsLoading(true)
        const response = await searchForSymbol(
          account.accountId,
          searchTerm,
          true
        ).then((res) => {
          return res.data;
        });
        if (response.status) {
          setAlertList(response.data);
          setIsLoading(false)
          setUseCurrentList(true);
        }else{
          setIsLoading(false);
          Alert.alert("Empty", "No alerts with this symbol");
          console.log(response.message);
        }
      }
    } catch (error) {
      setIsLoading(false)
      Alert.alert("Failed transaction", "Something went wrong, please try again");
      console.log(error);
    }
  };

  return (
    <View style={styles.baseContainer}>
      <FlatList
        ListHeaderComponent={
          <View>
            <View>
              <Text style={styles.baseText}>Price Alert</Text>
              <Text style={styles.desc}>
                Set Alerts at important price zones to monitor and stay ahead of
                market conditions.
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: SIZES.medium + 7,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: SIZES.small - 8,
                }}
                onPress={() => {
                  navigate("SetAlert");
                }}
              >
                <Text style={styles.text}>Add Alert</Text>
                <Image
                  source={require("../../../assets/icons/add.png")}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate("AlertHistory", {
                    inactiveList: alerts.inactiveAlertList,
                  });
                }}
                style={{
                  alignSelf: "flex-end",
                  paddingHorizontal: SIZES.large,
                }}
              >
                <Text style={styles.headerBtn}>View History</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchWrapper}>
                <TextInput
                  style={styles.searchInput}
                  onChangeText={(text) => {
                    setSearchTerm(text);
                  }}
                  value={searchTerm}
                  placeholder="Pick an asset"
                ></TextInput>
              </View>

              <TouchableOpacity
                style={styles.searchBtn}
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
          </View>
        }
        data={useCurrentList ? alertList : alerts.activeAlertList}
        renderItem={({ item }) =>
          isLoading ? (
            <View
              style={{
                backgroundColor: COLORS.appBackground,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={"large"} />
            </View>
          ) : isEmpty ? (
            <EmptyList message={"No active Alerts"} />
          ) : (
            <ActiveAlerts key={item} alerts={item} navigate={navigate} />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0000ff"]} // Set the color of the refresh indicator
          />
        }
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ rowGap: SIZES.medium + 5 }}
        vertical
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ActiveAlertsScreen;

const styles = StyleSheet.create({
  baseContainer: {
    flexGrow: 1,
    backgroundColor: "#111",
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
    marginLeft: SIZES.small,
  },
  image: {
    height: 26,
    width: 30,
  },
  alertlist: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: SIZES.medium,
    marginTop: 10,
  },
  price: {
    color: COLORS.darkyellow,
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    marginLeft: 10,
  },
  trigger: {
    marginLeft: 10,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.darkyellow,
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 10,
    marginBottom: 30,
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
  baseText: {
    color: COLORS.lightWhite,
    padding: 5,
    marginHorizontal: 15,
    fontSize: SIZES.large * 1.5,
    fontFamily: FONT.bold,
  },
  desc: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.medium,
    width: "90%",
    paddingLeft: 5,
    marginHorizontal: 15,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    marginHorizontal: SIZES.small,
    // padding: SIZES.small - 6,
    height: 30,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.small,
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
    borderRadius: SIZES.small,
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
    marginTop: 10,
    marginBottom: 10,
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
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.darkyellow,
  },
});
