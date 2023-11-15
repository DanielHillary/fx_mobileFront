import { StyleSheet, Text, View, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'
import React from 'react'

const Alerts = ({ alerts }) => {

  return (
    <TouchableOpacity>
      <View style={styles.alertlist}>
        <View style={{flexDirection: 'row', borderBottomWidth: 0.2, width: 320, borderBottomColor: "white"}}>
          <Image 
            source={
              require('../../../assets/icons/dollar.png')
            }
            resizeMode='contain'
            style={[
              styles.image, {
                marginTop: 5
            }]}
          />
          <View style={{marginBottom:5}}>
            <Text style={[styles.text, styles.btc]}>{alerts.asset}</Text>
            <Text style={[styles.text, styles.trigger]}>Trigger date: {alerts.lastTime}</Text>
          </View>
          
          <View>
            <Text style={[styles.text, {
              marginLeft: 65,
              marginTop: 7
            }]}>below</Text>
            <Text style={[styles.text, {
              marginLeft: 65
            }]}>$54,034</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
  )
}

const AlertHistory = () => {
  const data = [
    {
      id: 1,
      asset: "BTC",
      lastTime: "June 12, 2029"
    },
    {
      id: 2,
      asset: "ETH",
      lastTime: "June 12, 2029"
    },
    {
      id: 3,
      asset: "EUR/USD",
      lastTime: "June 12, 2029"
    },
    {
      id: 4,
      asset: "V10 Index",
      lastTime: "June 12, 2029"
    },
    {
      id: 11,
      asset: "BTC",
      lastTime: "June 12, 2029"
    },
    {
      id: 22,
      asset: "ETH",
      lastTime: "June 12, 2029"
    },
    {
      id: 33,
      asset: "EUR/USD",
      lastTime: "June 12, 2029"
    },
    {
      id: 44,
      asset: "V10 Index",
      lastTime: "June 12, 2029"
    },
    {
      id: 10,
      asset: "BTC",
      lastTime: "June 12, 2029"
    },
    {
      id: 20,
      asset: "ETH",
      lastTime: "June 12, 2029"
    },
    {
      id: 30,
      asset: "EUR/USD",
      lastTime: "June 12, 2029"
    },
    {
      id: 40,
      asset: "V10 Index",
      lastTime: "June 12, 2029"
    }
  ]
  return (
    <View style={styles.baseContainer}>
      <FlatList 
        data={data}
        renderItem={({ item }) => (
          <Alerts 
              alerts={item}
          />
          )}
          keyExtractor={item => item?.id}
          contentContainerStyle={{ rowGap: SIZES.medium + 5 }}
          vertical
          showsHorizontalScrollIndicator={false}
      />
    </View>
    
  )
}

export default AlertHistory;

const styles = StyleSheet.create({
  baseContainer: {
    flexGrow: 1,
    backgroundColor: "#111",
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
  },
  image:{
    height: 26,
    width: 30,
    marginBottom: 10
  },
  line: {
    backgroundColor: 'white', 
    height: 0.4, 
    width: 120, 
    marginTop: 5
  },
  alertlist: {
    alignItems: 'center',
    marginTop: 10,
    gap: 30
  },
  btc: {
    fontSize: SIZES.large,
    fontWeight: '400',
    marginLeft: 10
  },
  trigger: {
    marginLeft: 10,
  },
})