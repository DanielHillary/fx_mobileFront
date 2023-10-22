import { Dimensions, StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Gesture, GestureDetector, ScrollView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { COLORS, SIZES } from '../constants'
import ExitLevel from "./exits/ExitLevel";
import { FONT } from "../constants";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");



// const MAX_VALUE_Y = -SCREEN_HEIGHT + 145;
const MAX_VALUE_Y = -SCREEN_HEIGHT + 100;
const BottomSlide = () => {

    const translateY = useSharedValue(0);
    const [height, setHeight] = useState(-SCREEN_HEIGHT / 10)

    const context = useSharedValue({ y: 0 })
    const gesture = Gesture.Pan().onStart(() => {
        context.value = { y: translateY.value };

    }).onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(-translateY.value, MAX_VALUE_Y);
    }).onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 1.5) {
            translateY.value = withSpring(-SCREEN_HEIGHT / 15, { damping: 10 })
        } else if (translateY.value < -SCREEN_HEIGHT / 14) {
            translateY.value = withSpring(MAX_VALUE_Y, { damping: 10 })
        }
    })

    const changeVisibility = () => {
        if (height === -SCREEN_HEIGHT / 15) {
            return (
                <Text style={styles.slideText}>Slide up to see your exit strategies</Text>
            )
        } else {
            return null;
        }
    }

    useEffect(() => {
        translateY.value = withSpring(-SCREEN_HEIGHT / 1.2, { damping: 10 });
    }, [])

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -translateY.value }]
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
                            <ScrollView>
                                <View style={styles.contentholder}>
                                    <ExitLevel />
                                </View>
                            </ScrollView>
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
        // backgroundColor: "#B89F1B",
        backgroundColor: "green",
        position: "absolute",
        bottom: 30,
        borderRadius: 25,
    },
    line: {
        width: 75,
        height: 5,
        backgroundColor: "white",
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
        backgroundColor: "red"
    },
    contentholder: {
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
})

export default BottomSlide;