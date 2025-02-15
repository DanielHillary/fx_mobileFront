import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Linking,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import {
  getAlertCategory,
  getNotifications,
  removeFromList,
} from "../../api/notificationApi";
import { getTradeAnalysis } from "../../api/tradeAnalysisApi";
import EmptyList from "../../components/EmptyList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationCard = ({ item, updateNoteList }) => {
  const navigation = useNavigation();

  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const checkTradeNotification = async () => {
    markAsRead();
    navigation.navigate("TradeReport", { data: item.responseId });
  };

  const checkPriceAlert = async () => {
    markAsRead();
    navigation.navigate("AlertHistory");
  };

  const markAsRead = async () => {
    let resp = await removeFromList(item.id).then((res) => {
      return res.data;
    });
    if (resp.status) {
      updateNoteList(item);
    } else {
      console.log(resp.message);
    }
  };

  return (
    <View
      style={{
        // flexDirection: "row",
        backgroundColor: COLORS.componentbackground,
        width: "100%",
        gap: SIZES.xSmall,
        padding: SIZES.xSmall,
        borderRadius: SIZES.small,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          source={require("../../assets/icons/notif.png")}
          resizeMode="contain"
          style={{ height: 20, width: 20, opacity: 0.7 }}
        />
        <View style={{ flexDirection: "row", width: "70%" }}>
          <Text
            style={{
              fontFamily: FONT.bold,
              color: COLORS.lightWhite,
              fontSize: SIZES.medium - 3,
            }}
          >
            Title:
          </Text>
          <Text
            style={{
              fontFamily: FONT.bold,
              color: COLORS.darkyellow,
              fontSize: SIZES.medium,
              marginLeft: 4,
            }}
          >
            {item.title}
          </Text>
        </View>
        <Text style={{ color: COLORS.lightWhite, fontSize: SIZES.xSmall }}>
          {item.notificationTime}
        </Text>
      </View>

      <Text style={{ color: COLORS.lightWhite, marginLeft: 28 }}>
        {item.content}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.small,
        }}
      >
        <TouchableOpacity
          style={styles.read}
          onPress={() => {
            markAsRead();
          }}
        >
          <Text style={{ color: COLORS.darkyellow }}>Mark as read</Text>
        </TouchableOpacity>

        {item.title !== "Invalid Entry" && (
          <TouchableOpacity
            style={styles.viewing}
            onPress={() => {
              if (item.notificationCategory == "Trades") {
                checkTradeNotification();
              }
              if (item.notificationCategory == "Entry") {
                markAsRead();
                navigation.navigate("ConfirmEntry", {
                  tradeDetail: item.metaOrderId,
                });
              }
              if (item.notificationCategory == "Price Alert") {
                checkPriceAlert();
              }
              if (item.notificationCategory == "Exit Level") {
                markAsRead();
                navigation.navigate("Home");
              }
              if (item.notificationCategory == "Closed Trade") {
                markAsRead();
                navigation.navigate("TradingJournal");
              }
              if (item.notificationCategory == "Telegram") {
                openURL("https://t.me/PsyDTradingBot");
                markAsRead();
              }
              if (item.notificationCategory === "Limit") {
                markAsRead();
                navigation.navigate("Plan");
              }
              if (item.notificationCategory === "Account Update") {
                markAsRead();
                navigation.navigate("Pricing");
              }
            }}
          >
            <Text style={{ color: COLORS.darkyellow }}>View</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const Notification = () => {
  const [allPressed, setAllPressed] = useState(true);
  const [alertPressed, setAlertPressed] = useState(false);
  const [ongoingPressed, setOngoingPressed] = useState(false);
  const [exitPressed, setExitPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState([]);
  const [analysisPressed, setAnalysisPressed] = useState(false);
  const [accountInfo, setAccountInfo] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const { accountDetails, updateNotification } = useContext(AuthContext);

  const setAccountUp = async () => {
    let account = await AsyncStorage.getItem("accountInfo").then((res) => {
      return JSON.parse(res);
    });

    if (account === null && accountDetails === null) {
      setWaiting(true);
    }
    if (accountDetails === null || accountDetails.length === 0) {
      setAccountInfo(account);
      setWaiting(false);
      getAllNotification(account.accountId);
    } else {
      setAccountInfo(accountDetails);
      setWaiting(false);
      getAllNotification(accountDetails.accountId);
    }
  };

  const updateList = (item) => {
    const newArray = notification.filter((obj) => obj.id !== item.id);
    setNotification(newArray);
    if (newArray.length == 0) {
      setError(true);
      updateNotification(false);
    }
  };

  const getAllNotification = async (id) => {
    setIsLoading(true);
    const response = await getNotifications(id).then((res) => {
      return res.data;
    });

    if (response.status) {
      if (response.data.length == 0) {
        setError(true);
        updateNotification(false);
      } else {
        setNotification(response.data);

        setError(false);
      }
    } else {
      console.log(response.message);
    }
    setIsLoading(false);
  };

  const getCategoryNotification = async (category) => {
    setIsLoading(true);
    try {
      const response = await getAlertCategory(
        accountInfo.accountId,
        category
      ).then((res) => {
        return res.data;
      });
      if (response.status) {
        if (response.data.length == 0) {
          setError(true);
          updateNotification(false);
        } else {
          setNotification(response.data);
          setError(false);
        }
      } else {
        console.log(response.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setAccountUp();
  }, []);

  const onRefresh = useCallback(() => {
    // Set refreshing to true to show the loading indicator
    setRefreshing(true);
    getAllNotification(accountInfo.accountId);
    setRefreshing(false);
  }, []);

  const setRestInActive = (item) => {
    let search = "All";
    if (item == "Exit Level") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
      setAnalysisPressed(false);
      getCategoryNotification(item);
    } else if (item == "All") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setExitPressed(false);
      setAnalysisPressed(false);
      getAllNotification(accountInfo.accountId);
    } else if (item == "Trades") {
      search = item;
      setExitPressed(false);
      setAlertPressed(false);
      setAllPressed(false);
      setAnalysisPressed(false);
      getCategoryNotification(item);
    } else if (item == "Price Alert") {
      search = item;
      setExitPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
      setAnalysisPressed(false);
      getCategoryNotification(item);
    } else if (item == "Entry") {
      search = item;
      setExitPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
      setAlertPressed(false);
      getCategoryNotification(item);
    }
    return search;
  };

  if (waiting || accountInfo === null) {
    return (
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
    );
  }

  return (
    <View style={styles.base}>
      <View>
        <ScrollView styles={styles.container} horizontal={true}>
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
                setRestInActive("Price Alert");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Price Alerts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 80,
                padding: SIZES.small - 3,
                backgroundColor: analysisPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setAnalysisPressed(true);
                setRestInActive("Entry");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Entry</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 80,
                padding: SIZES.small - 3,
                backgroundColor: ongoingPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setOngoingPressed(true);
                setRestInActive("Trades");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Trades</Text>
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
                setRestInActive("Exit Level");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Exit Levels</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.darkyellow} />
        ) : error ? (
          <EmptyList message={"No notifications at this time"} />
        ) : (
          <FlatList
            data={notification}
            renderItem={({ item }) => (
              <NotificationCard item={item} updateNoteList={updateList} />
            )}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={{ rowGap: SIZES.small }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#0000ff"]} // Set the color of the refresh indicator
              />
            }
            vertical
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    padding: SIZES.small,
  },
  container: {
    padding: SIZES.medium,
  },
  cardsContainer: {
    flex: 1,
    marginTop: SIZES.medium,
    padding: SIZES.xSmall - 6,
    alignSelf: "center",
  },
  read: {
    color: "green",
    alignSelf: "center",
  },
  viewing: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 30,
    width: 120,
    borderColor: COLORS.darkyellow,
    borderRadius: SIZES.small - 4,
    borderWidth: 1,
  },
});
