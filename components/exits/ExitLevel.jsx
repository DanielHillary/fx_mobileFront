import { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList } from 'react-native'
import { COLORS, SIZES } from '../../constants';
import ExitLevelCard from './ExitLevelCard';

import styles from './exitlevel.style'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';


const ExitLevel = () => {

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
    {
      name: 'Bob',
      age: 32,
      city: 'Chicago',
    },
    {
      name: 'Bob',
      age: 31,
      city: 'Chicago',
    },
    {
      name: 'Bob',
      age: 40,
      city: 'Chicago',
    },
    {
      name: 'Bob',
      age: 41,
      city: 'Chicago',
    },
    {
      name: 'Bob',
      age: 42,
      city: 'Chicago',
    },
    {
      name: 'Bob',
      age: 43,
      city: 'Chicago',
    },
    {
      name: 'Bob',
      age: 44,
      city: 'Chicago',
    },

  ]
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { navigate } = useNavigation();
  return (
    
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" colors={COLORS.primary}/>
          ) : error ? (
            <Text>Something Went wrong</Text>
          ) : (
            data?.map((item) => (
              <ExitLevelCard
                item={item}
                key={item.age}
                handleNavigate={()=> {}}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
    
  )
}

export default ExitLevel;