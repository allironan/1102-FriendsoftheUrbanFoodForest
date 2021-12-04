import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { addToCart, removeFromCart } from '../../Components/CartComponents';
import styles from '../styles/FundraisingScreens.styles';

export default class ProductScreen extends React.Component {
    currentView() {
        return (
            <View style={styles.container}>
                <View style={styles.viewContainer}>
                    <TouchableOpacity style={styles.functionButton} onPress={() => this.props.navigation.goBack()}>
                        <Text> Go Back </Text>
                    </TouchableOpacity>

                    <View key={this.props.id}>
                        <Text style={styles.productName}>{this.props.route.params.name}</Text>
                        <Text style={styles.productDescription}>{this.props.route.params.description}</Text>
                        <Text style={styles.productPrice}>{this.props.route.params.price}</Text>
                    </View>

                    <View style={styles.productFunctions}>
                        <TouchableOpacity style={styles.functionButton} onPress={() => this.addProductLocal()}>
                            <Text> Add Product to Cart </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.functionButton} onPress={() => this.props.navigation.navigate("EditProductScreen", {
                                id: this.props.route.params.id,
                                name: this.props.route.params.name,
                                description: this.props.route.params.description,
                                price: this.props.route.params.price
                            })}>
                            <Text> Edit Product </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.functionButton} onPress={() => this.deleteProductLocal()}>
                            <Text> Delete Product </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    addProductLocal() {
        console.log("Item: " + this.props.route.params.id)
        addToCart(this.props.route.params.id)
        this.props.navigation.goBack()
    }

    deleteProductLocal() {
        removeFromCart(this.props.route.params.id)
        this.props.navigation.goBack()
    }

    render() {
        return this.currentView()
    }
}