import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Button } from "react-native";

import styles from "./exitlevelcard.style";
import { COLORS, SIZES, FONT } from "../../constants";
import AwesomeAlert from "react-native-awesome-alerts";
import { executeExitLevel } from "../../api/exitLevelsApi";
import { useState } from "react";

const AlertModal = ({
  title,
  isAlert,
  handleConfirm,
  handleCancel,
  showCancelButton,
  showConfirmButton,
  message,
}) => {
  return (
    <View>
      <AwesomeAlert
        show={isAlert}
        title={title}
        titleStyle={styling.title}
        contentContainerStyle={styling.alertContainer}
        showConfirmButton={showConfirmButton}
        showCancelButton={showCancelButton}
        cancelButtonColor={COLORS.darkyellow}
        cancelButtonTextStyle={styling.alertText}
        cancelText="Cancel"
        confirmButtonColor={COLORS.darkyellow}
        confirmButtonTextStyle={styling.alertText}
        confirmText="Continue"
        onCancelPressed={handleCancel}
        onConfirmPressed={handleConfirm}
        closeOnTouchOutside={true}
        onDismiss={handleCancel}
        message={message}
        messageStyle={styling.alertMessage}
      />
    </View>
  );
};

const ExitLevelCardForProfit = ({ item }) => {
  const [alertModal, setAlertModal] = useState(false);
  const [loadingMode, setLoadingMode] = useState(false);
  const [successMode, setSuccessMode] = useState(false);

  const body = {
    isProfit: item.isInProfit,
    metaOrderId: item.metaTradeId,
    watchPrice: item.inTradeLossLevelPrice,
    accountId: item.accountId,
    symbolCategory: item.assetCategory,
  };

  const handleExecution = async () => {
    const response = await executeExitLevel(body).then((res) => {
      return res.data;
    });
    setLoadingMode(false);
    setSuccessMode(true);
    console.log(response.message);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => setAlertModal(true)}
    >
      <View style={styles.textContainer}>
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderColor: COLORS.white,
            borderWidth: 0.5,
          }}
        >
          <Text style={{ color: COLORS.lightWhite, textAlign: "center" }}>
            {item.count}
          </Text>
        </View>
        <View>
          <Text style={styles.at} numberOfLines={1}>
            At
          </Text>
          <Text style={{ color: COLORS.darkyellow, fontSize: SIZES.large }}>
            {item.inTradeProfitLevelPrice}
          </Text>
        </View>

        {item.lotSize != 0 && (
          <View>
            <Text style={styles.jobType}>Reduce lotSize</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: COLORS.lightWhite, marginTop: 3 }}>by</Text>
              <Text
                style={{
                  color: COLORS.darkyellow,
                  fontSize: SIZES.large,
                  marginLeft: 6,
                  alignSelf: "flex-end",
                }}
              >
                {item?.lotSize}
              </Text>
            </View>
          </View>
        )}

        <View>
          <Text style={styles.jobType}>Set stopLoss</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: COLORS.lightWhite, marginTop: 3 }}>at</Text>
            <Text
              style={{
                color: COLORS.darkyellow,
                fontSize: SIZES.large,
                marginLeft: 6,
                alignSelf: "flex-end",
              }}
            >
              {item?.slplacementPriceAfterProfit}
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={{backgroundColor: COLORS.white, height: 0.5, width: "100%"}} /> */}

      <AlertModal
        isAlert={alertModal}
        handleCancel={() => {
          setAlertModal(false);
        }}
        handleConfirm={() => {
          setAlertModal(false);
          setLoadingMode(true);
          handleExecution();
        }}
        message={"Are you sure you want to adjust your trades?"}
        showCancelButton={true}
        showConfirmButton={true}
        title={"Execute ExitLevel"}
      />

      <AlertModal
        isAlert={successMode}
        handleConfirm={() => {
          setSuccessMode(false);
        }}
        message={"Successful transaction!!!"}
        showCancelButton={false}
        showConfirmButton={true}
        title={"On track!"}
      />

      <AlertModal
        isAlert={loadingMode}
        message={<ActivityIndicator size={"large"} />}
        showCancelButton={false}
        showConfirmButton={false}
        title={"Loading..."}
      />
    </TouchableOpacity>
  );
};

export default ExitLevelCardForProfit;

const styling = StyleSheet.create({
  alertMessage: {
    color: COLORS.white,
    textAlign: "center",
  },
  alertContainer: {
    backgroundColor: "black",
    borderRadius: SIZES.medium,
    width: 200,
  },
  alertText: {
    color: "black",
    fontFamily: FONT.bold,
  },
  title: {
    color: COLORS.gray,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
});
