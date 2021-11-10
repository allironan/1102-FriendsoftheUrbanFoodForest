import React, { Component } from 'react';
import { Text, TouchableHighlight, View, TextInput } from 'react-native';
import { styles } from '../styles/FundraisingScreens.styles';

export default class StoreScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        products: []
    }

    currentView() {

    }
    
    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection)
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
}