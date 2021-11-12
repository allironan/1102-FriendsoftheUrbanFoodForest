import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import styles from '../styles/FundraisingScreens.styles';

export default class DonationScreen extends React.Component {
    currentView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text> Go back </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return this.currentView()
    }
}