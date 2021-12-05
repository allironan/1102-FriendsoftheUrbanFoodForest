import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import styles from '../styles/FundraisingScreens.styles';

export default class CheckoutScreen extends React.Component {
    currentView() {
        return (
            <View style={styles.container}>
                
            </View>
        )
    }

    render() {
        return this.currentView()
    }
}