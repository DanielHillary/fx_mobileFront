import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import { COLORS, FONT, SIZES } from "../../../constants";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import AlertModal from "../../../components/modal/AlertModal";
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
const Bronze = () => {
  const [amount, setAmount] = useState(15600);
  const [alertModal, setAlertModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [makePayment, setMakePayment] = useState(false);

  const { accountDetails } = useContext(AuthContext);

  const navigation = useNavigation();

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

  const updateAccountPayment = async (data) => {
    try {
      const response = await updateAcccountPaymentStatus(
        accountDetails.accountId,
        10
      ).then((res) => {
        return res.data;
      });
      if (response.status) {
        setIsLoading(false);
        setSuccessAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  const data = [
    {
      id: 1,
      stat: true,
      detail: "Risk Analyzer",
    },
    {
      id: 2,
      stat: true,
      detail: "PsyDTrader Trade Appraisal",
    },
    {
      id: 3,
      stat: true,
      detail: "Open Multiple Trades for multiple accounts",
    },
    {
      id: 4,
      stat: true,
      detail: "Alert medium: Push Notification, email",
    },
    {
      id: 5,
      stat: true,
      detail: "Monthly account reporting",
    },
    {
      id: 6,
      stat: true,
      detail: "Automatic Trade journaling",
    },
    {
      id: 7,
      stat: true,
      detail: "Limited alerts on all asset (50/month)",
    },
    {
      id: 8,
      stat: true,
      detail: "Account analysis for trades",
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.price}>$10/Month</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Details item={item} />}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ columnGap: SIZES.small - 5 }}
        showsVerticalScrollIndicator={false}
      />

      {makePayment && <Paystack
        paystackKey="pk_test_4e398e23afb4e1d0be0eb53139b09596290fc2bc"
        // paystackKey="pk_live_19dbd6da797c938132efe2a1a3333ed265f3230b"
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
          console.log("Payment successful")
        }}
        ref={paystackWebViewRef}
        autoStart={true}
        currency="NGN"
        refNumber={generateRefNumber(20)}
        phone="09024253488"
        channels={['card', 'bank', 'mobile_money', 'bank_transfer']}
      />}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setMakePayment(true);
            // paystackWebViewRef.current.startTransaction();
            setIsLoading(true);
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText}>Make payment</Text>
          )}
        </TouchableOpacity>
      </View>

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
          navigation.navigate("Home")
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

export default Bronze;

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
  choose: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    width: 200,
    alignSelf: "flex-start",
    marginLeft: SIZES.medium,
  },
});
