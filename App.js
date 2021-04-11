import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDA2SXeoLpH1bUlYdDpJzMo-6WPN2sPMKM",
  authDomain: "friends-of-the-urban-ff.firebaseapp.com",
  projectId: "friends-of-the-urban-ff",
  storageBucket: "friends-of-the-urban-ff.appspot.com",
  messagingSenderId: "1014426608257",
  appId: "1:1014426608257:web:8ff56858313883ad05a380"
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)
