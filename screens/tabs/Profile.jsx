import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import switchIcon from "../../assets/icons/switch.png";
import { COLORS, FONT, SIZES } from "../../constants";
import ProgressBar from "../../components/ProgressBar";
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import AwesomeAlert from "react-native-awesome-alerts";

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
  return (
    <View
      style={{
        backgroundColor: "#212121",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 10,
        borderColor: "#B89F1B",
        borderWidth: 0.5,
        width: "95%",
        gap: 15,
        padding: 7,
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
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </Text>
      </View>
    </View>
  );
};
const Profile = () => {
  const [isComplete, setIsComplete] = useState(true);
  const [checkSignOut, setCheckSignOut] = useState(false);
  const [account, setAccount] = useState({});

  const { accountDetails, userInfo, logout } = useContext(AuthContext);

  const checkOut = (value) => {
    setCheckSignOut(value);
  };

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
            {accountDetails.accountNumber}
          </Text>
          <Text
            style={{
              fontFamily: FONT.regular,
              color: COLORS.lightWhite,
              marginLeft: 10,
            }}
          >
            {accountDetails.server}
          </Text>
        </View>
      </View>

      {isComplete ? (
        <ProgressBar status={accountDetails.completionStatus} />
      ) : (
        <AccountAction />
      )}

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: 16,
            color: COLORS.lightWhite,
          }}
        >
          Account balance
        </Text>
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
              {accountDetails.formattedBalance}
            </Text>
            <Text
              style={{
                fontSize: SIZES.medium + 2,
                color: COLORS.lightWhite,
                marginTop: 18,
              }}
            >
              .{accountDetails.fraction}
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
            nav={"TradeJournal"}
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
          message={"Are you sure you want to log out? You would have to log in again"}
          handleCancel={() => {
            setCheckSignOut(false);
          }}
          handleConfirm={() => {
            setCheckSignOut(false);
            logout();
          }}
        />
      </View>
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
});
