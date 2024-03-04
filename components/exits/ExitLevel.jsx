import { useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../constants';
import ExitLevelCard from './ExitLevelCard';
import EmptyList from '../EmptyList'
import styles from './exitlevel.style'
import { useNavigation } from '@react-navigation/native';


const ExitLevel = ({ details, isEmpty }) => {


  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(isEmpty)

  const { navigate } = useNavigation();
  return (
    
    <View style={styles.container}>
      <View style={styling.options}>
        <Text style={styling.text}> Loss Levels</Text>
      </View>
      <ScrollView >
        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" colors={COLORS.primary}/>
          ) : isEmpty ? (
            <EmptyList message={"No loss exits"}/>
          ) : (
            details?.map((item) => (
              <ExitLevelCard
                item={item}
                key={item.exitId}
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

const styling = StyleSheet.create({
  text: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
  options: {
    padding: SIZES.xSmall,
    borderWidth: 0.3,
    borderColor: COLORS.darkyellow,
    borderRadius: SIZES.medium,
    margin: SIZES.medium
  }
})