import React, { useReducer } from 'react';
import { Text, TouchableOpacity, View, TextInput, BackHandler, Linking} from 'react-native';
import styles from '../styles/FundraisingScreens.styles';
import { PayPalButton } from 'react-paypal-button-v2';
import InAppBrowser from 'react-native-inappbrowser-reborn';

/*
The DonationScreen class renders the donation screen to the user.
Additionally, this screen is responsible for donation transactions through Paypal
*/ 
export default class DonationScreen extends React.Component {
    state = {
        donation_amount: 0
    }

    handleClick = () => {
        Linking.canOpenURL('https://friendsofbrownsmillfoodforestpark.org/give-today/').then(supported => {
          if (supported) {
            Linking.openURL('https://friendsofbrownsmillfoodforestpark.org/give-today/');
          } else {
            console.log("Don't know how to open URI: " + 'https://friendsofbrownsmillfoodforestpark.org/give-today/');
          }
        });
      };

    /*
        currentView() is called for rendering everything to display on the display screen. 
            Returns:    
                View: A view with the donation page, a field to enter the amount you wish to donate,
                and the buttons to continue your transaction.
        */
    currentView() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                {/* Creates a Button that allows a user to return back to the Fundraising page*/}
                <TouchableOpacity style={styles.functionButton} onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.buttonText}> Go back </Text>
                </TouchableOpacity>
                {/* Creates a Text Input Field that allows the user to set the value of donation.
                This value entered by the user will be positive and numerical*/}
                <TouchableOpacity style={styles.functionButton} onPress={this.handleClick}>
                    <Text style={styles.buttonText}> Donate </Text>
                </TouchableOpacity>
                </View> 
            </View>
        )
    }

    render() {
        return this.currentView()
    }
}