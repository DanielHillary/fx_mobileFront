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


const assetlist = [
  { label: "EUR", value: "EUR" },
  { label: "USD", value: "USD" },
  { label: "GBP", value: "GBP" },
  { label: "AUD", value: "AUD" },
  { label: "CAD", value: "CAD" },
];



const DownArrow = () => {
  return (
    <View>
      <Image
        source={require("../../assets/icons/dropdown.png")}
        style={{ height: 5, width: 5 }}
      />
    </View>
  );
};

const Options = ({ image, option, nav }) => {

  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  return (
    <TouchableOpacity 
    onPress={() => {
      if(nav == "SignIn"){
        logout();
      }else{
        navigation.navigate(nav)
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
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [currency, setCurrency] = useState("");

  

  return (
    <ScrollView style={styles.base}>
      <Text style={styles.text}>Profile</Text>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Image
          source={require("../../assets/icons/profile.png")}
          resizeMethod="auto"
          style={styles.image}
        />

        <View>
          <Text style={[styles.text, { marginHorizontal: 10, marginTop: 10 }]}>
            Ronald Richards
          </Text>
          <Text
            style={{
              fontFamily: FONT.regular,
              color: COLORS.lightWhite,
              marginLeft: 10,
            }}
          >
            232222223
          </Text>
        </View>
      </View>

      {isComplete ? <ProgressBar /> : <AccountAction />}

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
          {/* <View style={{ paddingRight: 255, alignSelf: "flex-start" }}>
            <DropDownPicker
              items={assetlist}
              open={isAssetOpen}
              setOpen={() => setIsAssetOpen(!isAssetOpen)}
              value={currency}
              setValue={(val) => setCurrency(val)}
              placeholder="EUR"
              placeholderStyle={{ fontSize: 16, fontWeight: "300" }}
              style={{
                backgroundColor: "#212121",
                borderColor: "#212121",
                alignSelf: "flex-start",
              }}
              disableBorderRadius={false}
              textStyle={{ color: COLORS.darkyellow, fontSize: 14 }}
              labelStyle={{ color: COLORS.darkyellow, fontSize: 14 }}
              // arrowIconStyle={{backgroundColor: COLORS.darkyellow}}
              ArrowDownIconComponent={DownArrow}
              dropDownContainerStyle={{
                backgroundColor: "black",
                borderColor: COLORS.darkyellow,
              }}
            />
          </View> */}

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
                fontFamily: FONT.medium,
                fontSize: SIZES.large * 2,
                marginLeft: 3,
              }}
            >
              69,980,404
            </Text>
            <Text
              style={{
                fontSize: SIZES.medium + 2,
                color: COLORS.lightWhite,
                marginTop: 18,
              }}
            >
              .56
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, marginTop: 20, marginBottom: 30 }}>
          <FlatList
            data={optionData}
            renderItem={({ item }) => (
              <Options image={item.imageUrl} option={item.comm} nav={item.nav}/>
            )}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={{ rowGap: SIZES.medium + 5 }}
            vertical
            showsHorizontalScrollIndicator={false}
          />
          {/* <Options image={images.switchAccount} option={"Switch Accounts"} />
          <Options image={images.tradingPlan} option={"Trading Plan"} />
          <Options image={images.changePassword} option={"Change Password"} />
          <Options image={images.logout} option={"Log Out"} />
          <Options image={images.switchAccount} option={"Switch Accounts"} />
          <Options image={images.tradingPlan} option={"Trading Plan"} />
          <Options image={images.changePassword} option={"Change Password"} />
          <Options image={images.logout} option={"Log Out"} /> */}
        </View>
      </View>
    </ScrollView>
  );
};

const images = {
  switchAccount: require("../../assets/icons/switch.png"),
  changePassword: require("../../assets/icons/password.png"),
  tradingPlan: require("../../assets/icons/planning.png"),
  logout: require("../../assets/icons/logout1.png"),
};

const optionData = [
  {
    id: 1,
    imageUrl: require("../../assets/icons/change2.png"),
    comm: "Switch Accounts",
    nav: "Accounts"
  },
  {
    id: 2,
    imageUrl: require("../../assets/icons/planning.png"),
    comm: "Trading Plan",
    nav: "TradingPlan"
  },
  {
    id: 3,
    imageUrl: require("../../assets/icons/password.png"),
    comm: "Change Password",
    nav: "ResetPassword"
  },
  {
    id: 5,
    imageUrl: require("../../assets/icons/reporting.png"),
    comm: "Account report",
    nav: "TradingPlan"
  },
  {
    id: 11,
    imageUrl: require("../../assets/icons/upgrade.png"),
    comm: "Upgrade Account",
    nav: "Pricing"
  },
  {
    id: 4,
    imageUrl: require("../../assets/icons/logout1.png"),
    comm: "Log Out",
    nav: "SignIn"
  },
];

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
