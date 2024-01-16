import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import ActiveAlertCard from "./ActiveAlertCard";
import LinearGradient from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

import styles from "./activealert.style";
import { useNavigation } from "@react-navigation/native";
import { getAllActiveAlerts } from "../../api/dashboardApi";
import EmptyList from "../EmptyList";

const ActiveAlert = ({ empty, activeAlerts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [alertList, setAlertList] = useState([]);

  const { navigate } = useNavigation()


  // useEffect(() => {
  //   setIsLoading(true);
  //   setError(false)
  //   getAllActiveAlerts(account.accountId).then((res) => {
  //     let alerts = res.data.data
  //     if (res.data.status) {
  //       if (alerts.length == 0) {
  //         setIsEmpty(true);
  //         setIsLoading(false)
  //       } else {
  //         setIsEmpty(false);
  //         setIsLoading(false);
  //         setAlertList(alerts);
  //       }
  //     }
  //   }).catch((error) => {
  //     console(error);
  //     setError(true);
  //   });
  // }, []);

  let text1 = "History";
  let text2 = "Show all";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Active Alerts</Text>
        <TouchableOpacity
          onPress={() => {
            navigate("PriceAlert");
          }}
        >
          <Text style={styles.headerBtn}>{isEmpty ? text1 : text2}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {empty ? (
          <EmptyList message={"No active Alerts"} />
        ) : (
          <FlatList
            data={activeAlerts}
            renderItem={({ item }) => (
              <ActiveAlertCard
                item={item}
                handleCardPress={() => {
                  navigate("AlertDetails", { alertDetails : item });
                }}
              />
            )}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default ActiveAlert;
