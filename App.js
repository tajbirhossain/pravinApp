import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataProvider } from './context/DataContext';

import Login from './screens/Auth/Login';
import Signup from './screens/Auth/Signup';
import Home from './screens/Home/Home';
import Preload from './screens/Preload/Preload';
import SecondPreload from './screens/Preload/SecondPreload';
import ThirdPreload from './screens/Preload/ThirdPreload';
import FinalPreload from './screens/Preload/FinalPreload';
import ExamResult from './screens/Exam-Result/ExamResult';
import QuestionResult from './screens/QuestionResult/QuestionResult';
import CreateExam from './screens/CreateExam/CreateExam';
import Profile from './screens/Profile/Profile';
import StartExam from './screens/Start-Exam/StartExam';



const stack = createStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      <DataProvider>
        <NavigationContainer>
          <stack.Navigator initialRouteName='Login'>
            <stack.Screen name='SecondPreload' component={SecondPreload} options={{ headerShown: false }} />
            <stack.Screen name='ThirdPreload' component={ThirdPreload} options={{ headerShown: false }} />
            <stack.Screen name='FinalPreload' component={FinalPreload} options={{ headerShown: false }} />
            <stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
            <stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <stack.Screen name='ExamResult' component={ExamResult} options={{ headerShown: false }} />
            <stack.Screen name='QuestionResult' component={QuestionResult} options={{ headerShown: false }} />
            <stack.Screen name='CreateExam' component={CreateExam} options={{ headerShown: false }} />
            <stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
            <stack.Screen name='StartExam' component={StartExam} options={{ headerShown: false }} />
          </stack.Navigator>
        </NavigationContainer>
      </DataProvider>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});