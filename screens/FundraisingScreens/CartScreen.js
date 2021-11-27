import React from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import styles from '../styles/FundraisingScreens.styles';
import firebase from 'firebase/app'


export default class CartScreen extends React.Component {
    state = {
        cartContents: []
    }

    firestoreRef = firebase.firestore().collection('UserCart')

    currentView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.functionButton} onPress={() => this.props.navigation.goBack()}>
                    <Text> Go Back </Text>
                </TouchableOpacity>
                <ScrollView>
                    <View>
                        {this.state.cartContents.map(i => this.displayItem(i.Name, i.ItemID))}
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        return this.currentView()
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection)
    }

    getCollection = (querySnapshot) => {
        const cartContents = []
        querySnapshot.forEach((product) => {
            cartContents.push(product.data())
        })
        this.setState({cartContents})
    }

    displayItem(name, id) {
        return(
            <View key={id}>
                <Text>{name}</Text>
            </View>
        )
    }
}