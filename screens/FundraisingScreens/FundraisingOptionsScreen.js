import React from 'react';
import { Text, TouchableOpacity, View, Linking } from 'react-native';
import styles from '../styles/FundraisingScreens.styles'

export default class FundraisingOptionsScreen extends React.Component {
    currentView() {
        return (
            <View style={styles.container}>
                <View style={styles.fundraisingOptionsContainer}>
                    <TouchableOpacity style={styles.fundraisingOption} onPress={() => this.donationClick()}>
                        <Text style={styles.fundraisingOptionLabel}>Donation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fundraisingOption} onPress={() => this.props.navigation.navigate("StoreScreen")}>
                        <Text style={styles.fundraisingOptionLabel}>Store</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    donationClick = () => {
        Linking.canOpenURL('https://friendsofbrownsmillfoodforestpark.org/give-today/').then(supported => {
            if (supported) {
                Linking.openURL('https://friendsofbrownsmillfoodforestpark.org/give-today/');
            } else {
                console.log("Don't know how to open URI: " + 'https://friendsofbrownsmillfoodforestpark.org/give-today/');
            }
        });
    };


    render() {
        return this.currentView()
    }
}