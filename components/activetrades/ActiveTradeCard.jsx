import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

import styles from './activetradecard.style'



const ActiveTradeCard = ({ item }) => {

  const { navigate } = useNavigation();

  return (
      <TouchableOpacity style={styles.container}
        onPress={() => {
          navigate("TradeDetails");
        }}
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.asset}>EUR/USD</Text>
          <Text style={styles.date}>12 June 2023</Text>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.companyName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.infoContainer}>
            {/* <Text style={styles.jobName} numberOfLines={1}> {item.name}</Text> */}
            <Text style={styles.location}>{item.city}</Text>
          </View>
        </View>
      </TouchableOpacity>
  )
}

export default ActiveTradeCard;