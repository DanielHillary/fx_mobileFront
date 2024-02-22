import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '../constants'

const EmptyList = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.componentbackground,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: SIZES.medium,
        width: 250,
        height: 80,
        marginTop: SIZES.medium * 1.5,
        padding: SIZES.medium,
    },
    text: {
        color: COLORS.lightWhite,
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        textAlign: 'center'
    }
})