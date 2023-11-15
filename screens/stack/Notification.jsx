import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import NoteBottom from "./NoteBottom";
import { useNavigation } from "@react-navigation/native";

const NotificationCard = () => {

  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: COLORS.componentbackground,
        width: "100%",
        gap: SIZES.xSmall,
        padding: SIZES.xSmall,
        borderRadius: SIZES.small
      }}
    >
      <Image
        source={require("../../assets/icons/notif.png")}
        resizeMode="contain"
        style={{ height: 20, width: 20, opacity: 0.7 }}
      />

      <View style={{ width: "70%" }}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontFamily: FONT.bold, color: COLORS.lightWhite, fontSize: SIZES.medium}}>Title:</Text>
          <Text style={{ color: COLORS.lightWhite }}>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.viewing}
          onPress={() => {
            navigation.navigate('Notify');
          }}
        >
          <Text style={{ color: COLORS.darkyellow }}>View</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: COLORS.lightWhite }}>34m ago</Text>
    </View>
  );
};

const data = [
  {
    name: "John",
    age: 30,
    city: "New York",
  },
  {
    name: "Alice",
    age: 25,
    city: "Los Angeles",
  },
  {
    name: "Bob",
    age: 35,
    city: "Chicago",
  },
  {
    name: "Bob",
    age: 34,
    city: "Chicago",
  },
  {
    name: "Bob",
    age: 33,
    city: "Chicago",
  },
  {
    name: "Bob",
    age: 37,
    city: "Chicago",
  },
  {
    name: "Bob",
    age: 39,
    city: "Chicago",
  },
];

const Notification = () => {
  const [allPressed, setAllPressed] = useState(true);
  const [alertPressed, setAlertPressed] = useState(false);
  const [ongoingPressed, setOngoingPressed] = useState(false);
  const [exitPressed, setExitPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  

  const setRestInActive = (item) => {
    let search = "All";
    if (item == "exit") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
    } else if (item == "All") {
      search = item;
      setAlertPressed(false);
      setOngoingPressed(false);
      setExitPressed(false);
    } else if (item == "ongoing") {
      search = item;
      setExitPressed(false);
      setAlertPressed(false);
      setAllPressed(false);
    } else if (item == "alerts") {
      search = item;
      setExitPressed(false);
      setOngoingPressed(false);
      setAllPressed(false);
    }

    return search;
  };

  return (
    <View style={styles.base}>
      <View>
        <ScrollView styles={styles.container} horizontal={true}>
        
          <View style={{ flexDirection: "row", gap: SIZES.small - 2 }}>
            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 70,
                padding: SIZES.small - 3,
                backgroundColor: allPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setAllPressed(true);
                setRestInActive("All");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 100,
                padding: SIZES.small - 3,
                backgroundColor: alertPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setAlertPressed(true);
                setRestInActive("alerts");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Price Alerts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 120,
                padding: SIZES.small - 3,
                backgroundColor: ongoingPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setOngoingPressed(true);
                setRestInActive("ongoing");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Ongoing Trades</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderColor: COLORS.darkyellow,
                borderWidth: 0.5,
                borderRadius: SIZES.medium,
                width: 100,
                padding: SIZES.small - 3,
                backgroundColor: exitPressed
                  ? COLORS.darkyellow
                  : COLORS.appBackground,
                alignItems: "center",
              }}
              onPress={() => {
                setExitPressed(true);
                setRestInActive("exit");
              }}
            >
              <Text style={{ color: COLORS.lightWhite }}>Exit Levels</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.darkyellow} />
        ) : error ? (
          <Text>Something Went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <NotificationCard item={item} />}
            keyExtractor={(item) => item?.age}
            contentContainerStyle={{ rowGap: SIZES.small }}
            vertical
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    padding: SIZES.small,
  },
  container: {
    padding: SIZES.medium,
  },
  cardsContainer: {
    flex: 1,
    marginTop: SIZES.medium,
    padding: SIZES.xSmall - 6,
    alignSelf: "center",
  },
  viewing: {
    marginTop: SIZES.medium,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 70,
    borderColor: COLORS.darkyellow,
    borderRadius: SIZES.small - 4,
    borderWidth: 1,
  }
});
