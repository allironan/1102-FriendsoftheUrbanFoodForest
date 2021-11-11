import React, { Component } from 'react';
import { Text, TouchableHighlight, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/app'
import {} from '../../Components/StoreItemComponents'
import styles from '../styles/FundraisingScreens.styles';

export default class StoreScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        products: []
    }

    currentView() {
        <View style={styles.container}>
            
        </View>
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        this.unsubscribe = this.firestoreRefStoreGoods.onSnapshot(this.getCollection)
    }

    componentWillUnmount() {
        this.unsubscribe
    }

    getCollection = (querySnapshot) => {
        const products = []
        querySnapshot.forEach((product) => {
            products.push(product.data())
        })
        this.setState({products})
    }

    goToDonationScreen() {

    }
}