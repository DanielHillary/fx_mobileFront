import { View, Image, ScrollView, TouchableOpacity, Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Accountdetails from './Accountdetails'
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './dashboard.style'
import ActiveAlert from '../../../components/activealert/ActiveAlert'
import ActiveTrade from '../../../components/activetrades/ActiveTrade'
import { SIZES } from '../../../constants'
import { AuthContext } from '../../../context/AuthContext'
import { getUserDashboard } from '../../../api/dashboardApi'


const Dashboard = () => {
  const [accountInfo, setAccountInfo] = useState({});
  const [accountDetails, setAccountDetails] = useState({});

  const navigation = useNavigation();

  const Stack = createNativeStackNavigator();

  const { userInfo } = useContext(AuthContext);
  // console.log(userInfo)

  const accountId = userInfo.user.userId;

  useEffect(() => {
    getUserDashboard(accountId).then((res) => {
      if(!res.ok){
        console.log('Something went wrong')
      }
      return res.json();
    }).then((data) => {
      setAccountDetails(data.data.account);
      setAccountInfo(data.data);
      console.log(data.data.account)
      AsyncStorage.setItem("accountInfo", JSON.stringify(data.data.account))
      
    });
    
  }, [])

  return (
    <View style={{flex: 1, paddingHorizontal: SIZES.small - 5, backgroundColor: "#111"}}>
      <ScrollView>
          <Accountdetails account={accountDetails}/>
          {/* <Accountdetails/> */}
          <ActiveAlert alerts={accountInfo.activeAlerts} />
          {/* <ActiveAlert/> */}
          <ActiveTrade trades={accountInfo.activeTrades}/>
          {/* <ActiveTrade/> */}
      </ScrollView>
    </View>
  )
}

export default Dashboard

