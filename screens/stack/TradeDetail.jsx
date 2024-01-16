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
  BottomSheetScrollView,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import { COLORS, SIZES, FONT } from "../../constants";
import ExitLevel from "../../components/exits/ExitLevel";
import TradeOutline from "./TradeOutline";
import ExitLevelForProfit from "../../components/exits/ExitLevelForProfit";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getExitLevelsForTrade } from "../../api/exitLevelsApi";



const TradeDetail = () => {
  const [snapPoint, setSnapPoint] = useState(false);
  const [position, setPosition] = useState();
  const [hasFetched, setHasFetched] = useState(false);
  const [exitLevels, setExitLevels] = useState({});

  const route = useRoute();

  const navigation = useNavigation();

  const tradeDetails = route.params?.data || null;

  const getExitLevels = async () => {
    const response = await getExitLevelsForTrade(tradeDetails.id).then((res) => {
      return res.data
    })

    if(response.status){
      setExitLevels(response.data);
      setHasFetched(true);
    }else{
      console.log(response.message);
    }
  }

  useEffect(() => {
    if(!hasFetched){
      getExitLevels();
    }
  }, [])

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
        <TouchableOpacity style={styles.footerContainer} onPress={() => {
          navigation.navigate("Plan");
        }}>
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
        onClose={() => {
          handleOpenPress(0);
        }}
      >
        <BottomSheetScrollView
          style={{
            backgroundColor: COLORS.componentbackground,
            flex: 1,
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
                Monitor your trades for these levels
              </Text>
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
          <ExitLevelForProfit details={exitLevels.profitLevels}/>
          <ExitLevel details={exitLevels.lossLevels}/>
        </BottomSheetScrollView>
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
