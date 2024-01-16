import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";
import ActiveAlertsScreen from "./ActiveAlertsScreen";
import React, { useContext, useState, useEffect } from "react";
import { getAllUserAlert } from "../../../api/priceAlertApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../context/AuthContext";

const PriceAlert = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [alertList, setAlertList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});

  const { accountDetails } = useContext(AuthContext);

  const getAlertList = async () => {
    const response = await getAllUserAlert(accountDetails.accountId).then(
      (res) => {
        return res.data;
      }
    );

    if (response.status) {
      if (response.data.activeAlertList == 0) {
        setIsEmpty(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      setAlertList(response.data);
    }
  };

  useEffect(() => {
    getAlertList();
  }, []);

  
  return (
    <View style={styles.baseContainer}>
      <ActiveAlertsScreen alerts={alertList} account={accountDetails} />
    </View>
  );
};

export default PriceAlert;

const styles = StyleSheet.create({
  baseContainer: {
    flexGrow: 1,
    backgroundColor: "#111",
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
  tabBar: {
    width: "95%",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
    alignSelf: "center",
    backgroundColor: "#111",
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
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    marginHorizontal: SIZES.small,
    marginBottom: SIZES.large,
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
});
