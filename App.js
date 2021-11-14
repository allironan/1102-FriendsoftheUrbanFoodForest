import React from "react"
import 'react-native-gesture-handler'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import SettingsScreen from "./screens/SettingsScreen/SettingsScreen"
import UsersScreen from "./screens/SettingsScreen/UsersScreen"
import InventoryScreen from "./screens/InventoryHomeScreen"
import SingularProgram from "./screens/SingularProgram"
import EditPosts from "./screens/EditPosts"
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
import EditEventScreen from "./screens/ProgramsOverviewScreen/EditEventScreen"
import EditProgramScreen from "./screens/ProgramsOverviewScreen/EditProgramScreen"
import ProgramsOverviewScreen from "./screens/ProgramsOverviewScreen/ProgramsOverviewScreen"
import ProgramScreen from "./screens/ProgramsOverviewScreen/ProgramScreen"
import AddPostScreen from "./screens/HomeScreen/AddPostScreen"
import AddProgramScreen from "./screens/ProgramsOverviewScreen/AddProgramScreen"
import AddEventScreen from "./screens/ProgramsOverviewScreen/AddEventScreen"
import EditPostScreen from "./screens/HomeScreen/EditPostScreen"
import EventScreen from "./screens/ProgramsOverviewScreen/EventScreen"
import AddTool from "./screens/AddTool"
import CheckoutTool from "./screens/CheckoutTool"
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
const SettingsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const authStack = () => (
  <NavigationContainer>
    <AuthStack.Navigator initialRouteName = "ProgramsHome">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  </NavigationContainer>
)

function ProgramStackScreens(){
  return (
    <ProgramsStack.Navigator initialRouteName = "ProgramsHome" screenOptions={{
      headerShown: false
    }}>
          <ProgramsStack.Screen name="ProgramsOverviewScreen" component={ProgramsOverviewScreen} />
          <ProgramsStack.Screen name="ProgramScreen" component={ProgramScreen} />
          <ProgramsStack.Screen name="EventScreen" component={EventScreen} />
          <ProgramsStack.Screen name="AddProgramScreen" component={AddProgramScreen}/>
          <ProgramsStack.Screen name="AddEventScreen" component={AddEventScreen}/>
          <ProgramsStack.Screen name="EditProgramScreen" component={EditProgramScreen}/>
          <ProgramsStack.Screen name="EditEventScreen" component={EditEventScreen}/>
    </ProgramsStack.Navigator>
  )
}

function HomeStackScreens(){
  return (
    <ProgramsStack.Navigator initialRouteName = "ProgramsHome" screenOptions={{
      headerShown: false
    }}>
          <ProgramsStack.Screen name="PostsHome" component={HomeScreen} />
          <ProgramsStack.Screen name="AddPostScreen" component={AddPostScreen}/>
          <ProgramsStack.Screen name="EditPostScreen" component={EditPostScreen}/>
    </ProgramsStack.Navigator>
  )
}

function SettingsStackScreens(){
  return (
      <SettingsStack.Navigator initialRouteName = "SettingsHome" screenOptions={{
        headerShown: false}}>
        <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen}/>
        <SettingsStack.Screen name="UsersScreen" component={UsersScreen}/>
      </SettingsStack.Navigator>
  )
}

function InventoryStackScreens(){
  return (
    <ProgramsStack.Navigator initialRouteName = "InventoryScreen" screenOptions={{
      headerShown: false
    }}>
          <ProgramsStack.Screen name="InventoryHome" component={InventoryScreen} />
          <ProgramsStack.Screen name="AddTool" component={AddTool}/>
          <ProgramsStack.Screen name="CheckoutTool" component={CheckoutTool}/>
    </ProgramsStack.Navigator>
  )
}

const NavBar = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreens} />
      <Tab.Screen name="Programs" component={ProgramStackScreens}>
      </Tab.Screen>
      <Tab.Screen name="Inventory" component={InventoryStackScreens} />
      <Tab.Screen name="Settings" component={SettingsStackScreens} />
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