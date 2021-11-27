import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import styles from '../styles/FundraisingScreens.styles'

export default class FundraisingOptionsScreen extends React.Component {
    currentView() {
        return (
            <View style={styles.container}>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.fundraisingOption} onPress={() => this.props.navigation.navigate("DonationScreen")}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Donations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fundraisingOption} onPress={() => this.props.navigation.navigate("StoreScreen")}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Store</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return this.currentView()
    }
}