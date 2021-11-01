import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../Components/UserDataComponents'
import {makeNewPost, getPosts, deletePost} from '../Components/PostComponents'
import { ScrollView } from 'react-native-gesture-handler'
import WebViewExample from '../screens/dialogScreen.js'
import styles from './styles/HomeScreen.style.js'


export default class HomeScreen extends React.Component {
    currentView() {
        return (
            <View style={styles.container}>
                <Text>Hi</Text>
            </View>
        );
    }
    render() {
        return this.currentView()
    }
}
