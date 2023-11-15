import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, FONT } from "../../constants";

const AccountCard = ({ item }) => {

  const [hasTrade, setHasTrade] = useState(true)

  return (
    <View style={styles.accountCard}>
      <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Image
            source={require("../../assets/icons/profile.png")}
            style={styles.image}
          />

          <Text style={styles.id}>ID: {item.id}</Text>
          <Text style={{fontSize: SIZES.small, color: COLORS.lightWhite}}>{item.broker}</Text>
        </View>

        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: item.active ? "#32CD32" : "#FF0000",
            borderRadius: 5,
            marginRight: 10
          }}
        />
      </View>

      <Text style={{ color: COLORS.lightWhite, margin: 10 }}>{item.desc}</Text>

      <View style={{marginVertical: 10, backgroundColor: COLORS.white, opacity: 0.5, width: 280, height: 0.5, alignSelf: 'center' }}/>

      <View style={styles.amount}>
        <Text
          style={{
            color: COLORS.lightWhite,
            fontFamily: FONT.bold,
            fontSize: SIZES.medium,
            padding: 7,
          }}
        >
          {item.balance}
        </Text>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Account = () => {
  const accounts = [
    {
      id: 23433232,
      desc: "An account for the big big people in our midst. Utmost priority",
      balance: "$100",
      broker: "Deriv-demo",
      active: false,
    },
    {
      id: 23222211,
      desc: "An account for the big big people in our midst. Utmost priority",
      broker: "Deriv-real",
      balance: "$300",
      active: true,
    },
    {
      id: 30985711,
      desc: "An account for the big big people in our midst. Utmost priority",
      balance: "$150",
      broker: "Deriv-demo",
      active: true,
    },
    {
      id: 30455711,
      desc: "An account for the big big people in our midst. Utmost priority",
      balance: "$4,450.90",
      broker: "Exness-real",
      active: false,
    },
    {
      id: 30455700,
      desc: "An account for the big big people in our midst. Utmost priority",
      broker: "Deriv-real",
      balance: "$4,450.90",
      active: true,
    },
  ];
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
        <Text style={styles.text}>$100.00</Text>
      </View>

      <TouchableOpacity onPress={() => {}} style={styles.button}>
        {isClicked ? (
          <ActivityIndicator size="large" color={"black"} />
        ) : (
          <Text style={styles.buttonText}>+ Add account</Text>
        )}
      </TouchableOpacity>

      <View style={{ marginTop: 30, gap: SIZES.large, padding: 20 }}>
        {accounts?.map((item) => (
          <AccountCard item={item} key={item.id} handleNavigate={() => {}} />
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
