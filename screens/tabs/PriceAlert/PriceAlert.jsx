import { StyleSheet, Text, View, ScrollView} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { COLORS, FONT, SIZES } from '../../../constants'
import ActiveAlertsScreen from './ActiveAlertsScreen'
import AlertHistory from './AlertHistory';
import React, { useContext } from 'react'


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
            tabBarInactiveTintColor: COLORS.gray
          }}
        >
            <TopTab.Screen name='ActiveAlerts' component={ActiveAlertsScreen}/>
            <TopTab.Screen name='AlertHistory' component={AlertHistory}/>
        </TopTab.Navigator>
    )
}

const PriceAlert = () => {
  

  return (
    <View style={styles.baseContainer}>
      <View>
        <Text style={styles.baseText}>Price Alert</Text>
        <Text style={styles.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
        </Text>
      </View>
      <TopTabGroup />
    </View>
  )
}

export default PriceAlert;

const styles = StyleSheet.create({
  baseContainer:  {
    flexGrow: 1,
    backgroundColor: "#111",
  },
  baseText: {
    color: COLORS.lightWhite,
    padding: 5,
    marginHorizontal: 15,
    fontSize: SIZES.large + 5,
    fontWeight: "500"
  },
  desc: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium - 2,
    fontWeight: "300",
    width: "90%",
    paddingLeft: 5,
    marginHorizontal: 15,
  },
  tabBar: {
    width: "95%",
    margin: 20,
    alignSelf: 'center',
    backgroundColor: "#111",
  }
})