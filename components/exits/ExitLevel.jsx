import { useContext, useEffect, useState } from 'react'
import { View, Switch, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../constants';
import ExitLevelCard from './ExitLevelCard';
import EmptyList from '../EmptyList'
import styles from './exitlevel.style'
import { useNavigation } from '@react-navigation/native';
import { updateAccountAutoMode } from '../../api/accountApi';
import { AuthContext } from "../../context/AuthContext";


const ExitLevel = ({ details, isEmpty }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(isEmpty)
  const [isAuto, setIsAuto] = useState(true);

  const { navigate } = useNavigation();

  const { accountDetails, userInfo } = useContext(AuthContext);

  useEffect(() => {
    setIsAuto(accountDetails.autoExecuteLossLevels);
  }, [])

  const implementAutoMode = async(mode) => {
    const response = await updateAccountAutoMode(accountDetails.accountId, mode, false).then((res) => {
      return res.data;
    })
  }
  return (
    
    <View style={styles.container}>
      <View style={styling.options}>
        <Text style={styling.text}> Loss Levels</Text>
      </View>

      {accountDetails.subscriptionType === "Exclusive" && <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginHorizontal: 8,
          gap: SIZES.medium,
          width: "90%",
        }}
      >
        <Text style={styling.mode}>Auto-implement Exit {isAuto ? "[On]" : "[Off]"}</Text>
        <Switch
          value={isAuto}
          onValueChange={() => {
            setIsAuto((prev) => !prev);
            implementAutoMode(!isAuto);
            console.log(!isAuto);
          }}
          trackColor={{ false: "black" }}
          thumbColor={"green"}
        />
      </View>}
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
  },
  mode: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: COLORS.white,
  },
})