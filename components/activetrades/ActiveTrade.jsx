import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import LinearGradient from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./activetrade.style";
import ActiveTradeCard from "./ActiveTradeCard";
import { getAllActiveTrades } from "../../api/dashboardApi";
import EmptyList from "../EmptyList";

const ActiveTrade = ({ trades, empty}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [tradeList, setTradeList] = useState([]);

  useEffect(() => {
    // setIsLoading(true);
    setIsEmpty(false);
    // getAllActiveTrades(account.metaApiAccountId)
    //   .then((res) => {
    //     let alerts = res.data.data;
    //     console.log(res.data);
    //     if (res.data.status) {
    //       if (alerts.activeTrades.length == 0) {
    //         setIsEmpty(true);
    //         setIsLoading(false)
    //       } else {
    //         setIsLoading(false);
    //         setIsEmpty(false);
    //         setTradeList(alerts.activeTrades);
    //       }
    //     }else{
    //       setIsLoading(false)
    //       setError(true);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setError(true)
    //   });
    // if(trades.length == 0){
    //   setIsEmpty(true)
    // }else{
    //   setTradeList(trades);
    // }
    // setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trades</Text>
      </View>
      <View style={styles.cardsContainer}>
        {empty ? (
          <EmptyList message={"No active Trades"} />
        ) : (
          // <FlatList
          //   data={tradeList}
          //   renderItem={({ item }) => <ActiveTradeCard item={item} />}
          //   keyExtractor={(item) => item?.id}
          //   contentContainerStyle={{ rowGap: SIZES.small }}
          //   vertical
          //   showsHorizontalScrollIndicator={false}
          // />
          <View style={{gap: SIZES.small, marginTop: SIZES.small}}>
            {trades?.map((item) => (
              <ActiveTradeCard key={item.id} item={item}/>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default ActiveTrade;
