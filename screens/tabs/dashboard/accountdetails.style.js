import { StyleSheet } from "react-native";

import { COLORS, SIZES } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: 170,
        padding: 2,
        backgroundColor: "#1a1918",
        borderRadius: 25,
        // justifyContent: "flex-end",
        // alignContent: "center",
    },
    accountcontainer: {
        paddingLeft: 10,
        marginTop: 10
    },
    balance : {
        fontSize: SIZES.xxLarge + 10,
        color: COLORS.lightWhite,
        alignSelf: "center",
        fontWeight: "600"
    },
    text : {
        height: 50,
        width: "100%",
        color: COLORS.white,
        fontSize: SIZES.xLarge,
        fontWeight: "bold"
     },
    smallbalance : {
        fontSize: SIZES.medium, 
        marginVertical: 5,
        height: 23,
        color: COLORS.lightWhite,
        justifyContent: "flex-end",
        alignSelf: "flex-end"
    }
})

export default styles;