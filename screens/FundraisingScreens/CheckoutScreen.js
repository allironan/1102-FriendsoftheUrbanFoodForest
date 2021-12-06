import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import styles from '../styles/FundraisingScreens.styles';
import { Ionicons } from '@expo/vector-icons';

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