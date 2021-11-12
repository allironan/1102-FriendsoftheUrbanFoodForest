import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import firebase from 'firebase/app'
import styles from '../styles/FundraisingScreens.styles';
import { ScrollView } from 'react-native-gesture-handler';

export default class StoreScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        products: []
    }

    firestoreRefStoreGoods = firebase.firestore().collection('StoreGoods')


    currentView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text>Go Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("AddProductScreen")}>
                    <Text> Add Product </Text>
                </TouchableOpacity>

                <ScrollView>
                    <View style={styles.storeContainer}>
                        {this.state.products.map((product) => (
                            <TouchableOpacity style={styles.productFrame} key={product.ItemID} onPress={() => this.props.navigation.navigate("ProductScreen", {
                                id: product.ItemID,
                                name: product.Name,
                                description: product.Description,
                                price: product.Price
                            })}>
                                <ProductComponent key={product.ItemID} id={product.ItemID} name={product.Name} description={product.Description} price={product.Price}></ProductComponent>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
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

    render() {
        return this.currentView()
    }
}

class ProductComponent extends React.Component {
    render() {
        return (
            <View key={this.props.id}>
                <Text style={styles.productName}>{this.props.name}</Text>
                <Text style={styles.productDescription}>{this.props.description}</Text>
                <Text style={styles.productPrice}>{this.props.price}</Text>
            </View>
        )
    }
}