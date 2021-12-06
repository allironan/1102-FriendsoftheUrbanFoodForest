import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import firebase from 'firebase/app'
import styles from '../styles/FundraisingScreens.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserCart } from '../../Components/CartComponents';
import { Ionicons } from '@expo/vector-icons';

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
                <View style={styles.storeFunctions}> 
                    <TouchableOpacity   style={styles.goBackButton} 
                                        onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                    </TouchableOpacity>
                    <TouchableOpacity   style={styles.cartButton} 
                                        onPress={() => this.props.navigation.navigate("CartScreen")}>
                        <View>
                            <Ionicons name={'cart-outline'} size={35} color={'black'}/>
                        </View>
                        <Text> Cart</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addItemButton} 
                    onPress={() => this.props.navigation.navigate("AddProductScreen")}>
                        <View>
                            <Ionicons name={'add-outline'} size={35} color={'black'}/>
                        </View>
                    <Text style={styles.addItemLabel}>Add Product</Text>
                </TouchableOpacity>
                

                <ScrollView>
                    <View style={styles.storeScrollContainer}>
                        {this.state.products.map((product) => (
                            product.ItemID &&
                            <TouchableOpacity style={styles.productFrame} key={product.ItemID} onPress={() => this.props.navigation.navigate("ProductScreen", {
                                id: product.ItemID,
                                name: product.Name,
                                description: product.Description,
                                price: product.Price
                            })}>
                                <ProductComponent key={product.ItemID} id={product.ItemID} name={product.Name} description={product.Description} price={product.Price}></ProductComponent>
                            </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName});
        var cart = getUserCart();
        this.unsubscribe = this.firestoreRefStoreGoods.onSnapshot(this.getCollection);
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

    render() {
        return this.currentView()
    }
}

class ProductComponent extends React.Component {
    render() {
        return (
            <View key={this.props.id}>
                <Text style={styles.productName}>{this.props.name}</Text>
                <Text style={styles.productPrice}>{"$" + this.props.price}</Text>
            </View>
        )
    }
}