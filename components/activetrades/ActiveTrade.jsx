import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import LinearGradient from 'expo-linear-gradient'

import styles from './activetrade.style'
import ActiveTradeCard from './ActiveTradeCard';



const ActiveTrade = ({ trades }) => {

  const data = [
    {
      name: 'John',
      age: 30,
      city: 'New York',
      active: false,
    },
    {
      name: 'Alice',
      age: 25,
      city: 'Los Angeles',
      active: true,
    },
    {
      name: 'Bob',
      age: 35,
      city: 'Chicago',
      active: true,
    },
    {
      name: 'Bob',
      age: 34,
      city: 'Chicago',
      active: true,
    },
    {
      name: 'Bob',
      age: 33,
      city: 'Chicago',
      active: false
    },

  ]
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  

  // const handleCardPress = (item) => {
  //   router.push(`/job-details/${item.job_id}`);
  //   setSelectedJob(item.job_id);
  // }

  // console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trades</Text>
        {/* <TouchableOpacity>
           <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.darkyellow}/>
        ) : error ? (
          <Text>Something Went wrong</Text>
        ) : (
          <FlatList 
            data={trades}
            renderItem={({ item }) => (
              <ActiveTradeCard 
                item={item}
              />
            )}
            keyExtractor={item => item?.id}
            contentContainerStyle={{ rowGap: SIZES.small }}
            vertical
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  )
}

export default ActiveTrade;