import React from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { getUserCart, removeFromCart } from '../../Components/CartComponents';
import styles from '../styles/FundraisingScreens.styles';
import { getProductInfo } from '../../Components/StoreItemComponents';
import { Ionicons } from '@expo/vector-icons';


export default class CartScreen extends React.Component {
    state = {
        cartItems: []
    }

    //firestoreRef = firebase.firestore().collection('UserCart')

    currentView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                </TouchableOpacity>
                <ScrollView>
                    <View>
                        {this.state.cartItems.map(i => this.displayItem(i[0], i[1], i[3], i[4]))}
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        return this.currentView()
    }

    async componentDidMount() {
        cartContents = await getUserCart();
        cartItems = [];

        for (const [key, value] of Object.entries(cartContents)) {
            var itemInfo = await getProductInfo(key);
            itemInfo.push(value);
            cartItems.push(itemInfo);
        }

        this.setState({cartItems});
    }

    displayItem(name, price, id, quantity) {
        return(
            <View style={styles.cartFrame} key={name}>
                <Text>{name}</Text>
                <Text>{'$' + price}</Text>
                <Text>{'Quantity: ' + quantity}</Text>
                <TouchableOpacity onPress={() => removeFromCart(id)}>
                    <Text>Remove</Text>
                </TouchableOpacity>
            </View>
        )
    }
}