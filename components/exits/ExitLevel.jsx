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
      name: '12332.576',
      age: 1.5665,
      city: 4,
      count: 1,
    },
    {
      name: '24523.029',
      age: 2.5323,
      city: 3.4,
      count: 2,
    },
    {
      name: '02323.566',
      age: 0.5650,
      city: 0.4,
      count: 3,
    },
   

  ]
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { navigate } = useNavigation();
  return (
    
    <View style={styles.container}>
      <ScrollView >
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