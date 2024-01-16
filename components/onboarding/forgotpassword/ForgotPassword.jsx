import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONT } from '../../../constants'

const ForgotPassword = () => {
  return (
    <View style={styles.base}>
      <Text>ForgotPassword</Text>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  }
})