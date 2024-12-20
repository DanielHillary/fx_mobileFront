import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import { COLORS, FONT, SIZES } from "../../../constants";
import AlertModal from "../../../components/modal/AlertModal";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { updateAcccountPaymentStatus } from "../../../api/accountApi";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Details = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: SIZES.small,
        alignItems: "center",
        padding: SIZES.xSmall,
        marginTop: SIZES.small - 2,
      }}
    >
      <Image
        source={
          item.stat
            ? require("../../../assets/icons/goodie.png")
            : require("../../../assets/icons/wrong.png")
        }
        style={{ height: 10, width: 10 }}
      />
      <Text style={styles.text}>{item.detail}</Text>
    </View>
  );
};
const GoldPrice = () => {
  const [amount, setAmount] = useState(19500);
  const [alertModal, setAlertModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [makePayment, setMakePayment] = useState(false);

  const navigation = useNavigation();

  const { accountDetails, updatePaymentStatus } = useContext(AuthContext);

  const updateAccountPayment = async (data) => {
    try {
      const response = await updateAcccountPaymentStatus(
        accountDetails.accountId,
        15
      ).then((res) => {
        return res.data;
      });
      if (response.status) {
        updatePaymentStatus(true);
        setIsLoading(false);
        setSuccessAlert(true);
      }
    } catch (error) {}
  };

  function generateRefNumber(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let refNumber = "";

    for (let i = 0; i < length; i++) {
      refNumber += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    return refNumber;
  }

  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  const data = [
    {
      stat: true,
      detail: "Limited price alerts (100/month)",
    },
    {
      stat: true,
      detail: "Auto alerts on TakeProfit and StopLoss levels",
    },
    {
      stat: true,
      detail: "Alert options: WhatsApp, Telegram",
    },
    {
      stat: true,
      detail: "Automatic execution of all exit levels",
    },
    {
      stat: true,
      detail: "Auto alerts on all exit",
    },
    {
      stat: true,
      detail: "Seamless trading without parameters",
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.price}>$15/Month</Text>
      </View>

      <View style={{ marginTop: SIZES.medium, margin: SIZES.small }}>
        <Text style={styles.plus}>Everything from Bronze package Plus...</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Details item={item} />}
        keyExtractor={(item) => item?.detail}
        contentContainerStyle={{ columnGap: SIZES.small - 5 }}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            // paystackWebViewRef.current.startTransaction();
            setIsLoading(true);
            setMakePayment(true);
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText}>Make Payment</Text>
          )}
        </TouchableOpacity>
      </View>

      {makePayment && (
        <Paystack
          // paystackKey="pk_live_19dbd6da797c938132efe2a1a3333ed265f3230b"
          paystackKey="pk_test_4e398e23afb4e1d0be0eb53139b09596290fc2bc"
          billingEmail="danielibetohillary@gmail.com"
          amount={amount}
          billingName="Daniel Ibeto"
          onCancel={(e) => {
            setAlertModal(true);
            setIsLoading(false);
            setMakePayment(false);
          }}
          onSuccess={(res) => {
            updateAccountPayment(res.data);
            setMakePayment(false);
            console.log("Payment successful");
          }}
          ref={paystackWebViewRef}
          autoStart={true}
          currency="NGN"
          refNumber={generateRefNumber(20)}
          phone="09024253488"
          channels={["card", "bank", "mobile_money", "bank_transfer"]}
        />
      )}

      <AlertModal
        isAlert={alertModal}
        handleCancel={() => {
          setAlertModal(false);
        }}
        handleConfirm={() => {
          setAlertModal(false);
        }}
        message={
          "Something went wrong with the payment. Please try again later"
        }
        showCancelButton={false}
        showConfirmButton={true}
        title={"Failed transaction"}
      />

      <AlertModal
        isAlert={successAlert}
        handleCancel={() => {
          setSuccessAlert(false);
        }}
        handleConfirm={() => {
            navigation.navigate("SetUpTradingPlan")
        }}
        message={
          "Congratulations, your payment was successful!. Enjoy your stay"
        }
        showCancelButton={false}
        showConfirmButton={true}
        title={"Successful!"}
      />
    </View>
  );
};

export default GoldPrice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    padding: SIZES.small,
    paddingTop: SIZES.large,
  },
  price: {
    alignSelf: "center",
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.large * 1.5,
  },
  listContainer: {},
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.regular,
  },
  plus: {
    color: COLORS.darkyellow,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium - 4,
    fontStyle: "italic",
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 6,
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

  buttonStyle: {
    backgroundColor: COLORS.darkyellow,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    width: 300,
    height: 50,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.small,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.large,
    marginTop: SIZES.small,
    gap: SIZES.medium,
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    padding: 3,
    fontSize: SIZES.large,
    color: "black",
    fontFamily: FONT.bold,
  },
});
