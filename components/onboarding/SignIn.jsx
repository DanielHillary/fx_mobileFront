import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SignIn = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Sign Into the app</Text>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})