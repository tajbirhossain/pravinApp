import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, useWindowDimensions, Dimensions, Pressable, Animated, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '../../styles/startExam'
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import dashboardImg from '../../assets/dashboard.png';
import examImg from '../../assets/exam.png';
import analysisImg from '../../assets/analysis.png';
import userImg from '../../assets/user.png';
import powerOffImg from '../../assets/power-off.png';
import axios from 'axios';
import { useData } from '../../context/DataContext';
import { useRoute } from '@react-navigation/native';





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




const StartExam = ({ navigation }) => {
    const topBarRef = useRef(null);

    const [fontsloaded, setFontsLoaded] = useState(false);
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [topBarHeight, setTopBarHeight] = useState(0);

    const { apiData } = useData()
    const route = useRoute()
    const { canId, examEnrolDetId, subId } = route.params
    const [examData, setExamData] = useState({})
    const [selectedAns, setSelectedAns] = useState("")
    const [currentQuesInd, setCurrentQuesInd] = useState(1)



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


        axios.get(`https://api.compiquest.com:8443/api/Exam/GetExamQARealtimeOneByOne/${examEnrolDetId}/${canId}/${subId}/1/60`, {
            headers: {
                Authorization: `Bearer ${apiData.token}`
            }
        }).then(res => {
            console.log(res.data);
            console.log(res.data.questionAnswerData[0].questionText);
            setExamData(res.data)
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


    const handleAnsSelect = (data) => {
        console.log(data);
        setSelectedAns(data)
    }

    const handleNext = () => {
        if (selectedAns) {
            axios.get(`https://api.compiquest.com:8443/api/Exam/GetExamQARealtimeOneByOne/${examEnrolDetId}/${canId}/${subId}/${currentQuesInd + 1}/60`, {
                headers: {
                    Authorization: `Bearer ${apiData.token}`
                }
            }).then(res => {
                console.log(res.data);
                setSelectedAns("")
                setExamData(res.data)
                setCurrentQuesInd(prev => prev + 1)
            })
        }
    }

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
                        <Text style={styles.personName}>Arya Avay Bhosale</Text>
                    </View>
                    <Text>
                        <Image
                            style={styles.topBarImg}
                            source={require("../../assets/man.jpg")}
                        />
                    </Text>
                </View>

                <ScrollView style={{ height: ScreenHeight - topBarHeight }}>
                    <View style={styles.scrollInner}>
                        <Text style={styles.quesInd}>Question no. {currentQuesInd}</Text>
                        <View style={styles.quesCard}>
                            {
                                examData.questionAnswerData && <Text style={styles.quesHeading}>{examData.questionAnswerData[0].questionText}</Text>
                            }
                            <View style={styles.quesOptWrap}>
                                {
                                    examData.questionAnswerData && examData.questionAnswerData.map((item, i) => {
                                        return (
                                            <Pressable style={styles.quesOpt} key={i} onPress={() => handleAnsSelect(item.seqOfAnswerText)}>
                                                <Text style={{ ...styles.quesAnsInd, backgroundColor: selectedAns === item.seqOfAnswerText ? "#00253d" : "#fff", color: selectedAns === item.seqOfAnswerText ? "#fff" : "#000" }}>{item.seqOfAnswerText}</Text>
                                                <Text style={styles.quesAnsText}>{item.answerText}</Text>
                                            </Pressable>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <Pressable onPress={handleNext}>
                            <Text style={styles.subAnsNextBtn}>Submit Answer and Go Next</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default StartExam