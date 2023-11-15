import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONT } from "../../constants";
import ExitLevel from "../../components/exits/ExitLevel";
import TradeOutline from "./TradeOutline";

const TopTab = createMaterialTopTabNavigator();

const TopTabGroup = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.darkyellow,
          borderRadius: 5,
        },
        tabBarActiveTintColor: COLORS.darkyellow,
        tabBarInactiveTintColor: COLORS.gray,
      }}
    >
      <TopTab.Screen name="Profit" component={ExitLevel} />
      <TopTab.Screen name="Loss" component={ExitLevel} />
    </TopTab.Navigator>
  );
};

const TradeDetail = () => {
  const [snapPoint, setSnapPoint] = useState(false);
  const [position, setPosition] = useState();

  const snapPoints = useMemo(() => ["12%", "75%"], []);

  const bottomSheetRef = useRef(null);

  const handleClosePress = () => {
    bottomSheetRef.current.close();
  };
  const handleOpenPress = (index) => {
    bottomSheetRef.current.snapToIndex(index);
  };

  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={0}>
        <TouchableOpacity style={styles.footerContainer}>
          <Text style={styles.footerText}>View Strategy</Text>
        </TouchableOpacity>
      </BottomSheetFooter>
    ),
    []
  );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      {/* <Button title="Close" onPress={() => handleClosePress()} />
      <Button title="Open" onPress={() => handleOpenPress(0)} /> */}

      <TradeOutline />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backdropComponent={renderBackdrop}
        footerComponent={snapPoint && renderFooter}
        backgroundStyle={{ backgroundColor: COLORS.darkyellow }}
        onChange={(val) => {
          setPosition(val);
          if (val == 0) {
            setSnapPoint(false);
          } else {
            setSnapPoint(true);
          }
        }}
      >
        <BottomSheetView
          style={{
            backgroundColor: COLORS.componentbackground,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.lightWhite,
              fontFamily: FONT.medium,
              fontSize: SIZES.large,
              textAlign: "center",
              paddingTop: SIZES.medium,
            }}
          >
            Exit Levels
          </Text>
          {snapPoint ? (
            <>
              <Text>Monitor your trade for these levels</Text>
            </>
          ) : (
            <Text
              style={{
                color: COLORS.lightWhite,
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
                textAlign: "center",
                paddingTop: SIZES.xSmall - 5,
                marginBottom: SIZES.medium,
              }}
            >
              Slide up to see your exit levels
            </Text>
          )}
          <TopTabGroup />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default TradeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    // flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: COLORS.componentbackground,
  },
  contentholder: {
    padding: SIZES.medium,
    height: "100%",
  },
  tabBar: {
    width: 250,
    // marginHorizontal: 20,
    alignSelf: "center",
    backgroundColor: "#111",
    paddingHorizontal: SIZES.medium,
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: COLORS.darkyellow,
  },
  footerText: {
    textAlign: "center",
    color: "black",
    fontWeight: "800",
    fontSize: SIZES.medium,
  },
});
