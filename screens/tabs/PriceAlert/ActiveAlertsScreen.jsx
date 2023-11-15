import { StyleSheet, Text, View, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import { COLORS, FONT, SIZES } from '../../../constants'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const ActiveAlerts = ({ alerts, navigate }) => {

  return (
    <TouchableOpacity 
      onPress={() => {navigate("AlertDetails")}}
    >
      <View style={styles.alertlist}>
        <View style={{flexDirection: 'row', borderBottomWidth: 0.2, width: 320, borderBottomColor: "white"}}>
          <Image 
            source={
              require('../../../assets/icons/dollar.png')
            }
            resizeMode='contain'
            style={[
              styles.image, {
                marginTop: 5
            }]}
          />
          <View style={{marginBottom:5}}>
            <Text style={[styles.text, styles.btc]}>BTC</Text>
            <Text style={[styles.text, styles.trigger]}>Last triggered: June 23, 2022</Text>
          </View>
          <TouchableOpacity
            onPress={() => {navigate("AlertDetails")}}
          >
            <Image 
              source={
                require('../../../assets/icons/ChevRight.png')
              }
              resizeMode='contain'
              style={[
                styles.image, {
                  marginLeft: 75,
                  height: 18,
                  marginTop: 10
                }
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
  )
}

const ActiveAlertsScreen = () => {
  const { navigate } = useNavigation();

  const data = [
    {
      id: 1,
      asset: "BTC",
      lastTime: "June 12, 2029"
    },
    {
      id: 2,
      asset: "BTC",
      lastTime: "June 12, 2029"
    },
    {
      id: 3,
      asset: "BTC",
      lastTime: "June 12, 2029"
    },
    {
      id: 4,
      asset: "BTC",
      lastTime: "June 12, 2029"
    }
  ]
  return (
    <View style={styles.baseContainer}>
      <FlatList 
        data={data}
        renderItem={({ item }) => (
          <ActiveAlerts 
              alerts={item}
              navigate={navigate}
          />
          )}
          keyExtractor={item => item?.id}
          contentContainerStyle={{ rowGap: SIZES.medium + 5 }}
          vertical
          showsHorizontalScrollIndicator={false}
      />

        <TouchableOpacity
            onPress={() => {
              navigate("SetAlert");
            }}
            style={styles.button}
          >
              <Text style={styles.buttonText}>+ Add new alert</Text>
        </TouchableOpacity>
    </View>
    
  )
}

export default ActiveAlertsScreen

const styles = StyleSheet.create({
  baseContainer: {
    flexGrow: 1,
    backgroundColor: "#111",
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
  },
  image:{
    height: 26,
    width: 30,
    marginBottom: 10
  },
  line: {
    backgroundColor: 'white', 
    height: 0.4, 
    width: 120, 
    marginTop: 5
  },
  alertlist: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    gap: 30
  },
  btc: {
    fontSize: SIZES.large,
    fontWeight: '400',
    marginLeft: 10
  },
  trigger: {
    marginLeft: 10,
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 10,
    marginBottom: 30,
    alignSelf: 'center'
  },
  buttonText: {
    flex: 1, 
    alignSelf: 'center', 
    marginTop: 10,
    fontSize: SIZES.large,
    color: "black",
    fontFamily: FONT.bold
  }
})