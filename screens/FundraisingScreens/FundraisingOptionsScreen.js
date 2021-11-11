import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import styles from '../styles/FundraisingScreens.styles'

export default class FundraisingOptionsScreen extends React.Component {
    currentView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DonationScreen")}>
                    <Text>Donations</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("StoreScreen")}>
                    <Text>Store</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return this.currentView()
    }
}