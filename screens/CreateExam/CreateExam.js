import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, useWindowDimensions, Dimensions, Pressable, Animated, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '../../styles/createExam'
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { Select, Box, CheckIcon, Center, NativeBaseProvider, extendTheme } from "native-base";

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



const Example = ({ val, getSubjects, setExamTypeId, setSubjectId, getSections, setSectionId, getLessons, setLessonId, setToughFlag }) => {
    const [service, setService] = useState(val.options);
    useEffect(() => {
        setService(val.selType !== "Exam Type" || val.selType !== "Subject" ? val.options[0]?.value : "")
    }, [])

    const handleChange = (itemValue => {
        setService(itemValue)
        // console.log(itemValue);
        if (val.selType === "Exam Type") {
            const selectedSub = val.options.filter(subItem => {
                return subItem.examName === itemValue
            })
            // console.log(selectedSub[0].examTypeId);
            console.log(selectedSub[0].examTypeId);
            getSubjects(selectedSub[0].examTypeId)
            setExamTypeId(selectedSub[0].examTypeId)
        }
        if (val.selType === "Subject") {
            const selectedSub = val.options.filter(subItem => {
                return subItem.subjectName === itemValue
            })
            setSubjectId(selectedSub[0].subjectID)
            getSections(selectedSub[0].subjectID)
        }
        if (val.selType === "Section") {
            const selectedSec = val.options.filter(subItem => {
                return subItem.sectionName === itemValue
            })
            console.log(selectedSec);
            setSectionId(selectedSec[0].sectionID)
            getLessons(selectedSec[0].sectionID)
        }
        if (val.selType === "Lesson") {
            const selectedLes = val.options.filter(subItem => {
                return subItem.lessonName === itemValue
            })
            console.log(selectedLes);
            setLessonId(selectedLes[0].lessonID)
        }
        if (val.selType === "Complexity") {
            const selectedComp = val.options.filter(subItem => {
                return subItem.value === itemValue
            })
            console.log(selectedComp);
            setToughFlag(selectedComp[0].value === "regular" ? false : true)
        }
    })


    return (
        <Center>
            <Box style={{ width: "100%" }}>
                <Select
                    selectedValue={service}
                    minWidth="200"
                    borderColor="#ccc"
                    _focus={{ borderColor: 'yellow.500' }}
                    accessibilityLabel="Choose Type"
                    placeholder="Choose Type"
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size={5} />
                    }}
                    mt={1}
                    onValueChange={itemValue => handleChange(itemValue)}
                    style={{ height: 40, borderRadius: 5, fontFamily: "font-regular" }}
                >
                    {
                        val.options?.map((item, i) => {
                            return (
                                val.selType === "Exam Type" ?
                                    <Select.Item key={i} label={item.examName} value={item.examName} />
                                    : val.selType === "Subject" ?
                                        <Select.Item key={i} label={item.subjectName} value={item.subjectName} />
                                        : val.selType === "Section" ?
                                            <Select.Item key={i} label={item.sectionName} value={item.sectionName} />
                                            : val.selType === "Lesson" ?
                                                <Select.Item key={i} label={item.lessonName} value={item.lessonName} />
                                                :
                                                <Select.Item key={i} label={item.label} value={item.value} />
                                // <Select.Item label="Generic" value="generic" />
                            )
                        })
                    }
                    {/* <Select.Item label="Generic" value="generic" />
                    <Select.Item label="Self" value="self" /> */}
                </Select>
            </Box>
        </Center>
    );
};

const CreateExam = ({ navigation }) => {
    const { apiData } = useData()
    const topBarRef = useRef(null);

    const [fontsloaded, setFontsLoaded] = useState(false);
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [topBarHeight, setTopBarHeight] = useState(0);
    const [storeExamType, setStoreExamType] = useState([])
    const [examOptions, setExamOptions] = useState([])
    const [examOptionsRef, setExamOptionsRef] = useState([])
    const [subjectOptions, setSubjectOptions] = useState([])
    const [candidateId, setCandidateId] = useState(apiData.roles[0].candidateID)
    const [examTypeId, setExamTypeId] = useState(0)
    const [subjectId, setSubjectId] = useState(0)
    const [sectionId, setSectionId] = useState(0)
    const [lessonId, setLessonId] = useState(0)
    const [toughFlag, setToughFlag] = useState(true)

    const [dataNeedsRefresh, setDataNeedsRefresh] = useState(false);
    console.log(toughFlag);




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

        axios.get(`https://api.compiquest.com:8443/api/CreateExamForOnlineCandidate/GetCandidateExamTypes/${candidateId}`, {
            headers: {
                'Authorization': `Bearer ${apiData.token}`,
            },
        }).then(res => {
            console.log(res.data.value);
            setStoreExamType(res.data.value)
            const examOptionVal = ([
                {
                    selType: "Select Paper Type",
                    options: [
                        {
                            label: "Generic",
                            value: "generic",
                        },
                        {
                            label: "Self",
                            value: "self"
                        }
                    ]
                },
                {
                    selType: "Exam Type",
                    options: res.data.value
                },
                {
                    selType: "Complexity",
                    options: [
                        {
                            label: "Tough",
                            value: "tough"
                        },
                        {
                            label: "Regular",
                            value: "regular"
                        }
                    ]
                },
                {
                    selType: "Paper Content",
                    options: [
                        {
                            label: "Mock Test",
                            value: "mock"
                        },
                        {
                            label: "Subject",
                            value: "subject"
                        }
                    ]
                },
            ])
            setExamOptions(examOptionVal)
            setExamOptionsRef(examOptionVal)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const getSubjects = (id) => {
        axios.get(`https://api.compiquest.com:8443/api/CreateExamForOnlineCandidate/GetSubjectList/${id}`, {
            headers: {
                'Authorization': `Bearer ${apiData.token}`,
            },
        }).then(res => {
            console.log(res.data.value.subjectListViewModel);
            setSubjectOptions(res.data.value.subjectListViewModel)
            setExamOptions([...examOptionsRef, {
                selType: "Subject",
                options: res.data.value.subjectListViewModel
            }])
        }).catch(err => {
            console.log(err);
        })
    }

    const getSections = (id) => {
        axios.get(`https://api.compiquest.com:8443/api/CreateExamForOnlineCandidate/GetSectionsBySubject/${id}`, {
            headers: {
                'Authorization': `Bearer ${apiData.token}`,
            },
        }).then(res => {
            console.log(res.data);
            const existingSectionIndex = examOptions.findIndex(option => option.selType === "Section");
            if (existingSectionIndex !== -1) {
                // If exists, override it
                const updatedExamOptions = [...examOptions];
                updatedExamOptions[existingSectionIndex] = {
                    selType: "Section",
                    options: res.data.value.sectionListViewModel
                };
                setExamOptions(updatedExamOptions);
            } else {
                // If doesn't exist, push a new object
                setExamOptions([...examOptions, {
                    selType: "Section",
                    options: res.data.value.sectionListViewModel
                }]);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const getLessons = (id) => {
        axios.get(`https://api.compiquest.com:8443/api/CreateExamForOnlineCandidate/GetLessonBySection/${id}`, {
            headers: {
                'Authorization': `Bearer ${apiData.token}`,
            },
        }).then(res => {
            console.log(res.data);
            const existingLessonIndex = examOptions.findIndex(option => option.selType === "Lesson");
            if (existingLessonIndex !== -1) {
                // If exists, override it
                const updatedExamOptions = [...examOptions];
                updatedExamOptions[existingLessonIndex] = {
                    selType: "Lesson",
                    options: res.data.value.lessonListViewModel
                };
                setExamOptions(updatedExamOptions);
            } else {
                // If doesn't exist, push a new object
                setExamOptions([...examOptions, {
                    selType: "Lesson",
                    options: res.data.value.lessonListViewModel
                }]);
            }
        }).catch(err => {
            console.log(err);
        })
    }


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



    const handleSubmit = () => {
        console.log(`${examTypeId} ${candidateId} ${subjectId} ${sectionId}`);
        const requestData = {
            candidateID: candidateId,
            qpDefaultCriteriaFlag: true,
            examTypeID: examTypeId,
            subjectID: subjectId,
            sectionID: sectionId,
            lessonID: lessonId,
            topicID: 0,
            toughFlag: toughFlag,
        };
        axios.post("https://api.compiquest.com:8443/api/CreateExamForOnlineCandidate/CreateExamForOnlineCandidate", requestData, {
            headers: {
                'Authorization': `Bearer ${apiData.token}`,
            },
        }).then(res => {
            console.log(res.data);
            setDataNeedsRefresh(true);
            navigation.navigate("Home")
        }).catch(err => {
            console.log(err);
        })
        console.log(requestData);
    }
console.log(apiData);
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
                            source={require("../../assets/man.jpg")}
                        />
                    </Text>
                </View>

                <ScrollView style={{ height: ScreenHeight - topBarHeight }}>
                    <View style={styles.scrollInner}>
                        <Text style={styles.createExamHeading}>Create Your Exam Paper</Text>
                        {
                            examOptions.map((item, i) => {
                                return (
                                    <View style={styles.selectWrap} key={i}>
                                        <Text style={styles.examSelectLabel}>{item.selType}</Text>
                                        <NativeBaseProvider>
                                            <Example val={item} getSubjects={getSubjects} setExamTypeId={setExamTypeId} setSubjectId={setSubjectId} getSections={getSections} setSectionId={setSectionId} getLessons={getLessons} setLessonId={setLessonId} setToughFlag={setToughFlag} />
                                        </NativeBaseProvider>
                                    </View>
                                )
                            })
                        }
                        {/* <View style={styles.selectWrap}>
                            <Text style={styles.examSelectLabel}>Exam</Text>
                            <NativeBaseProvider>
                                <Example />
                            </NativeBaseProvider>
                        </View>
                        <View style={styles.selectWrap}>
                            <Text style={styles.examSelectLabel}>Complexity</Text>
                            <NativeBaseProvider>
                                <Example />
                            </NativeBaseProvider>
                        </View>
                        <View style={styles.selectWrap}>
                            <Text style={styles.examSelectLabel}>Paper Content</Text>
                            <NativeBaseProvider>
                                <Example />
                            </NativeBaseProvider>
                        </View>
                        <View style={styles.selectWrap}>
                            <Text style={styles.examSelectLabel}>Subjects</Text>
                            <NativeBaseProvider>
                                <Example />
                            </NativeBaseProvider>
                        </View> */}
                        <View style={styles.getPaperBtnWrap}>
                            <Pressable style={styles.genPaperBtn} onPress={handleSubmit}>
                                <Text style={styles.genBtnText}>Generate Paper</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default CreateExam