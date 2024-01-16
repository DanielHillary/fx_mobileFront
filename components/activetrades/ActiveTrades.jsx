import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import LinearGradient from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./activetrade.style";
import ActiveTradeCard from "./ActiveTradeCard";
import { getAllActiveTrades, getUserDashboard } from "../../api/dashboardApi";
import EmptyList from "../EmptyList";
import ActiveAlert from "../activealert/ActiveAlert";
import CloseTrades from "../CloseTrades";
import AccountDetails from "../../screens/tabs/dashboard/Accountdetails";
import { AuthContext } from "../../context/AuthContext";
import { getUserAccont, registerMetaApiAccount } from "../../api/accountApi";

const ActiveTrades = ({
  dashboard,
  account,
  dataArrived,
  updateDataArrived,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [tradeList, setTradeList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeDash, setActiveDash] = useState({});
  const [accountDetails, setAccountDetails] = useState({});
  const [arrived, setArrived] = useState(false);
  const [useCurrentDash, setUseCurrentDash] = useState(false);
  const [tradeEmpty, setTradeEmpty] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [alertEmpty, setAlertEmpty] = useState(false);

  const { userInfo, updateAccount } = useContext(AuthContext);

  const onLoaded = () => {
    setAlerts(dashboard.activeAlerts);
    setTradeList(dashboard.activeTrades);

    if (alerts.length == 0) {
      setAlertEmpty(true);
    }
    if (tradeList.length == 0) {
      setTradeEmpty(true);
    }
    setUseCurrentDash(true);
  };

  // useEffect(() => {
  //   onLoaded()
  // }, [])

  const onRefresh = async () => {
    const response = await getUserAccont(account.login).then((res) => {
      return res.data;
    })
    if(response.status){
      setAccountDetails(response.data);
    }else {
      console.log(response.message);
    }
    const actDetails = {
      brokerServer: account.server,
      login: account.accountNumber,
      platForm: account.metaPlatform,
      userId: userInfo.user.userId,
      userName: userInfo.user.userName,
    };
    const res = await registerMetaApiAccount(actDetails);
  };

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const response = await getAllActiveTrades(account.metaApiAccountId).then((res) => {
          return res.data;
        })
        if(response.status){
          let activeTrades = response.data.activeTrades;
          if(activeTrades.length == 0){
            setTradeEmpty(true);
          }else{
            setTradeList(response.data.activeTrades)
            setTradeEmpty(false);
            console.log("we move");
          }
        }
      }
      fetchData();
    }, [account.metaApiAccountId])
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.appBackground,
                marginBottom: SIZES.xSmall,
              }}
            >
              <ScrollView>
                <AccountDetails
                  account={useCurrentDash ? accountDetails : account}
                  dataArrived={dataArrived}
                />
                {alertEmpty ? (
                  <EmptyList message={"No active alerts"} />
                ) : (
                  <ActiveAlert
                    activeAlerts={dashboard.activeAlerts}
                    // activeAlerts={alerts}
                    dataArrived={dataArrived}
                    empty={alertEmpty}
                  />
                )}
                {dataArrived && <CloseTrades account={account} />}
                <View style={styles.header}>
                  <Text style={styles.headerTitle}>Trades</Text>
                </View>
              </ScrollView>
            </View>
          }
          data={tradeList}
          renderItem={({ item }) =>
            tradeEmpty ? (
              <EmptyList message={"No active trades"} />
            ) : (
              <ActiveTradeCard item={item} />
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["black"]} // Set the color of the refresh indicator
            />
          }
          keyExtractor={(item) => item?.id.toString()} // Ensure the key is a string
          contentContainerStyle={{ rowGap: SIZES.small }}
          vertical
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ActiveTrades;
