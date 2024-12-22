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



    prifileImgWrap: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    profileImg: {
        width: 170,
        height: 170,
        objectFit: "contain",
        borderColor: "rgb(0, 63, 104)",
        borderWidth: 3,
        borderRadius: "50%",
        marginBottom: 10,
    },
    profileName: {
        fontSize: 24,
        fontFamily: "font-medium",
        textAlign: "center",
        marginBottom: 15,
    },

    mainInfoWrap: {
        width: "100%",
        borderRadius: 8,
        backgroundColor: "rgba(214, 212, 237, 0.5)",
        padding: 15,
        marginBottom: 20,
    },
    mainInfoWrapAdd: {
        width: "100%",
        borderRadius: 8,
        backgroundColor: "rgba(255, 241, 236, 0.5)",
        padding: 15,
        marginBottom: 20,
    },
    mainInfoTop: {
        paddingBottom: 15,
        borderBottomColor: "rgb(0, 63, 104)",
        borderBottomWidth: 2,
    },
    addInfoTop: {
        paddingBottom: 15,
        borderBottomColor: "#e9b19b",
        borderBottomWidth: 2,
    },
    mainInfoText: {
        fontSize: 18,
        fontFamily: "font-medium",
        textAlign: "center",
    },
    mainInfoContent: {
        paddingTop: 15,
    },

    mainInfoSingle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        paddingBottom: 10,
        marginBottom: 10,
    },
    addInfoSingle: {
        display: "flex",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        paddingBottom: 10,
        marginBottom: 10,
    },
    mainInfoLeft: {
        width: "50%",
        paddingRight: 10,
    },
    addInfoLeft: {
        width: "100%",
        paddingBottom: 10,
    },
    mainLeftText: {
        fontSize: 15,
        fontFamily: "font-medium",
    },
    addLeftText: {
        fontSize: 13,
        fontFamily: "font-medium",
    },
    mainInfoRight: {
        width: "50%",
        paddingLeft: 5,
    },
    addInfoRight: {
      width: "100%"  
    },
    mainRightText: {
        fontSize: 15,
        fontFamily: "font-regular",
    }

    

})