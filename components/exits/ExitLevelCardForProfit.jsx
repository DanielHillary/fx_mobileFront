import { View, Text, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native";

import styles from "./exitlevelcard.style";
import { COLORS, SIZES } from "../../constants";

const ExitLevelCardForProfit = ({ item, handleNavigate }) => {
  return (
    <View style={styles.container} onPress={
      handleNavigate()
    }>
      <View style={styles.textContainer}>
        <View style={{height: 20, width: 20, borderRadius: 10, borderColor: COLORS.white, borderWidth: 0.5}}>
          <Text style={{color: COLORS.lightWhite, textAlign: 'center'}}>{item.count}</Text>
        </View>
        <View>
          <Text style={styles.at} numberOfLines={1}>
            At
          </Text>
          <Text style={{color: COLORS.darkyellow, fontSize: SIZES.large}}>{item.inTradeProfitLevelPrice}</Text>
        </View>

        
        {item.lotSize != 0 && <View>
          <Text style={styles.jobType}>Reduce lotSize</Text>
          <View style={{flexDirection: 'row',}}>
             <Text style={{color: COLORS.lightWhite, marginTop: 3}}>by</Text>
             <Text style={{color: COLORS.darkyellow, fontSize: SIZES.large, marginLeft: 6, alignSelf: 'flex-end'}}>{item?.lotSize}</Text>
          </View>
        </View>}

        <View>
          <Text style={styles.jobType}>Set stopLoss</Text>
          <View style={{flexDirection: 'row'}}>
             <Text style={{color: COLORS.lightWhite,  marginTop: 3}}>at</Text>
             <Text style={{color: COLORS.darkyellow, fontSize: SIZES.large, marginLeft: 6, alignSelf: 'flex-end'}}>{item?.slplacementPriceAfterProfit}</Text>
          </View>
        </View>
      </View> 
      {/* <View style={{backgroundColor: COLORS.white, height: 0.5, width: "100%"}} /> */}
    </View>
  );
};

export default ExitLevelCardForProfit;





























