// import { Text } from "galio-framework";
import { useEffect, useState } from "react";
import { Image, Text, Pressable, StyleSheet, TextInput, TouchableOpacity, View, Dimensions } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { styles } from "../../styles/login";
import axios from "axios";
import { useData } from "../../context/DataContext";



const Login = ({ navigation }) => {
  const [fontsloaded, setFontsLoaded] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { storeApiData } = useData()
  const [showPayment, setShowPayment] = useState(false)

  let ScreenHeight = Dimensions.get("window").height


  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    async function loadResourcesAsync() {
      try {
        await Font.loadAsync({
          "font-black": require("../../assets/fonts/Poppins-Black.ttf"),
          "font-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
          "font-medium": require("../../assets/fonts/Poppins-Medium.ttf"),
          "font-regular": require("../../assets/fonts/Poppins-Regular.ttf"),
          "font-light": require("../../assets/fonts/Poppins-Light.ttf"),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAsync();
  }, [])


  const CustomLabel = ({ text, checkedValue, changeChecked }) => (
    <Text style={{ marginLeft: 6, color: "black", fontFamily: "font-regular" }} onPress={() => changeChecked(!checkedValue)}>{text}</Text>
  );

  const handleSubmit = () => {
    axios.post("https://api.compiquest.com:8443/api/User/user/login", { username, password }).then(res => {
      console.log(res.data);
      if (res.data.token) {
        // res.data.token && navigation.navigate('Home')
        res.data.roles[0].subscriptionStatus === 1 ? navigation.navigate('Home') : setShowPayment(true)
        storeApiData(res.data)
      } else {
        return
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const handleGoPayment = () => {
    navigation.navigate('Payment')
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.loginTop}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
            resizeMode="contain"
          />
          <Text style={styles.signInText}>Sign In</Text>
        </View>
        <View style={styles.inpWrap}>
          <Text style={styles.inpLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Your_Username"
            placeholderTextColor={"#c7c7c7"}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Text style={styles.inpLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="***** ***"
            placeholderTextColor={"#c7c7c7"}
            secureTextEntry
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <View style={styles.checkboxWrap}>
            <BouncyCheckbox
              size={20}
              fillColor="#aaa"
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: "#aaa" }}
              innerIconStyle={{ borderWidth: 2, }}
              textContainerStyle={{ display: "none", }}
              disableBuiltInState
              isChecked={isChecked}
              onPress={() => { setIsChecked(!isChecked) }}
            />
            <CustomLabel text="Remember me" checkedValue={isChecked} changeChecked={setIsChecked} />
          </View>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={styles.createNewText}>Create new account? <Text style={styles.createSignup} onPress={() => navigation.navigate('Signup')}>Sign up</Text></Text>
        </View>
      </View>
      {
        showPayment &&
        <View style={{ ...styles.showPaymentContainer, height: `${ScreenHeight}px` }} onPress={handleGoPayment}>
          <View style={{ ...styles.paymentConInner, height: `${ScreenHeight - 40}px` }}>
            <Text style={styles.payText}>Please complete your payment</Text>
            <Pressable style={styles.payBtn}>Go to Payment</Pressable>
          </View>
        </View>
      }
    </View>
  )
}





export default Login