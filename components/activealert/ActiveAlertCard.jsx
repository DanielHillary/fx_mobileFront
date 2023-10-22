import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import styles from './activealertcard.style'


const ActiveAlertCard = ({ item, handleCardPress }) => {
  return (
    // <LinearGradient
    //   colors={[ "rgba(184, 159, 27, 0.2)", "rgba(184, 159, 27, 0.03"]}
    // >
    <View>
      <TouchableOpacity style={styles.container}
        onPress={() => handleCardPress()}
      >
        <TouchableOpacity style={styles.logoContainer}>
          <Image 
            source={{ uri: "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"}}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>
        <Text style={styles.companyName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.jobName} numberOfLines={1}> {item.name}</Text>
          <Text style={styles.location}>{item.city}</Text>
        </View>
      </TouchableOpacity>
    </View>
    // {/* </LinearGradient> */}
  )
}

export default ActiveAlertCard;