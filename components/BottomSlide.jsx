import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Gesture, GestureDetector, ScrollView } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { COLORS, SIZES} from '../constants'
import ExitLevel from "./exits/ExitLevel";
import { FONT } from "../constants";



const TopTab = createMaterialTopTabNavigator();

const TopTabGroup = () => {
    return (
        <TopTab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarIndicatorStyle: {
              backgroundColor: COLORS.darkyellow,
              borderRadius: 5,
            },
            tabBarActiveTintColor: COLORS.darkyellow,
            tabBarInactiveTintColor: COLORS.gray,

          }}
        >
            <TopTab.Screen name='Profit' component={ExitLevel} />
            <TopTab.Screen name='Loss' component={ExitLevel}/>
        </TopTab.Navigator>
    )
}

const { height: SCREEN_HEIGHT} = Dimensions.get("window");

const MAX_VALUE_Y = -SCREEN_HEIGHT + 240
const BottomSlide = () => {

    const translateY = useSharedValue(0);
    const [height, setHeight] = useState(-SCREEN_HEIGHT/15)

    const context = useSharedValue({ y: 0 })
    const gesture = Gesture.Pan().onStart(() => {
      context.value = { y: translateY.value };
    
    }).onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_VALUE_Y);
    }).onEnd(() => {
        
        if(-translateY.value > SCREEN_HEIGHT/2 || -translateY.value > SCREEN_HEIGHT/3.5){
            translateY.value = withSpring(-SCREEN_HEIGHT/9, {damping:15})
            
        }else if(translateY.value < -SCREEN_HEIGHT/8.6 || translateY.value > -SCREEN_HEIGHT/2){
            translateY.value = withSpring(MAX_VALUE_Y, {damping:10})
        }
    })

    const changeVisibility = () => {
        if(height === -SCREEN_HEIGHT/15){
            return (
                <Text style={styles.slideText}>Slide up to see your exit strategies</Text>
            )
        }else{
            return null;
        }
    }

    useEffect(() => {
        translateY.value = withSpring(-SCREEN_HEIGHT/9, { damping: 15 });
    }, [])

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })

    
    return (    
    <GestureDetector gesture={gesture}>
        <View style={{ width: "100%", position: "absolute", bottom: 0 }}>

            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]} >

                <View style={styles.line} />
                <View style={{ flex: 1, alignContent: "center", backgroundColor: "#282828", height: 15 }}>
                    <View style={styles.strategyContainer}>
                        <Text style={styles.exitText}>Exit Levels</Text>
                        {changeVisibility()}
                        <View style={styles.header}>
                            <TouchableOpacity>
                                <Text style={styles.headerBtn}>View Strategy</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <ScrollView > */}
                            <View style={styles.contentholder}>
                                <TopTabGroup />
                            </View>
                        {/* </ScrollView> */}
                    </View>
                </View>
            </Animated.View>
        </View>
    </GestureDetector>
    )
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        flex: 1,
        flexGrow: 1,
        height: SCREEN_HEIGHT,
        width: "100%",
        backgroundColor: "#B89F1B",
        position: "absolute",
        // top: SCREEN_HEIGHT,
        borderRadius: 25,
    },
    line: {
        width: 75,
        height: 5,
        backgroundColor: "black",
        alignSelf: "center",
        borderRadius: 5,
        marginVertical: 8
    },
    exitText: {
        height: 30,
        width: "auto",
        alignSelf: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "300",
        marginTop: 7,
        fontSize: SIZES.xLarge,
    },
    slideText: {
        width: "auto",
        height: 20,
        alignSelf: "center",
        color: COLORS.lightWhite,
        fontSize: SIZES.small,
        fontWeight: "300",
        marginTop: 0,
    },
    strategyContainer: {
        flex: 1,
    },
    contentholder:{
        flex: 1,
        padding: SIZES.medium,
    },
    header: {
        flexDirection: "row-reverse",
        alignItems: "end",
        marginTop: SIZES.medium,
        paddingLeft: 20,
        paddingBottom: 5,
    },
    headerBtn: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.darkyellow,
        alignSelf: "flex-end"
    },
    tabBar: {
        width: 250,
        // marginHorizontal: 20,
        alignSelf: 'center',
        backgroundColor: "#111",
    }
})

export default BottomSlide;