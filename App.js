import React from "react"
import 'react-native-gesture-handler'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from '@react-navigation/stack'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import SettingsScreen from "./screens/SettingsScreen"
import InventoryScreen from "./screens/InventoryScreens/InventoryHomeScreen"
import firebase from 'firebase/app'
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EditEventScreen from "./screens/ProgramsOverviewScreen/EditEventScreen"
import EditProgramScreen from "./screens/ProgramsOverviewScreen/EditProgramScreen"
import ProgramsOverviewScreen from "./screens/ProgramsOverviewScreen/ProgramsOverviewScreen"
import ProgramScreen from "./screens/ProgramsOverviewScreen/ProgramScreen"
import AddPostScreen from "./screens/HomeScreen/AddPostScreen"
import AddProgramScreen from "./screens/ProgramsOverviewScreen/AddProgramScreen"
import AddEventScreen from "./screens/ProgramsOverviewScreen/AddEventScreen"
import EditPostScreen from "./screens/HomeScreen/EditPostScreen"
import EventScreen from "./screens/ProgramsOverviewScreen/EventScreen"
import AddTool from "./screens/InventoryScreens/AddTool"
import CheckoutTool from "./screens/InventoryScreens/CheckoutTool"
import AdminToolCheckoutScreen from "./screens/InventoryScreens/AdminToolCheckoutScreen"
import EditTool from "./screens/InventoryScreens//EditTool"
import FundraisingOptionsScreen from "./screens/FundraisingScreens/FundraisingOptionsScreen"
import DonationScreen from "./screens/FundraisingScreens/DonationScreen"
import StoreScreen from "./screens/FundraisingScreens/StoreScreen"
import AddProductScreen from "./screens/FundraisingScreens/AddProductScreen"
import ProductScreen from "./screens/FundraisingScreens/ProductScreen"
import CheckoutScreen from "./screens/FundraisingScreens/CheckoutScreen"
import EditProductScreen from "./screens/FundraisingScreens/EditProductScreen"
import CartScreen from "./screens/FundraisingScreens/CartScreen"
import { Ionicons } from '@expo/vector-icons';



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
const SettingsStack = createStackNavigator();
const HomeStackNavigator = createStackNavigator();
const ProgramStackNavigator = createStackNavigator();
const InventoryStackNavigator = createStackNavigator();
const FundraisingStackNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();

const authStack = () => (
  <NavigationContainer>
    <AuthStack.Navigator initialRouteName = "ProgramsHome">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  </NavigationContainer>
)

function HomeStack(){
  return (
    <HomeStackNavigator.Navigator initialRouteName = "HomeStackHome" screenOptions={{
      headerShown: false
    }}>
          <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} />
          <HomeStackNavigator.Screen 
            name="AddPostScreen" 
            component={AddPostScreen}
          />
          <HomeStackNavigator.Screen 
            name="EditPostScreen" 
            component={EditPostScreen}
          />
           <HomeStackNavigator.Screen 
            name="Settings" 
            component={SettingsScreen}
          />
    </HomeStackNavigator.Navigator>
  )
}

function ProgramStack(){
  return (
    <ProgramStackNavigator.Navigator initialRouteName = "ProgramStackHome" screenOptions={{
      headerShown: false
    }}>
          <ProgramStackNavigator.Screen name="ProgramsOverviewScreen" component={ProgramsOverviewScreen} />
          <ProgramStackNavigator.Screen name="ProgramScreen" component={ProgramScreen} />
          <ProgramStackNavigator.Screen name="EventScreen" component={EventScreen} />
          <ProgramStackNavigator.Screen name="AddProgramScreen" component={AddProgramScreen}/>
          <ProgramStackNavigator.Screen name="AddEventScreen" component={AddEventScreen}/>
          <ProgramStackNavigator.Screen name="EditProgramScreen" component={EditProgramScreen}/>
          <ProgramStackNavigator.Screen name="EditEventScreen" component={EditEventScreen}/>
    </ProgramStackNavigator.Navigator>
  )
}

function InventoryStack(){
  return (
    <InventoryStackNavigator.Navigator initialRouteName = "InventoryStackHome" screenOptions={{
      headerShown: false
    }}>
          <InventoryStackNavigator.Screen name="InventoryHome" component={InventoryScreen} />
          <InventoryStackNavigator.Screen name="AddTool" component={AddTool}/>
          <InventoryStackNavigator.Screen name="CheckoutTool" component={CheckoutTool}/>
          <InventoryStackNavigator.Screen name="EditTool" component={EditTool}/>
          <InventoryStackNavigator.Screen name="AdminToolCheckoutScreen" component={AdminToolCheckoutScreen}/>
    </InventoryStackNavigator.Navigator>
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

function FundraisingStack() {
  return (
    <FundraisingStackNavigator.Navigator initialRouteName = "FundraisingStackHome" screenOptions={{
      headerShown: false
    }}>
      <FundraisingStackNavigator.Screen name="FundraisingOptionsScreen" component={FundraisingOptionsScreen}/>
      <FundraisingStackNavigator.Screen name="DonationScreen" component={DonationScreen}/>
      <FundraisingStackNavigator.Screen name="StoreScreen" component={StoreScreen}/>
      <FundraisingStackNavigator.Screen name="AddProductScreen" component={AddProductScreen}/>
      <FundraisingStackNavigator.Screen name="ProductScreen" component={ProductScreen}/>
      <FundraisingStackNavigator.Screen name="EditProductScreen" component={EditProductScreen}/>
      <FundraisingStackNavigator.Screen name="CheckoutScreen" component={CheckoutScreen}/>
      <FundraisingStackNavigator.Screen name="CartScreen" component={CartScreen}/>
    </FundraisingStackNavigator.Navigator>
  )
}

const NavBar = () => (
  <NavigationContainer>
    <Tab.Navigator initialRouteName = "Home" screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color}) => {
          var iconName;
          
          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name == 'Programs') {
            iconName = focused
              ? 'calendar'
              : 'calendar-outline';
          } else if (route.name == 'Inventory') {
            iconName = focused
              ? 'hammer'
              : 'hammer-outline';
          } else if (route.name == 'Fundraising') {
            iconName = focused
              ? 'cash'
              : 'cash-outline';
          } else if (route.name == 'Settings') {
            iconName = focused
              ? 'settings'
              : 'settings-outline';
          } 

          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: '#5eab61',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Programs" component={ProgramStack} />
      <Tab.Screen name="Inventory" component={InventoryStack} />  
      <Tab.Screen name="Fundraising" component={FundraisingStack} />
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