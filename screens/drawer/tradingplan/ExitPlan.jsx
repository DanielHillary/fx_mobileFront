import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import { COLORS, SIZES, FONT } from "../../../constants";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  deleteLossExit,
  deleteProfitExit,
  getExitsForTradingPlan,
  registerLossExitStrategy,
  registerProfitExitStrategy,
  updateLossExitStrategies,
  updateProfitExitStrategies,
} from "../../../api/tradingplanApi";
import { AuthContext } from "../../../context/AuthContext";
import EmptyList from "../../../components/EmptyList";

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
        titleStyle={styles.title}
        contentContainerStyle={styles.alertContainer}
        showConfirmButton={showConfirmButton}
        showCancelButton={showCancelButton}
        cancelButtonColor={COLORS.darkyellow}
        cancelButtonTextStyle={styles.alertText}
        cancelText="Review"
        confirmButtonColor={COLORS.darkyellow}
        confirmButtonTextStyle={styles.alertText}
        confirmText="Continue"
        onCancelPressed={handleCancel}
        onConfirmPressed={handleConfirm}
        closeOnTouchOutside={true}
        onDismiss={handleCancel}
        message={message}
        messageStyle={styles.alertMessage}
      />
    </View>
  );
};

const ProfitExits = ({ item, updateChange, updateList }) => {
  const [tpFocused, setTpFocused] = useState(false);
  const [tpValue, setTpValue] = useState("");
  const [slFocused, setSlFocused] = useState("");
  const [slProfitValue, setSlProfitValue] = useState("");
  const [isProfitAlert, setIsProfitAlert] = useState(true);
  const [lotSizeFocused, setLotSizeFocused] = useState(false);
  const [profitLotSize, setProfitLotSize] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [check, setCheck] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);

  const inputRef = useRef(null);

  const { accountDetails } = useContext(AuthContext);

  const updateExitLevels = async () => {
    console.log("We are here");
    setEditMode(false);
    setIsChanged(true);

    item.accountId = accountDetails.accountId;
    item.inTradeProfitLevel = tpValue;
    item.lotSizePercentWhenTradeInProfit = profitLotSize;
    item.slplacementPercentAfterProfit = slProfitValue;

    // console.log(item);

    const response = await updateProfitExitStrategies(item).then((res) => {
      return res.data;
    });
    if (response.status) {
      Alert.alert(
        "Update Successful",
        "You have successfully updated this exit level"
      );
    } else {
      console.log(response.message);
    }
  };

  const deleteExitLevel = async () => {
    try {
      const response = await deleteProfitExit(item.accountId, item.count).then(
        (res) => {
          return res.data;
        }
      );
      if (response.status) {
        updateList(item);
        Alert.alert("Successful", "Your exit level has been deleted");
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 3 }}>
      <View style={styles.contain}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.levelText}>At</Text>
          {editMode ? (
            <TextInput
              ref={inputRef}
              placeholder="0"
              placeholderTextColor={COLORS.gray}
              style={styles.email(tpFocused)}
              numberOfLines={1}
              keyboardType="numeric"
              onChangeText={(text) => {
                setTpValue(text);
              }}
              value={tpValue}
              onFocus={() => {
                setTpFocused(true);
              }}
              onBlur={() => {
                setTpFocused(false);
              }}
              // selection={{
              //   start: item.inTradeProfitLevel,
              //   end: item.inTradeProfitLevel,
              // }}
            />
          ) : (
            <Text style={styles.levels}>
              {isChanged ? tpValue : item.inTradeProfitLevel}
            </Text>
          )}

          <Text style={styles.levelText}>
            % of my profit target, partially close my trade
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.levelText}>by</Text>
          {editMode ? (
            <TextInput
              placeholderTextColor={COLORS.gray}
              placeholder="0"
              style={styles.email(lotSizeFocused)}
              numberOfLines={1}
              keyboardType="numeric"
              onChangeText={(text) => {
                setProfitLotSize(text);
              }}
              value={profitLotSize}
              onFocus={() => {
                setLotSizeFocused(true);
              }}
              onBlur={() => {
                setLotSizeFocused(false);
              }}
            />
          ) : (
            <Text style={styles.levels}>
              {" "}
              {isChanged ? profitLotSize : item.lotSizePercentWhenTradeInProfit}
            </Text>
          )}

          <Text style={styles.levelText}>
            % of my current lotSize
            {item.slplacementPercentAfterProfit != 0 ? ", and" : "."}
          </Text>
        </View>

        {item.slplacementPercentAfterProfit != 0 && (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.levelText}>
              {item.slPlacementPercentIsForProfit ? "secure " : "reduce "}
            </Text>
            <Text style={styles.levelText}>
              {!item.slPlacementPercentIsForProfit && " my risk allowance by "}
            </Text>
            {editMode ? (
              <TextInput
                placeholderTextColor={COLORS.gray}
                placeholder="0"
                style={[styles.email(slFocused), { marginLeft: 0 }]}
                keyboardType="numeric"
                numberOfLines={1}
                onChangeText={(text) => {
                  setSlProfitValue(text);
                }}
                value={slProfitValue}
                onFocus={() => {
                  setSlFocused(true);
                }}
                onBlur={() => {
                  setSlFocused(false);
                }}
              />
            ) : (
              <Text style={styles.levels}>
                {isChanged ? slProfitValue : item.slplacementPercentAfterProfit}
              </Text>
            )}

            <Text style={styles.levelText}>
              {item.slPlacementPercentIsForProfit
                ? "% of my profit target."
                : "%"}
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          marginTop: SIZES.small,
        }}
      >
        {editMode ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{ color: COLORS.lightWhite, marginRight: SIZES.xSmall }}
            >
              Save
            </Text>
            <TouchableOpacity
              onPress={() => {
                setCheck(true);
              }}
            >
              <Image
                source={require("../../../assets/icons/save.png")}
                style={{ height: 25, width: 25, marginRight: SIZES.large }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{ color: COLORS.lightWhite, marginRight: SIZES.xSmall }}
            >
              Edit
            </Text>
            <TouchableOpacity
              onPress={() => {
                // setIsLossAlert(true);
                setEditMode(true);
                setTpValue(item.inTradeProfitLevel);
                setProfitLotSize(item.lotSizePercentWhenTradeInProfit);
                setSlProfitValue(item.slplacementPercentAfterProfit);
              }}
            >
              <Image
                source={require("../../../assets/icons/EditFirst.png")}
                style={{ height: 25, width: 25, marginRight: SIZES.large }}
              />
            </TouchableOpacity>
          </View>
        )}
        <Text style={{ color: COLORS.lightWhite, marginRight: SIZES.xSmall }}>
          Delete
        </Text>
        <TouchableOpacity
          onPress={() => {
            // setIsLossAlert(true);
            setIsDeleteAlert(true);
          }}
        >
          <Image
            source={require("../../../assets/icons/delete.png")}
            style={{ height: 25, width: 25 }}
          />
        </TouchableOpacity>
      </View>
      <AlertModal
        isAlert={check}
        title={"Confirm changes"}
        message={
          "Are you sure the details provided are accurate? If yes, click Update"
        }
        handleCancel={() => {
          setCheck(false);
          setEditMode(false);
        }}
        handleConfirm={() => {
          updateExitLevels();
          setCheck(false);
        }}
        showCancelButton={true}
        showConfirmButton={true}
      />

      <AlertModal
        isAlert={isDeleteAlert}
        title={"Delete Exit"}
        message={"Are you sure you want to delete this exit level?"}
        handleCancel={() => {
          setIsDeleteAlert(false);
        }}
        handleConfirm={() => {
          deleteExitLevel();
          setIsDeleteAlert(false);
        }}
        showCancelButton={true}
        showConfirmButton={true}
      />
    </View>
  );
};

const LossExits = ({ item, updateChange, updateList }) => {
  const [editMode, setEditMode] = useState(false);
  const [isLossAlert, setIsLossAlert] = useState(false);
  const [slFocused, setSlFocused] = useState(false);
  const [slValue, setSlValue] = useState("");
  const [lotSizeFocused, setLotSizeFocused] = useState(false);
  const [lossLotSize, setLossLotSize] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [check, setCheck] = useState(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState(false);

  const navigation = useNavigation();

  const updateExitLevels = async () => {
    setEditMode(false);
    setIsChanged(true);

    console.log("Here too");

    item.allowedLossLevelPercentage = slValue;
    item.lotSizePercentWhenTradeInLoss = lossLotSize;

    const response = await updateLossExitStrategies(item).then((res) => {
      return res.data;
    });
    if (response.status) {
      Alert.alert(
        "Update Successful",
        "You have successfully updated this exit level"
      );
    } else {
      console.log(response.message);
    }
  };

  const deleteExitLevel = async () => {
    const response = await deleteLossExit(item.accountId, item.exitId).then(
      (res) => {
        return res.data;
      }
    );
    if (response.status) {
      updateList(item);
      Alert.alert("Delete Successful", "Your exit level has been deleted");
    } else {
      console.log(response.message);
    }
  };
  return (
    <View style={{ marginTop: 2 }}>
      <View style={styles.contain}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.levelText}>At</Text>
          {editMode ? (
            <TextInput
              placeholder="0"
              placeholderTextColor={COLORS.gray}
              style={styles.email(slFocused)}
              numberOfLines={1}
              keyboardType="numeric"
              onChangeText={(text) => {
                setSlValue(text);
              }}
              value={slValue}
              onFocus={() => {
                setSlFocused(true);
              }}
              onBlur={() => {
                setSlFocused(false);
              }}
            />
          ) : (
            <Text style={styles.levels}>
              {isChanged ? slValue : item.allowedLossLevelPercentage}
            </Text>
          )}

          <Text style={styles.levelText}>
            % of my risk size, partially close my trade
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.levelText}>by</Text>
          {editMode ? (
            <TextInput
              placeholder="0"
              placeholderTextColor={COLORS.gray}
              style={styles.email(lotSizeFocused)}
              numberOfLines={1}
              keyboardType="numeric"
              onChangeText={(text) => {
                setLossLotSize(text);
              }}
              value={lossLotSize}
              onFocus={() => {
                setLotSizeFocused(true);
              }}
              onBlur={() => {
                setLotSizeFocused(false);
              }}
            />
          ) : (
            <Text style={styles.levels}>
              {" "}
              {isChanged ? lossLotSize : item.lotSizePercentWhenTradeInLoss}
            </Text>
          )}

          <Text style={styles.levelText}>% of current lotSize/volume</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          marginTop: SIZES.small,
        }}
      >
        {editMode ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{ color: COLORS.lightWhite, marginRight: SIZES.xSmall }}
            >
              Save.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setCheck(true);
                // setEditMode(false);
              }}
            >
              <Image
                source={require("../../../assets/icons/save.png")}
                style={{ height: 25, width: 25, marginRight: SIZES.large }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{ color: COLORS.lightWhite, marginRight: SIZES.xSmall }}
            >
              Edit
            </Text>
            <TouchableOpacity
              onPress={() => {
                // setIsLossAlert(true);
                setEditMode(true);
              }}
            >
              <Image
                source={require("../../../assets/icons/EditFirst.png")}
                style={{ height: 25, width: 25, marginRight: SIZES.large }}
              />
            </TouchableOpacity>
          </View>
        )}
        <Text style={{ color: COLORS.lightWhite, marginRight: SIZES.xSmall }}>
          Delete
        </Text>
        <TouchableOpacity
          onPress={() => {
            // setIsLossAlert(true);
            setIsDeleteAlert(true);
          }}
        >
          <Image
            source={require("../../../assets/icons/delete.png")}
            style={{ height: 25, width: 25 }}
          />
        </TouchableOpacity>
      </View>
      <AlertModal
        isAlert={check}
        title={"Confirm changes"}
        message={
          "Are you sure the details provided are accurate? If yes, click Update"
        }
        handleCancel={() => {
          setCheck(false);
          setEditMode(false);
        }}
        handleConfirm={() => {
          updateExitLevels();
          setCheck(false);
        }}
        showCancelButton={true}
        showConfirmButton={true}
      />

      <AlertModal
        isAlert={isDeleteAlert}
        title={"Delete Exit"}
        message={"Are you sure you want to delete this exit level?"}
        handleCancel={() => {
          setIsDeleteAlert(false);
        }}
        handleConfirm={() => {
          deleteExitLevel();
          setIsDeleteAlert(false);
        }}
        showCancelButton={true}
        showConfirmButton={true}
      />
    </View>
  );
};

const ExitPlan = () => {
  const [tpValue, setTpValue] = useState(0);
  const [slValue, setSlValue] = useState(0);
  const [slProfitValue, setSlProfitValue] = useState(0);
  const [profitLotSize, setProfitLotSize] = useState(0);
  const [lossLotSize, setLossLotSize] = useState(0);
  const [tpFocused, setTpFocused] = useState(false);
  const [slFocused, setSlFocused] = useState(false);
  const [lotSizeFocused, setLotSizeFocused] = useState(false);
  const [isProfitAlert, setIsProfitAlert] = useState(false);
  const [isLossAlert, setIsLossAlert] = useState(false);
  const [profitCount, setProfitCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [isCheckLevels, setIsCheckLevels] = useState(false);
  const [exitStrategy, setExitStrategy] = useState({});
  const [profitExits, setProfitExits] = useState([]);
  const [lossExits, setLossExits] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [isProfitEmpty, setIsProfitEmpty] = useState(false);
  const [isLossEmpty, setIsLossEmpty] = useState(false);

  const { accountDetails } = useContext(AuthContext);

  const getExitsForPlan = async () => {
    const response = await getExitsForTradingPlan(accountDetails.planId).then(
      (res) => {
        return res.data;
      }
    );

    if (response.status) {
      setExitStrategy(response.data);
      setProfitExits(response.data.profitLevels);
      if (response.data.profitLevels.length === 0) {
        setIsProfitEmpty(true);
      }
      setLossExits(response.data.lossLevels);
      if (response.data.lossLevels.length === 0) {
        setIsLossEmpty(true);
      }
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getExitsForPlan();
    setAccountInfo(accountDetails);
  }, [accountDetails]);

  const navigation = useNavigation();

  const updateChange = () => {
    setIsChanged((prev) => !prev);
  };

  const checkEmptyLevels = () => {
    if (
      slValue != 0 &&
      profitLotSize != 0 &&
      lossLotSize != 0 &&
      tpValue != 0
    ) {
      return true;
    }
    return false;
  };

  const registerProfit = () => {
    const body = {
      count: profitCount,
      inProfit: true,
      inTradeProfitLevel: tpValue,
      lotSizePercentWhenTradeInProfit: profitLotSize,
      metaAccountId: accountInfo.metaApiAccountId,
      original: true,
      slPlacementPercentIsForProfit: true,
      slplacementPercentAfterProfit: slProfitValue == 0 ? 1 : slProfitValue,
      tradingPlanId: accountInfo.planId,
    };

    const response = registerProfitExitStrategy(body).then((res) => {
      return res.data;
    });
  };

  const registerLoss = () => {
    const body = {
      allowedLossLevelPercentage: slValue,
      count: lossCount,
      inProfit: false,
      lotSizePercentWhenTradeInLoss: profitLotSize,
      metaAccountId: accountInfo.metaApiAccountId,
      original: true,
      slPlacementPercentIsForProfit: false,
      slplacementPercentAfterProfit: 100,
      tradingPlanId: accountInfo.planId,
    };

    const response = registerLossExitStrategy(body).then((res) => {
      return res.data;
    });
  };

  const registerExits = () => {
    if (lossCount === 0) {
      setLossCount(1);
    }
    if (profitCount === 0) {
      setProfitCount(1);
    }
    registerProfit();
    registerLoss();

    navigation.navigate("RiskManager");
  };

  const lossData = [
    { id: 1, lossPercent: 90, lotSize: 50 },
    { id: 2, lossPercent: 90, lotSize: 50 },
  ];
  const profitData = [
    { id: 1, profitTarget: 50, lotSize: 50, sl: 10 },
    { id: 2, profitTarget: 50, lotSize: 50, sl: 10 },
  ];

  const updateList = (item) => {
    if (item.isInProfit) {
      const newArray = profitExits.filter((obj) => obj.exitId !== item.exitId);
      setProfitExits(newArray);
      if (newArray.length == 0) {
        setIsProfitEmpty(true);
      }
    } else {
      const newArray = lossExits.filter((obj) => obj.exitId !== item.exitId);
      setLossExits(newArray);
      if (newArray.length == 0) {
        setIsLossEmpty(true);
      }
    }
  };

  return (
    <ScrollView style={styles.baseContainer}>
      <View>
        <Text
          style={{
            color: COLORS.lightWhite,
            fontFamily: FONT.bold,
            fontSize: SIZES.xxLarge,
          }}
        >
          Exit Strategy
        </Text>
        <Text style={[styles.text, { fontSize: SIZES.medium }]}>
          Your exit strategy is made up of exit levels. Exit levels are market
          price defined zones where a trader seeks to either secure some profit
          or mitigate occuring losses.
        </Text>
      </View>

      <Text
        style={[styles.text, { marginTop: SIZES.medium, fontStyle: "italic" }]}
      >
        Click on the numbered space to enter your levels
      </Text>

      <Text
        style={[styles.text, { marginTop: SIZES.medium, fontStyle: "italic" }]}
      >
        Note: To break-even, set secure profit percent at 1
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: SIZES.small,
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <View style={{ flexDirection: "row", gap: SIZES.small }}>
          <Text style={{ color: COLORS.lightWhite }}>Add Level</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateExit", { value: "Edit Profit" });
            }}
          >
            <Image
              source={require("../../../assets/icons/add.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ color: COLORS.lightWhite }}>Profit level</Text>
      </View>
      {(isProfitEmpty === false && profitExits.length === 0) ? (
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
        <View>
          {isProfitEmpty ? (
            <EmptyList message={"You don't have any exit levels"} />
          ) : (
            <ScrollView horizontal>
              <View style={{ flexDirection: "row", gap: SIZES.medium }}>
                {profitExits?.map((item) => (
                  <ProfitExits
                    item={item}
                    key={item.exitId}
                    updateChange={updateChange}
                    updateList={updateList}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          gap: SIZES.small,
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", gap: SIZES.small }}>
          <Text style={{ color: COLORS.lightWhite }}>Add Level</Text>
          <TouchableOpacity
            onPress={() => {
              // setIsProfitAlert(true);
              navigation.navigate("CreateExit", { value: "Edit Loss" });
            }}
          >
            <Image
              source={require("../../../assets/icons/add.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ color: COLORS.lightWhite }}>Loss levels</Text>
      </View>
      {(isLossEmpty === false && lossExits.length === 0) ? (
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
        <View>
          {isLossEmpty ? (
            <EmptyList message={"You don't have any exit levels"} />
          ) : (
            <ScrollView horizontal>
              <View style={{ flexDirection: "row", gap: SIZES.medium }}>
                {lossExits?.map((item) => (
                  <LossExits
                    item={item}
                    key={item.exitId}
                    updateChange={updateChange}
                    updateList={updateList}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      )}

      <AlertModal
        message={
          "Are you sure the details provided are accurate? If yes, kindly save"
        }
        showCancelButton={true}
        showConfirmButton={true}
        handleCancel={() => {
          setIsProfitAlert(false);
        }}
        handleConfirm={() => {
          setProfitCount((prev) => prev + 1);
          //registerProfit();
        }}
        isAlert={isProfitAlert}
      />

      <AlertModal
        message={
          "Are you sure the details provided are accurate? If yes, kindly save"
        }
        showCancelButton={true}
        showConfirmButton={true}
        handleCancel={() => {
          setIsLossAlert(false);
        }}
        handleConfirm={() => {
          setLossCount((prev) => prev + 1);
          // registerLoss()
        }}
        isAlert={isLossAlert}
      />

      <AlertModal
        message={
          "You have some spaces left out. Please fill in the missing figures before you continue"
        }
        showCancelButton={true}
        showConfirmButton={true}
        handleCancel={() => {
          setIsContinue(false);
        }}
        handleConfirm={() => {}}
        isAlert={isContinue}
      />

      <AlertModal
        message={
          "Are you sure the details provided are accurate? If yes, kindly save"
        }
        showCancelButton={true}
        showConfirmButton={true}
        handleCancel={() => {
          setIsCheckLevels(false);
        }}
        handleConfirm={() => {
          // registerExits();
          navigation.navigate("RiskManager");
          setIsCheckLevels(false);
        }}
        isAlert={isCheckLevels}
      />

      {/* <TouchableOpacity
        onPress={() => {
          if (checkEmptyLevels()) {
            registerExits();
          } else if (lossCount == 0 || profitCount == 0) {
            setIsCheckLevels(true);
          } else {
            setIsContinue(true);
          }
        }}
        style={styles.buttonContinue}
      >
        {isClicked ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default ExitPlan;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  text: {
    color: COLORS.lightWhite,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    marginTop: SIZES.small,
  },
  contain: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    borderRadius: SIZES.xSmall - 4,
    padding: SIZES.small,
    alignItems: "center",
    width: 320,
    marginTop: SIZES.small,
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
  levelText: {
    color: COLORS.lightWhite,
    alignSelf: "flex-end",
    fontSize: SIZES.small + 2,
    marginBottom: 4,
    fontFamily: FONT.medium,
  },
  alertMessage: {
    color: COLORS.white,
    textAlign: "center",
  },
  email: (focused) => ({
    borderColor: focused ? COLORS.darkyellow : COLORS.appBackground,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    paddingHorizontal: focused ? SIZES.xSmall - 4 : 0,
    height: 30,
    color: COLORS.darkyellow,
    fontSize: SIZES.xLarge,
    marginLeft: SIZES.xSmall - 4,
  }),
  levels: {
    fontSize: SIZES.xLarge,
    color: COLORS.darkyellow,
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
  buttonText: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    fontSize: SIZES.large,
    color: "black",
    fontFamily: FONT.bold,
  },
});
