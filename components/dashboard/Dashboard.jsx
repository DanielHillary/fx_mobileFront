import { Pressable, StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useLayoutEffect } from 'react'
import { COLORS, SIZES, icons, images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import Accountdetails from './Accountdetails'

import styles from './dashboard.style'
import ActiveAlert from '../activealert/ActiveAlert'
import ActiveTrade from '../activetrades/ActiveTrade'

const Dashboard = () => {

  const navigation = useNavigation();

  const Stack = createNativeStackNavigator();

  return (
    <View style={{flex: 1, backgroundColor: "#111"}}>
      <ScrollView>
          <Accountdetails />
          <ActiveAlert />
          <ActiveTrade />
      </ScrollView>
    </View>
  )
}

export default Dashboard

