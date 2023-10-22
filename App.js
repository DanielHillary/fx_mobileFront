import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { loadCustomFont } from "./components/exits/exitlevelcard.style";
import { loadThemeCustomFont } from "./constants/theme";
import BottomSlide from "./components/BottomSlide";
import { COLORS, SIZES } from "./constants/theme";
import Navigation from "./Navigation";

const App = () => {
  useEffect(() => {
    loadCustomFont();
    loadThemeCustomFont();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;
