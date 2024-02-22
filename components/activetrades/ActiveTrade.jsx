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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "./activetrade.style";
import ActiveTradeCard from "./ActiveTradeCard";
import { getAllActiveTrades } from "../../api/dashboardApi";
import EmptyList from "../EmptyList";
import AwesomeAlert from "react-native-awesome-alerts";

const AlertModal = ({
  title,
  isAlert,
  handleConfirm,
  handleCancel,
  showCancelButton,
  showConfirmButton,
  message,
  item,
}) => {
  return (
    <View>
      <AwesomeAlert
        show={isAlert}
        title={title}
        titleStyle={styles.title}
        contentContainerStyle={styles.alertContainer}
        showConfirmButton={showConfirmButton}
        showCancelButton={showCancelButton}
        cancelButtonColor={COLORS.darkyellow}
        cancelButtonTextStyle={styles.alertText}
        cancelText="Ignore"
        confirmButtonColor={COLORS.darkyellow}
        confirmButtonTextStyle={styles.alertText}
        confirmText="Confirm"
        onCancelPressed={handleCancel}
        onConfirmPressed={handleConfirm}
        onDismiss={handleCancel}
        message={message}
        messageStyle={styles.alertMessage}
      />
    </View>
  );
};

const ActiveTrade = ({ trades, empty, entries }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [tradeList, setTradeList] = useState([]);
  const [check, setCheck] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    if(!trades.confirmEntries && !trades.ignoreEntries){
      setCheck(true);
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trades</Text>
      </View>
      <View style={styles.cardsContainer}>
        {empty ? (
          <EmptyList message={"No active Trades"} />
        ) : (
          <View style={{ gap: SIZES.small, marginTop: SIZES.small }}>
            {trades?.map((item) => (
              <ActiveTradeCard key={item.id} item={item} />
            ))}
          </View>
        )}
      </View>
      {entries?.map((item) => (
        <AlertModal
          isAlert={check}
          title={"Confirm Entries"}
          message={`Please confirm your entries plan for ${item.asset} trade with ${item.metaOrderId}` }
          handleCancel={() => {
            setCheck(false);
          }}
          handleConfirm={() => {
            setCheck(false);
            navigation.navigate("ConfirmEntry", { tradeDetail : item.metaOrderId })
          }}
          showCancelButton={true}
          showConfirmButton={true}
          item={item}
          key={item.id}
        />
      ))}
    </View>
  );
};

export default ActiveTrade;
