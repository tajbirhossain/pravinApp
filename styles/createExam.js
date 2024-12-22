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



    createExamHeading: {
        fontSize: 21,
        fontFamily: "font-semibold",
        textAlign: "center",
        marginBottom: 15,
    },

    selectWrap: {
        marginBottom: 25,
    },
    examSelectLabel: {
        fontSize: 14,
        fontFamily: "font-regular",
        marginBottom: 5,
    },


    getPaperBtnWrap: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    genPaperBtn: {
        width: 170,
        height: 45,
        backgroundColor: "#00253d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    genBtnText: {
        fontSize: 16,
        fontFamily: "font-medium",
        color: "#fff",
    },

    

})