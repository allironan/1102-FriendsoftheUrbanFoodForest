import React from "react"
import 'react-native-gesture-handler'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ProgramsScreen from './screens/ProgramsScreen'
import SettingsScreen from "./screens/SettingsScreen"
import SingularProgram from "./screens/SingularProgram"
import AddProgram from "./screens/AddProgramScreen"
import EditProgram from "./screens/EditProgramScreen"
import { FIREBASE_APIKEY,
        FIREBASE_AUTHDOMAIN,
        FIREBASE_PROJECTID,
        FIREBASE_STORAGEBUCKET,
        FIREBASE_MESSAGINGSENDERID,
        FIREBASE_APPID} from 'react-native-dotenv'
import firebase from 'firebase/app'
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { registerRootComponent } from "expo"
import EventsScreen from "./screens/EventsScreen"
import EventInstance from "./screens/EventInstance"
import EditEventScreen from "./screens/EditEventScreen"
import EditProgramScreen from "./screens/EditProgramScreen"
console.log(FIREBASE_APIKEY)
const firebaseConfig = 
{
  apiKey: 'AIzaSyDA2SXeoLpH1bUlYdDpJzMo-6WPN2sPMKM',
  authDomain: 'friends-of-the-urban-ff.firebaseapp.com',
  projectId:  'friends-of-the-urban-ff',
  storageBucket: 'friends-of-the-urban-ff.appspot.com',
  messagingSenderId: '1014426608257',
  appId: '1:1014426608257:web:8ff56858313883ad05a380'
}

firebase.initializeApp(firebaseConfig);
const AuthStack = createStackNavigator();
const ProgramsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const authStack = () => (
  <NavigationContainer>
    <AuthStack.Navigator initialRouteName = "ProgramsHome">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  </NavigationContainer>
)

function StackScreens(){
  return (
    <ProgramsStack.Navigator initialRouteName = "ProgramsHome" screenOptions={{
      headerShown: false
    }}>
          <ProgramsStack.Screen name="ProgramsHome" component={ProgramsScreen} />
          <ProgramsStack.Screen name="EventsScreen" component={EventsScreen} />
          <ProgramsStack.Screen name="EventInstance" component={EventInstance} />
          <ProgramsStack.Screen name="SingularProgram" component={SingularProgram} />
          <ProgramsStack.Screen name="AddProgram" component={AddProgram}/>
          <ProgramsStack.Screen name="EditProgram" component={EditProgramScreen}/>
          <ProgramsStack.Screen name="EditEvent" component={EditEventScreen}/>
    </ProgramsStack.Navigator>
  )
}

const NavBar = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Programs" component={StackScreens}>
      </Tab.Screen>
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
)
export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: NavBar,
      Auth: authStack,
    },
    {
      initialRouteName: "Loading"
    }
  )
)