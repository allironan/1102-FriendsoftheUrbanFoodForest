import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { makeNewItem } from '../../Components/StoreItemComponents'
import styles from '../styles/FundraisingScreens.styles';

export default class AddProductScreen extends React.Component {
    state = {
        name: "",
        description: "",
        price: ""
    }

    currentView() {
        return (
            <View style={styles.container}>
                <View style={styles.viewContainer}>
                    <TouchableOpacity style={styles.functionButton} onPress={() => this.props.navigation.goBack()}>
                        <Text> Go Back </Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.productName}>Create new Product</Text>

                    <TextInput placeholder="Product Name" 
                                    value={this.state.name} 
                                    onChangeText={(value) => this.setState({name: value})} />
                    <TextInput placeholder="Product Description" 
                                        value={this.state.description}
                                        onChangeText={(value) => this.setState({description: value})} />
                    <TextInput placeholder="Product Price" 
                                        value={this.state.price}
                                        onChangeText={(value) => this.setState({price: value})} />
                    <TouchableOpacity style={styles.functionButton} onPress={() => {
                        makeNewItem(this.state.name, this.state.description, this.state.price)
                        this.props.navigation.goBack()
                    }}>
                        <Text> Submit </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return this.currentView()
    }
}