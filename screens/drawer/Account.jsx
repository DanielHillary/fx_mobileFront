import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, FONT } from "../../constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { getAllUserAccounts } from "../../api/accountApi";
import AlertModal from "../../components/modal/AlertModal";
import EmptyList from "../../components/EmptyList";

const AccountCard = ({
  item,
  currentAccount,
  handleNavigate,
  updateAccountDetails,
}) => {
  const [hasTrade, setHasTrade] = useState(true);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let accountDesc =
    "PsyDTrader account representaion of your metatrader account.";

  return (
    <View style={styles.accountCard}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Image
            source={require("../../assets/icons/profile.png")}
            style={styles.image}
          />

          <Text style={styles.id}>ID: {item.accountNumber}</Text>
          <Text style={{ fontSize: SIZES.small, color: COLORS.lightWhite }}>
            {item.broker}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor: item.inUse
                ? "#32CD32"
                : COLORS.componentbackground,
              borderRadius: 5,
              marginRight: 10,
            }}
          />
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/delete.png")}
              style={{ height: 25, width: 25 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{ color: COLORS.lightWhite, margin: 10 }}>
        {item.accountDescription == null && accountDesc}
      </Text>

      <View
        style={{
          marginVertical: 10,
          backgroundColor: COLORS.white,
          opacity: 0.5,
          width: 280,
          height: 0.5,
          alignSelf: "center",
        }}
      />

      <View style={styles.amount}>
        <Text
          style={{
            color: COLORS.lightWhite,
            fontFamily: FONT.bold,
            fontSize: SIZES.medium,
            padding: 7,
          }}
        >
          {formatter.format(item.accountBalance)}
        </Text>
        {currentAccount.accountId != item.accountId && (
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            onPress={() => {
              updateAccountDetails(item);
              handleNavigate.navigate("Home", { account: item });
            }}
          >
            <Text
              style={{ color: COLORS.darkyellow, fontSize: SIZES.xSmall + 2 }}
            >
              Switch to account
            </Text>
            <Image
              source={require("../../assets/icons/ChevRight.png")}
              style={{ height: 10, width: 10, tintColor: COLORS.darkyellow }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const Account = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertModal, setAlertModal] = useState(false);

  const navigation = useNavigation();

  const { accountDetails, updateAccount } = useContext(AuthContext);

  const getUserAccounts = async () => {
    setIsClicked(true);
    if (accountDetails.accountName != "PsyDStarter") {
      const response = await getAllUserAccounts(accountDetails.userId).then(
        (res) => {
          return res.data;
        }
      );

      if (response.status) {
        setUserAccounts(response.data.accountList);
        setTotalBalance(response.data.totalBalance);
      } else {
        console.log(response.message);
      }
    }
    setIsClicked(false);
  };

  useEffect(() => {
    getUserAccounts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // async function fetchData() {
      getUserAccounts();
      // }
      // fetchData();
    }, [accountDetails])
  );

  if (accountDetails.accountName === "PsyDStarter") {
    return (
      <View style={styles.basecontainer}>
        <EmptyList message={"No Real account registered"} />
        <TouchableOpacity
          onPress={() => {
            if (accountDetails.accountName != "PsyDStarter") {
              navigation.navigate("SetUpTradingPlan", { account: accountInfo });
            } else {
              navigation.navigate("AddNewAccount");
            }
          }}
          style={styles.buttonContinue}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText}>Register account</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.base}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 35,
        }}
      >
        <Text style={styles.balanceText}>Total Balance</Text>
        <Text style={styles.text}>${totalBalance}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddNewAccount");
        }}
        style={styles.button}
      >
        {isClicked ? (
          <ActivityIndicator size="large" color={"black"} />
        ) : (
          <Text style={styles.buttonText}>+ Add account</Text>
        )}
      </TouchableOpacity>

      {userAccounts.length === 0 ? (
        <View
          style={{
            backgroundColor: COLORS.appBackground,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={{ marginTop: 30, gap: SIZES.large, padding: 20 }}>
          {userAccounts?.map((item) => (
            <AccountCard
              item={item}
              currentAccount={accountDetails}
              updateAccountDetails={updateAccount}
              key={item.accountId}
              handleNavigate={navigation}
            />
          ))}
        </View>
      )}

      <AlertModal
        isAlert={alertModal}
        handleCancel={() => {
          setAlertModal(false);
          navigation.goBack();
        }}
        handleConfirm={() => {
          setAlertModal(false);
          navigation.navigate("Pricing");
        }}
        message={"Please renew your subscription to view all your accounts"}
        showCancelButton={true}
        showConfirmButton={true}
        title={"Action required"}
      />
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  basecontainer: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    justifyContent: "flex-start",
  },
  base: {
    backgroundColor: COLORS.appBackground,
  },
  id: {
    color: COLORS.lightWhite,
  },
  image: {
    height: 20,
    width: 20,
  },
  buttonContinue: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 200,
    marginTop: 40,
    alignSelf: "center",
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge * 2,
  },
  amount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 50,
    width: 300,
    marginTop: 20,
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
  balanceText: {
    color: COLORS.lightWhite,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  accountCard: {
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    borderRadius: SIZES.medium,
    padding: 10,
  },
});
