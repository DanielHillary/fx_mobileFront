import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Button } from "react-native";

import { COLORS, SIZES, FONT } from "../../constants";

const ChangesCard = ({ item, handleNavigate }) => {
  return (
    <View style={styles.container} onPress={
      handleNavigate()
    }>
      <View style={styles.textContainer}>
        <View style={{height: 20, width: 20, borderRadius: 10, borderColor: COLORS.white, borderWidth: 0.5}}>
          <Text style={{color: COLORS.lightWhite, textAlign: 'center'}}>{item.changeNumber}</Text>
        </View>
        <View>
          <Text style={styles.at} numberOfLines={1}>
            At
          </Text>
          <Text style={{color: COLORS.darkyellow, fontSize: SIZES.large}}>{item.priceAtChange}</Text>
        </View>

        
        {item.lotSizeChange != 0 && <View>
          <Text style={styles.jobType}>Reduce lotSize</Text>
          <View style={{flexDirection: 'row',}}>
             <Text style={{color: COLORS.lightWhite, marginTop: 3}}>by</Text>
             <Text style={{color: COLORS.darkyellow, fontSize: SIZES.large, marginLeft: 6, alignSelf: 'flex-end'}}>{item?.lotSizeChange}</Text>
          </View>
        </View>}

        {item.stopLossChange != 0 && <View>
          <Text style={styles.jobType}>Set stopLoss</Text>
          <View style={{flexDirection: 'row'}}>
             <Text style={{color: COLORS.lightWhite,  marginTop: 3}}>at</Text>
             <Text style={{color: COLORS.darkyellow, fontSize: SIZES.large, marginLeft: 6, alignSelf: 'flex-end'}}>{item?.stopLossChange}</Text>
          </View>
        </View>}
      </View> 
      {/* <View style={{backgroundColor: COLORS.white, height: 0.5, width: "100%"}} /> */}
    </View>
  );
};

export default ChangesCard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      height: 70,
      columnGap: SIZES.medium,
      padding: SIZES.small,
      borderRadius: SIZES.small,
      backgroundColor: "#111",
      // ...SHADOWS.medium,
      shadowColor: COLORS.white,
      alignSelf: "flex-start"
    },
    logoContainer: {
      width: 30,
      height: 30,
      backgroundColor: COLORS.white,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    logImage: {
      width: "100%",
      height: "100%",
      borderRadius: 25
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      // marginHorizontal: SIZES.small,
      gap: SIZES.large
    },
    at: {
      fontSize: SIZES.small,
      fontFamily: "DMBold",
      color: COLORS.lightWhite,
    },
    jobType: {
      fontSize: SIZES.small,
      fontFamily: "DMRegular",
      color: COLORS.lightWhite,
      textTransform: "capitalize",
      // marginLeft: 20
    },
  });
  




























