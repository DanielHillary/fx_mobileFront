import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import switchIcon from "../../assets/icons/switch.png";
import { COLORS, FONT, SIZES } from "../../constants";
import ProgressBar from "../../components/ProgressBar";
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import AwesomeAlert from "react-native-awesome-alerts";
import StrictModal from "../../components/modal/StrictModal";
import { updateAccountMode } from "../../api/accountApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        cancelText="Cancel"
        confirmButtonColor={COLORS.darkyellow}
        confirmButtonTextStyle={styles.alertText}
        confirmText="LogOut"
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

const Options = ({ image, option, nav, checkOut }) => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  return (
    <TouchableOpacity
      onPress={() => {
        if (nav == "SignOut") {
          checkOut(true);
        } else {
          navigation.navigate(nav);
        }
      }}
    >
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Image source={image} resizeMethod="auto" style={styles.optionimg} />

        <Text style={styles.optionText}>{option}</Text>
      </View>
    </TouchableOpacity>
  );
};

const AccountAction = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#212121",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
        borderRadius: 10,
        borderColor: "#B89F1B",
        borderWidth: 0.5,
        width: "95%",
        gap: 15,
        padding: 7,
      }}
      onPress={() => {
        navigation.navigate("AddNewAccount");
      }}
    >
      <Image
        source={require("../../assets/icons/warn.png")}
        resizeMode="cover"
        style={{ height: 30, width: 30, alignSelf: "flex-start" }}
      />

      <View>
        <Text
          style={{
            width: 120,
            fontFamily: FONT.bold,
            fontWeight: "500",
            fontSize: SIZES.medium,
            color: COLORS.lightWhite,
            marginBottom: 3,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.lightWhite,
          }}
        >
          Action Required:
        </Text>
        <Text
          style={{
            fontFamily: FONT.regular,
            fontWeight: "100",
            color: COLORS.lightWhite,
            width: 230,
          }}
        >
          Please do well to add a real account for you to have access to the
          features we provide. Kindly click to continue to register your
          account.
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const Profile = () => {
  const [isComplete, setIsComplete] = useState(true);
  const [checkSignOut, setCheckSignOut] = useState(false);
  const [account, setAccount] = useState({});
  const [isStrict, setIsStrict] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState();
  const [isSigned, setIsSigned] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const navigation = useNavigation();

  const { accountDetails, userInfo, logout, updateAccount } =
    useContext(AuthContext);

  const setVisibility = (value) => {
    setIsModalVisible(value);
  };

  const setAccountUp = async () => {
    let account = await AsyncStorage.getItem("accountInfo").then((res) => {
      return JSON.parse(res);
    });

    if (account === null && accountDetails === null) {
      setWaiting(true);
    }
    if (accountDetails === null || accountDetails.length === 0) {
      setAccount(account);
      setIsStrict(account.strict)
      setWaiting(false);
    } else {
      setAccount(accountDetails);
      setIsStrict(accountDetails.strict);
      setWaiting(false);
    }
  };

  const checkOut = (value) => {
    setCheckSignOut(value);
  };

  const updateStrict = (value) => {
    setIsStrict(!value);
  };

  useEffect(() => {
    setAccountUp();
    setIsModalVisible(false);
  }, [accountDetails]);

  useFocusEffect(
    React.useCallback(() => {
      setAccountUp();
    }, [accountDetails])
  );

  const updateAccountInfo = async (value) => {
    const response = await updateAccountMode(account.accountId, value).then(
      (res) => {
        return res.data;
      }
    );
    if (response.status) {
      setIsModalVisible(false);
    } else {
      console.log(response.message);
    }
  };

  if (waiting || account === null) {
    return (
      <View
        style={{
          backgroundColor: COLORS.appBackground,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.base} nestedScrollEnabled={true}>
      <Text style={styles.text}>Profile</Text>
      <View
        style={{ flexDirection: "row", marginTop: 20, alignContent: "center" }}
      >
        <Image
          source={require("../../assets/icons/profile.png")}
          resizeMethod="auto"
          style={styles.image}
        />

        <View>
          <Text style={[styles.text, { marginHorizontal: 10, marginTop: 5 }]}>
            {userInfo.user.firstName} {userInfo.user.lastName}
          </Text>
          <Text
            style={{
              fontFamily: FONT.regular,
              color: COLORS.lightWhite,
              marginLeft: 10,
            }}
          >
            {account.accountNumber === null
              ? "5566559995R"
              : account.accountNumber}
          </Text>
          <Text
            style={{
              fontFamily: FONT.regular,
              color: COLORS.lightWhite,
              marginLeft: 10,
            }}
          >
            {account.server}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UpdateInfo");
          }}
          style={{marginTop: 10, marginLeft: 20}}
        >
          <Image
            source={require("../../assets/icons/edit.png")}
            resizeMethod="auto"
            style={{ height: 20, width: 20 }}
          />
        </TouchableOpacity>
      </View>

      {account.accountName != "PsyDStarter" ? (
        <ProgressBar status={account.completionStatus} />
      ) : (
        <AccountAction />
      )}

      <View style={{ marginTop: 30 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 16,
              color: COLORS.lightWhite,
            }}
          >
            Account balance
          </Text>
          {account.accountName != "PsyDStarter" && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.mode}>
                {isStrict ? "Strict" : "Flexible"}
              </Text>
              <Switch
                value={isStrict}
                onValueChange={() => {
                  setIsStrict((prev) => !prev);
                  if (!isStrict) {
                    setIsModalVisible(true);
                  } else {
                    updateAccountInfo(false);
                  }
                }}
                trackColor={{ false: "black" }}
                thumbColor={"green"}
              />
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 10,
            backgroundColor: "#212121",
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              padding: 10,
              fontFamily: FONT.medium,
              fontSize: SIZES.medium,
              color: COLORS.darkyellow,
            }}
          >
            USD
          </Text>
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 10,
              marginBottom: 10,
              alignSelf: "flex-start",
            }}
          >
            <Text
              style={{ color: COLORS.lightWhite, fontSize: SIZES.large * 1.8 }}
            >
              $
            </Text>
            <Text
              style={{
                color: COLORS.lightWhite,
                fontFamily: FONT.bold,
                fontSize: SIZES.large * 2,
                marginLeft: 3,
              }}
            >
              {account.formattedBalance}
            </Text>
            <Text
              style={{
                fontSize: SIZES.medium + 2,
                color: COLORS.lightWhite,
                marginTop: 18,
              }}
            >
              .{account.fraction}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 30,
            marginBottom: 30,
            gap: SIZES.medium,
          }}
        >
          <Options
            image={images.switchAccount}
            option={"Switch Accounts"}
            nav={"Accounts"}
          />
          <Options
            image={images.tradingPlan}
            option={"Trading Plan"}
            nav={"Plan"}
          />
          <Options
            image={images.changePassword}
            option={"Change Password"}
            nav={"ChangePassword"}
          />
          <Options
            image={images.reporting}
            option={"Account Report"}
            nav={"AccountReport"}
          />
          <Options
            image={images.upgrade}
            option={"Upgrade Account"}
            nav={"Pricing"}
          />
          <Options
            image={images.logout}
            option={"Log Out"}
            nav={"SignOut"}
            checkOut={checkOut}
          />
        </View>

        <AlertModal
          isAlert={checkSignOut}
          showCancelButton={true}
          showConfirmButton={true}
          message={
            "Are you sure you want to log out? You would have to log in again"
          }
          handleCancel={() => {
            setCheckSignOut(false);
          }}
          handleConfirm={() => {
            setCheckSignOut(false);
            logout();
          }}
        />
      </View>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <StrictModal
          setVisibility={setVisibility}
          updateSigned={updateStrict}
          updateAccount={updateAccountInfo}
          account={account}
        />
      </Modal>
    </ScrollView>
  );
};

const images = {
  switchAccount: require("../../assets/icons/switch.png"),
  changePassword: require("../../assets/icons/password.png"),
  tradingPlan: require("../../assets/icons/planning.png"),
  reporting: require("../../assets/icons/reporting.png"),
  upgrade: require("../../assets/icons/upgrade.png"),
  logout: require("../../assets/icons/logout1.png"),
};

export default Profile;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: FONT.bold,
    color: COLORS.lightWhite,
    fontSize: SIZES.large,
  },
  optionText: {
    fontFamily: FONT.regular,
    color: COLORS.white,
    fontSize: SIZES.medium + 3,
    margin: 5,
  },
  alertMessage: {
    color: COLORS.white,
    textAlign: "center",
  },
  alertText: {
    color: "black",
    fontFamily: FONT.bold,
  },
  alertContainer: {
    backgroundColor: "black",
    borderRadius: SIZES.medium,
    width: 200,
  },
  image: {
    height: 60,
    width: 60,
    alignSelf: "flex-start",
  },
  optionimg: {
    height: 25,
    width: 25,
    alignSelf: "flex-start",
  },
  mode: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
});
