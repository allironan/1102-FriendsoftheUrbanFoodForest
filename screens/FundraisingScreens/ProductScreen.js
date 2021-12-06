import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { addToCart} from '../../Components/CartComponents';
import { deleteItem } from '../../Components/StoreItemComponents';
import styles from '../styles/FundraisingScreens.styles';
import { Ionicons } from '@expo/vector-icons';

export default class ProductScreen extends React.Component {
    currentView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                </TouchableOpacity>
                <View style={styles.viewContainer}>
                    <View key={this.props.id}>
                        <Text style={styles.productName}>{this.props.route.params.name}</Text>
                        <Text style={styles.productDescription}>{this.props.route.params.description}</Text>
                        <Text style={styles.productPrice}>{"$ " + this.props.route.params.price}</Text>
                    </View>

                    <View style={styles.productFunctions}>
                        <TouchableOpacity style={styles.functionButton} onPress={() => this.addProductLocal()}>
                            <Text> Add to Cart </Text>
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

    async addProductLocal() {
        addToCart(this.props.route.params.id)
        this.props.navigation.goBack()
    }

    deleteProductLocal() {
        deleteItem(this.props.route.params.id)
        this.props.navigation.goBack()
    }

    render() {
        return this.currentView()
    }
}