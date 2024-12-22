import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        position: "relative"
    },
    loginContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 8,
        alignItems: "center",
    },
    loginTop: {
        width: "100%",
        height: 310,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d6d4ed",
        padding: 25,
        marginBottom: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    logo: {
        width: 200,
        height: 200,
    },
    signInText: {
        color: "#003f68",
        fontSize: 20,
        fontFamily: "font-bold",
    },
    inpWrap: {
        width: "100%",
        padding: 25,
    },
    inpLabel: {
        fontSize: 16,
        marginBottom: 5,
        fontFamily: "font-medium"
    },
    input: {
        width: "100%",
        height: 40,
        // backgroundColor: "#f0eff5",
        // paddingLeft: 10,
        // paddingRight: 7,
        marginBottom: 30,
        color: "#000",
        fontSize: 20,
        fontFamily: "font-medium"
    },
    checkboxWrap: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    forgotPass: {
        color: "#aaa",
        marginBottom: 15,
        fontFamily: "font-regular",
    },
    loginButton: {
        backgroundColor: "#003f68",
        padding: 15,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginBottom: 30,
    },

    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "font-medium"
    },
    createNewText: {
        color: "#aaa",
        textAlign: "center",
        fontFamily: "font-bold",
    },
    createSignup: {
        color: "#003f68",
    },

    showPaymentContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
    },
    paymentConInner: {
        width: "90%",
        backgroundColor: "#fff1ec",
        borderRadius: 5,
        padding: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    payText: {
        fontFamily: "font-medium",
        fontSize: 26,
        textAlign: "center",
        marginBottom: 100,
    },
    payBtn: {
        width: "100%",
        height: 45,
        backgroundColor: "#003f68",
        fontFamily: "font-medium",
        fontSize: 18,
        textAlign: "center",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
});