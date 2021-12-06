import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { makeNewItem } from '../../Components/StoreItemComponents'
import styles from '../styles/FundraisingScreens.styles';
import { Ionicons } from '@expo/vector-icons';

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
                    <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                    </TouchableOpacity>
                    
                    <Text style={styles.headerTitle}>Create New Product</Text>

                    <TextInput  style={styles.titleFillField}
                                placeholder="Product Name" 
                                value={this.state.name} 
                                onChangeText={(value) => this.setState({name: value})} />
                    <TextInput  placeholder="Product Description" 
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