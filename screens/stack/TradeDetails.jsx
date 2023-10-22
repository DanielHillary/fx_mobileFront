import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { loadCustomFont } from '../../components/exits/exitlevelcard.style'
import { loadThemeCustomFont } from '../../constants/theme';
import BottomSlide from '../../components/BottomSlide';

const TradeDetails = () => {

  useEffect(() => {
    loadCustomFont();
    loadThemeCustomFont();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={{ color: "white" }}> I am really really tired</Text>

        <Text style={{ alignContent: "flex-end", color: "white" }}>This is part  page</Text>
        <Text style={{ alignContent: "flex-end", color: "white" }}>This is part  page</Text>

        <BottomSlide />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: 'orange',
    opacity: 0.6,
  },
});


export default TradeDetails;