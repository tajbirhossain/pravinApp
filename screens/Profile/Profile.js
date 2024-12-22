import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, useWindowDimensions, Dimensions, Pressable, Animated, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '../../styles/profile'
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import dashboardImg from '../../assets/dashboard.png';
import examImg from '../../assets/exam.png';
import analysisImg from '../../assets/analysis.png';
import userImg from '../../assets/user.png';
import powerOffImg from '../../assets/power-off.png';
import axios from 'axios';
import { useData } from '../../context/DataContext';





const data = [
    {
        id: '1',
        title: 'Dashboard',
        link: 'Home',
        imgUrl: dashboardImg,
    },
    {
        id: '2',
        title: 'Create Exam',
        link: 'CreateExam',
        imgUrl: examImg,
    },
    {
        id: '3',
        title: 'My Exam Analysis',
        link: 'https://example.com/link2',
        imgUrl: analysisImg,
    },
    {
        id: '4',
        title: 'My Profile',
        link: 'Profile',
        imgUrl: userImg,
    },
    {
        id: '5',
        title: 'Logout',
        link: 'https://example.com/link2',
        imgUrl: powerOffImg,
    },
];




const stateArr = [
    "Andaman & Nicobar Is.",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Dadra & Nagar Haveli",
    "Delhi",
    "Goa, Daman & Diu",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Karnataka (Mysore)",
    "Nagaland",
    "Orissa",
    "Pondicherry",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Tripura",
    "Uttar Pradesh",
    "West Bengal",
    "Sikkim",
    "Mizoram",
]

const Profile = ({ navigation }) => {
    const topBarRef = useRef(null);

    const [fontsloaded, setFontsLoaded] = useState(false);
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [topBarHeight, setTopBarHeight] = useState(0);
    const [profileData, setProfileData] = useState({})

    const { apiData } = useData()



    useEffect(() => {
        SplashScreen.preventAutoHideAsync();

        async function loadResourcesAsync() {
            try {
                await Font.loadAsync({
                    "font-black": require("../../assets/fonts/Poppins-Black.ttf"),
                    "font-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
                    "font-semibold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
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


        if (topBarRef.current) {
            topBarRef.current.measure((x, y, width, height) => {
                setTopBarHeight(height);
            });
        }


        axios.get(`https://api.compiquest.com:8443/api/Candidate/Candidate/GetCandidateProfile/${apiData.roles[0].candidateID}`).then(res => {
            console.log(res.data);
            setProfileData(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, []);



    let ScreenHeight = Dimensions.get("window").height

    const ListItem = ({ title, link, imgUrl, onPress }) => (
        <TouchableOpacity onPress={() => onPress(link)} style={styles.menuItem}>
            <View style={styles.menuSingleItemWrap}>
                <Image
                    style={styles.menuImg}
                    source={imgUrl}
                />
                <Text style={styles.menuText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );

    const handlePress = (url) => {
        navigation.navigate(url)
    };


    const slideAnim = useRef(new Animated.Value(0)).current;

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
        Animated.timing(slideAnim, {
            toValue: isMenuActive ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };



    return (
        <View>
            {
                isMenuActive &&
                <Pressable
                    onPress={toggleMenu}
                    style={
                        {
                            width: "100%",
                            height: ScreenHeight,
                            flex: 1,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            backgroundColor: "rgba(0, 63, 104, 0.10)",
                            zIndex: 10,
                        }
                    }
                >
                </Pressable>
            }
            <Animated.View
                style={{
                    width: 250,
                    height: ScreenHeight,
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: 0,
                    left: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-270, 0],
                    }),
                    zIndex: 100,
                    paddingTop: 50,
                    paddingLeft: 20,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                }}
            >
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ListItem title={item.title} link={item.link} imgUrl={item.imgUrl} onPress={handlePress} />
                    )}
                />
            </Animated.View>

            <View style={styles.container}>
                <View style={styles.topBar} ref={topBarRef}>
                    <View style={styles.tobBarLeft}>
                        <TouchableOpacity onPress={toggleMenu}>
                            <Image
                                style={styles.menu}
                                source={require("../../assets/dots-menu.png")}
                            />
                        </TouchableOpacity>
                        <Text style={styles.personName}>{apiData.roles[0].candidateName}</Text>
                    </View>
                    <Text>
                        <Image
                            style={styles.topBarImg}
                            source={{ uri: apiData.roles[0].candidatePhoto }}
                        />
                    </Text>
                </View>

                <ScrollView style={{ height: ScreenHeight - topBarHeight }}>
                    <View style={styles.scrollInner}>
                        <View style={styles.prifileImgWrap}>
                            <Image
                                style={styles.profileImg}
                                source={{ uri: apiData.roles[0].candidatePhoto }}
                            />
                        </View>
                        <Text style={styles.profileName}>{apiData.roles[0].candidateName}</Text>
                        <View style={styles.mainInfoWrap}>
                            <View style={styles.mainInfoTop}>
                                <Text style={styles.mainInfoText}>Main Informations</Text>
                            </View>
                            <View style={styles.mainInfoContent}>
                                <View style={styles.mainInfoSingle}>
                                    <View style={styles.mainInfoLeft}>
                                        <Text style={styles.mainLeftText}>Candidate Id:</Text>
                                    </View>
                                    <View style={styles.mainInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.candidateID}</Text>
                                    </View>
                                </View>
                                <View style={styles.mainInfoSingle}>
                                    <View style={styles.mainInfoLeft}>
                                        <Text style={styles.mainLeftText}>Mobile:</Text>
                                    </View>
                                    <View style={styles.mainInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.mobile}</Text>
                                    </View>
                                </View>
                                <View style={styles.mainInfoSingle}>
                                    <View style={styles.mainInfoLeft}>
                                        <Text style={styles.mainLeftText}>Email:</Text>
                                    </View>
                                    <View style={styles.mainInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.emailID}</Text>
                                    </View>
                                </View>
                                <View style={styles.mainInfoSingle}>
                                    <View style={styles.mainInfoLeft}>
                                        <Text style={styles.mainLeftText}>Gender:</Text>
                                    </View>
                                    <View style={styles.mainInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.gender === "F" ? "Female" : "Male"}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.mainInfoWrapAdd}>
                            <View style={styles.addInfoTop}>
                                <Text style={styles.mainInfoText}>Additional Informations</Text>
                            </View>
                            <View style={styles.mainInfoContent}>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>Date of birth:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.dateOfBirth}</Text>
                                    </View>
                                </View>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>Address:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.address}</Text>
                                    </View>
                                </View>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>City:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.city}</Text>
                                    </View>
                                </View>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>Gender:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.gender === "F" ? "Female" : "Male"}</Text>
                                    </View>
                                </View>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>State:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{stateArr[profileData.stateId]}</Text>
                                    </View>
                                </View>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>Adhar Card Number:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.adharCardNo}</Text>
                                    </View>
                                </View>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>College:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.collegeName}</Text>
                                    </View>
                                </View>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>Repeater:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.repeaterFlag ? "Yes" : "No"}</Text>
                                    </View>
                                </View>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>Parent Name:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{`${profileData.parentFName} ${profileData.parentMName} ${profileData.parentLName}`}</Text>
                                    </View>
                                </View>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>Parent Mobile:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.parentEmailID}</Text>
                                    </View>
                                </View>
                                <View style={styles.addInfoSingle}>
                                    <View style={styles.addInfoLeft}>
                                        <Text style={styles.addLeftText}>Parent Email:</Text>
                                    </View>
                                    <View style={styles.addInfoRight}>
                                        <Text style={styles.mainRightText}>{profileData.parentEmailID}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Profile