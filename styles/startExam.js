import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        // padding: 15,
        // paddingTop: 50,
        position: "relative",
        zIndex: 1,
        backgroundColor: "#f3f6f9",
    },
    scrollInner: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 10,
    },
    menuItem: {
        paddingTop: 7,
        paddingBottom: 7,
        marginBottom: 15,
    },
    menuSingleItemWrap: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    menuImg: {
        width: 17,
        height: 17,
        objectFit: "contain",
        marginRight: 10,
    },
    menuText: {
        fontSize: 16,
        color: "#00253d",
        textTransform: "uppercase",
        fontFamily: "font-medium"
    },
    topBar: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // marginBottom: 25,
        padding: 15,
        paddingTop: 15,
        backgroundColor: "#d6d4ed",
        borderBottomEndRadius: 13,
        borderBottomStartRadius: 13,
    },
    tobBarLeft: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    menu: {
        width: 25,
        height: 25,
        marginRight: 20,
    },
    personName: {
        fontSize: 16,
        color: "#000",
        fontFamily: "font-medium",
    },
    topBarImg: {
        width: 45,
        height: 45,
        objectFit: "cover",
        borderRadius: "50%",
        borderColor: "#fff",
        borderWidth: 2,
    },



    quesInd: {
        fontSize: 18,
        color: "#000",
        fontFamily: "font-medium",
        marginBottom: 15,
    },
    quesCard: {
        width: "100%",
        padding: 15,
        backgroundColor: "#ffe9d480",
        borderRadius: 8,
        elevation: 5,

        // Shadow styles for iOS and Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        
        marginBottom: 20,
    },
    quesHeading: {
        fontSize: 16,
        fontFamily: "font-bold",
        marginBottom: 18,
    },
    quesOptWrap: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    quesOpt: {
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    quesAnsInd: {
        width: 25,
        height: 25,
        borderRadius: 30,
        fontSize: 15,
        fontFamily: "font-medium",
        // backgroundColor: "#00253d",
        // color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        borderWidth: 1,
        borderColor: "#00253d"
    },
    quesAnsText: {
        fontSize: 14,
        fontFamily: "font-regular",
    },

    subAnsNextBtn: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "#00253d",
        color: "#fff",
        fontFamily: "font-medium",
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

})