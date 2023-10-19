import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
    
      <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={{ color: "white" }}> I am really really tired</Text>
            <BottomSlide />
          </View>     
      </GestureHandlerRootView> 
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