import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, useWindowDimensions, Dimensions, Pressable, Animated, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import dashboardImg from '../../assets/dashboard.png';
import examImg from '../../assets/exam.png';
import analysisImg from '../../assets/analysis.png';
import userImg from '../../assets/user.png';
import powerOffImg from '../../assets/power-off.png';
import { styles } from '../../styles/home';
import { useData } from '../../context/DataContext';
import axios from 'axios';



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



// const getFonts = () => {
//   Font.loadAsync({
//     fontBlack: require("../../assets/fonts/Poppins-Black.ttf"),
//     fontBlack: require("../../assets/fonts/Poppins-Bold.ttf"),
//     fontMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
//     fontRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
//     fontlight: require("../../assets/fonts/Poppins-Light.ttf"),
//   });
// }

const Home = ({ navigation }) => {
  const topBarRef = useRef(null);
  const { apiData } = useData()
  // console.log(apiData);

  const [fontsloaded, setFontsLoaded] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [examEnrolled, setExamEnrolled] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

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


    if (topBarRef.current) {
      topBarRef.current.measure((x, y, width, height) => {
        setTopBarHeight(height);
      });
    }

    axios.get(`https://api.compiquest.com:8443/api/ExamEnrollment/GetEnrollmentByCandidateID/${apiData.roles[0].candidateID}`, {
      headers: {
        'Authorization': `Bearer ${apiData.token}`,
      },
    }).then(res => {
      console.log(res.data);
      setExamEnrolled(res.data.examEnrollmetDetailsModel);
      setFilteredData(res.data.examEnrollmetDetailsModel)
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


  const handleCheckResult = (id, exName, totalMarks) => {
    console.log(id);
    navigation.navigate('ExamResult', { id, exName, totalMarks })
  }

  const handleSearch = (text) => {
    setSearchText(text);

    const updatedFilteredData = examEnrolled.filter(item => {
      const charCountInMain = {};

      for (let char of item.qpUniqueName.toLowerCase()) {
        charCountInMain[char] = (charCountInMain[char] || 0) + 1;
      }

      for (let char of text.toLowerCase()) {
        if (!charCountInMain[char]) {
          return false;
        }
        charCountInMain[char]--;
      }

      return true;
    });

    setFilteredData(updatedFilteredData);
  };

  const handleStartExam = (data) => {
    const canId = data.candidateId
    const examEnrolDetId = data.examEnrollmentDetailsId
    const subId = data.subjectId
    navigation.navigate("StartExam", { canId, examEnrolDetId, subId })
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
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInp}
                placeholder='Search'
                placeholderTextColor={"#a0a0a0"}
                onChangeText={handleSearch}
                value={searchText}
              />
            </View>
            <View style={styles.examContainer}>
              {
                filteredData && filteredData.map((item, i) => {
                  return (
                    <View style={styles.singleExam} key={i}>
                      <Text style={styles.examHeading}>{item.qpUniqueName}</Text>
                      <View style={styles.examInfoRow}>
                        <Text style={styles.examRowLeft}>Enrollment:</Text>
                        <Text style={styles.examRowRight}>{item.examEnrolmentDate}</Text>
                      </View>
                      <View style={styles.examInfoRow}>
                        <Text style={styles.examRowLeft}>Appeared:</Text>
                        <Text style={styles.examRowRight}>{item.isExamAppeared ? item.examAppearedDate : "Not Appeared"}</Text>
                      </View>
                      <View style={styles.examInfoRow}>
                        <Text style={styles.examRowLeft}>Result Details:</Text>
                        <Text style={styles.examRowRight}>{!item.examAppearedDate || item.examCompletionStatus === "I" ? "In Progress" : "Completed"}</Text>
                      </View>
                      <View style={styles.examInfoRow}>
                        <Text style={styles.examRowLeft}>Marks Obtained:</Text>
                        <Text style={styles.examRowRight}>{`${item.marksObtained}/${item.totalMarks}`}</Text>
                      </View>
                      {
                        item.examAppearedDate && item.examCompletionStatus === "C" ?
                          <Pressable style={styles.resultBtn} onPress={() => handleCheckResult(item.qpResultID, item.qpUniqueName, item.totalMarks)}><Text style={styles.resultBtnText}>Check Result</Text></Pressable>
                          : item.examAppearedDate && item.examCompletionStatus === "I" ?
                            <Pressable style={styles.resumeBtn}>
                              <Image
                                source={require("../../assets/play-button.png")}
                                style={styles.playImg}
                              />
                              <Text style={styles.resultBtnText} onPress={() => handleStartExam(item)}>Resume</Text>
                            </Pressable> :
                            <Pressable style={styles.startBtn}>
                              <Image
                                source={require("../../assets/play-button.png")}
                                style={styles.playImg}
                              />
                              <Text style={styles.resultBtnText} onPress={() => handleStartExam(item)}>Start</Text>
                            </Pressable>
                      }
                    </View>
                  )
                })
              }

            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}




export default Home