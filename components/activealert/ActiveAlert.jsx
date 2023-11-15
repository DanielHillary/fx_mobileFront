import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import ActiveAlertCard from './ActiveAlertCard';
import LinearGradient from 'expo-linear-gradient'

import styles from './activealert.style'
import { useNavigation } from '@react-navigation/native';



const ActiveAlert = ({ alerts }) => {

  const data = [
    {
      name: 'John',
      age: 30,
      city: 'New York',
    },
    {
      name: 'Alice',
      age: 25,
      city: 'Los Angeles',
    },
    {
      name: 'Bob',
      age: 35,
      city: 'Chicago',
    },
    {
      name: 'Bob',
      age: 34,
      city: 'Chicago',
    },
    {
      name: 'Bob',
      age: 33,
      city: 'Chicago',
    },

  ]
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isEmpty, setIsEmpty] = useState(false);

  const { navigate } = useNavigation();

  let text1 = "History"
  let text2 = "Show all"

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Active Alerts</Text>
        <TouchableOpacity onPress={() => {navigate("PriceAlert")}}>
           <Text style={styles.headerBtn}>{isEmpty ? text1 : text2}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.darkyellow}/>
        ) : error ? ( 
          <Text>Something Went wrong</Text>
        ) : isEmpty ? (
          <View>
            <Text>No active Alerts</Text>
          </View>
        ) :(
          <FlatList 
            data={alerts}
            renderItem={({ item }) => (
              <ActiveAlertCard 
                item={item}
                handleCardPress={() => {navigate("AlertDetails")}}
              />
            )}
            keyExtractor={item => item?.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  )
}

export default ActiveAlert;