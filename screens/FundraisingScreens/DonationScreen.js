import React, { useReducer } from 'react';
import { Text, TouchableOpacity, View, TextInput, BackHandler, Linking} from 'react-native';
import styles from '../styles/FundraisingScreens.styles';
import { PayPalButton } from 'react-paypal-button-v2';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Ionicons } from '@expo/vector-icons';

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
                {/* Creates a Button that allows a user to return back to the Fundraising page*/}
                <TouchableOpacity   style={styles.goBackButton} 
                                        onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                </TouchableOpacity>
                {/*
                <TextInput  style={styles.titleFillField}
                                placeholder="Donation Amount" 
                                value={this.state.donation_amount}
                                maxLength={50}
                                multiline={true}
                                keyboardType='decimal-pad'
                onChangeText={(value) => this.setState({name: value})} />
                */}
                {/* Creates a Text Input Field that allows the user to set the value of donation.
                This value entered by the user will be positive and numerical*/}
                <TouchableOpacity style={styles.functionButton} onPress={this.handleClick}>
                    <Text> Donate </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return this.currentView()
    }
}