import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Accountdetails from "./Accountdetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./dashboard.style";
import ActiveAlert from "../../../components/activealert/ActiveAlert";
import ActiveTrade from "../../../components/activetrades/ActiveTrade";
import { COLORS, SIZES } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import {
  getAllActiveTrades,
  getUserDashboard,
  getUserDashboardInfo,
} from "../../../api/dashboardApi";
import CloseTrades from "../../../components/CloseTrades";
import ActiveTrades from "../../../components/activetrades/ActiveTrades";
import { registerMetaApiAccount } from "../../../api/accountApi";

import messaging from "@react-native-firebase/messaging";
import { loadCustomFont } from "../../../components/exits/exitlevelcard.style";
import { loadThemeCustomFont } from "../../../constants/theme";
import { saveFireBaseToken } from "../../../api/userApi";

const Dashboard = () => {
  const [accountDetail, setAccountDetail] = useState({});
  const [dataArrived, setDataArrived] = useState(false);
  const [alertList, setAlertList] = useState([]);
  const [tradeList, setTradeList] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [tradeEmpty, setTradeEmpty] = useState(false);
  const [alertEmpty, setAlertEmpty] = useState(false);
  const [confirmEntries, setConfirmEntries] = useState([]);
  const [problemTrades, setProblemTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const { userInfo, updateAccount, updateNotification, accountDetails, logout } =
    useContext(AuthContext);

  // console.log(accountDetails);
  // console.log(userInfo);

  let accountId;
  let accountNumber;

  accountId =
    accountDetails === null ? userInfo.user.userId : accountDetails.userId;
  accountNumber =
    accountDetails === null
      ? userInfo.user.defaultAccountNumber
      : accountDetails.accountNumber;

  // accountId = userInfo.user.userId;
  // accountNumber = userInfo.user.defaultAccountNumber;

  let trades;
  let alerts;

  const getAccountDetails = () => {
    getUserDashboardInfo(accountId, accountNumber)
      .then((res) => {
        if (!res.status) {
          console.log("Something went wrong with dashboard");
        }else if(res.status === 401){
          logout();
        }
        return res.data;
      })
      .then((data) => {
        setAccountDetail(data.data.account);
        updateAccount(data.data.account);
        let trades = data.data.activeTrades;
        let alerts = data.data.activeAlerts;
        let problemTrades = data.data.troubleSomeTrades;
        let entries = data.data.confirmEntries;

        setConfirmEntries(entries);
        setProblemTrades(problemTrades);
        if (trades.length == 0) {
          setTradeEmpty(true);
        }
        if (alerts.length == 0) {
          setAlertEmpty(true);
        }
        setTradeList(data.data.activeTrades);
        setAlertList(data.data.activeAlerts);
        setDashboard(data.data);
        setDataArrived(true);
        AsyncStorage.setItem("accountInfo", JSON.stringify(data.data.account));
      })
      .catch((error) => {
        console.log(error);
      });

    // const actDetails = {
    //   brokerServer: accountDetails.server,
    //   login: accountDetails.accountNumber,
    //   platForm: accountDetails.metaPlatform,
    //   userId: userInfo.user.userId,
    //   userName: userInfo.user.userName,
    // };

    // const res = await registerMetaApiAccount(actDetails);
  };

  const requestUserPermission = async () => {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      messaging().registerDeviceForRemoteMessages();
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setDataArrived(false);
    getAccountDetails();
    
    if (requestUserPermission()) {
      // console.log(userInfo);
      messaging()
        .getToken()
        .then(async (token) => {
          const response = await saveFireBaseToken(token, accountId).then(
            (res) => {
              return res.data;
            }
          );
          if (response.status) {
            // console.log(token);
          } else {
            console.log(response.message);
          }
        });
    } else {
      console.log("failed attempt" + authStatus);
    }

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    // // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          //  setInitialRoute(remoteMessage.data.type);  e.g. "Settings"
        }
      });
    loadCustomFont();
    loadThemeCustomFont();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      updateNotification(true);
    });

    setIsLoading(false);
    setDataArrived(true);
    return unsubscribe;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const response = await getUserDashboardInfo(
          accountId,
          accountNumber
        ).then((res) => {
          return res;
        });
        if(response.status === 401){
          logout();
        }else if (response.data.status) {
          // console.log(response.data);
          let activeTrades = response.data.data.activeTrades;
          let activeAlerts = response.data.data.activeAlerts;
          let problemTrades = response.data.data.troubleSomeTrades;
          let entries = response.data.data.confirmEntries;

          setConfirmEntries(entries);
          setProblemTrades(problemTrades);
          setAccountDetail(response.data.data.account);
          updateAccount(response.data.data.account);
          if (activeTrades.length == 0) {
            setTradeEmpty(true);
          } else {
            setTradeList(activeTrades);
            setTradeEmpty(false);
          }

          if (activeAlerts.length == 0) {
            setAlertEmpty(true);
          } else {
            setAlertList(activeAlerts);
            setAlertEmpty(false);
          }
        } else {
          console.log(response.data.message);
        }
      }
      fetchData();
    }, [accountNumber])
  );


  if (isLoading) {
    return (
      <View style={{ backgroundColor: COLORS.appBackground, flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.small + 3,
        backgroundColor: "#111",
      }}
    >
      <ScrollView>
        <Accountdetails account={accountDetail} />
        {dataArrived && (
          <ActiveAlert activeAlerts={alertList} empty={alertEmpty} />
        )}
        {/* {dataArrived && <CloseTrades account={accountDetail} />} */}
        {dataArrived && (
          <ActiveTrade
            trades={tradeList}
            empty={tradeEmpty}
            entries={confirmEntries}
          />
        )}
      </ScrollView>
      
    </View>
  );
};

export default Dashboard;
