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
                <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                </TouchableOpacity>
                <View style={styles.viewContainer}>
                    <Text style={styles.headerTitle}>Create New Product</Text>

                    <TextInput  style={styles.titleFillField}
                                placeholder="Product Name" 
                                value={this.state.name}
                                maxLength={50}
                                multiline={true}
                                onChangeText={(value) => this.setState({name: value})} />
                    <TextInput  style={styles.titleFillField}
                                placeholder="Product Price" 
                                value={this.state.price}
                                maxLength={50}
                                multiline={true}
                                onChangeText={(value) => this.setState({price: value})} />
                    <TextInput  style={styles.contentFillField}
                                placeholder="Product Description" 
                                value={this.state.description}
                                maxLength={600}
                                multiline={true}
                                onChangeText={(value) => this.setState({description: value})} />
                    <TouchableOpacity style={styles.submitButton} onPress={() => {
                        makeNewItem(this.state.name, this.state.description, this.state.price)
                        this.props.navigation.goBack()
                    }}>
                        <Text style={styles.submitLabel}> Submit </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return this.currentView()
    }
}