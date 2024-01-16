import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, FONT } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { getAllUserAccounts } from "../../api/accountApi";

const AccountCard = ({ item, currentAccount }) => {
  const [hasTrade, setHasTrade] = useState(true);

  let accountDesc =
    "An account for the big big people in our midst. Top Priority";

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

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            <Image source={require("../../assets/icons/delete.png")} style={{height: 25, width: 25}}/>
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
          ${item.formattedBalance}.{item.fraction}
        </Text>
        {currentAccount.accountId != item.accountId && <TouchableOpacity
          style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
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
        </TouchableOpacity>}
      </View>
    </View>
  );
};
const Account = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState("");

  const navigation = useNavigation();

  const { accountDetails } = useContext(AuthContext);

  const getUserAccounts = async () => {
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
  };

  useEffect(() => {
    getUserAccounts();
  }, []);

  const [isClicked, setIsClicked] = useState(false);
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
          navigation.navigate("AddAccount");
        }}
        style={styles.button}
      >
        {isClicked ? (
          <ActivityIndicator size="large" color={"black"} />
        ) : (
          <Text style={styles.buttonText}>+ Add account</Text>
        )}
      </TouchableOpacity>

      <View style={{ marginTop: 30, gap: SIZES.large, padding: 20 }}>
        {userAccounts?.map((item) => (
          <AccountCard
            item={item}
            currentAccount={accountDetails}
            key={item.accountId}
            handleNavigate={() => {}}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
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
