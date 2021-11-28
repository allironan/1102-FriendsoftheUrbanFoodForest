import React, { useReducer } from 'react';
import { Text, TouchableOpacity, View, TextInput, BackHandler } from 'react-native';
import styles from '../styles/FundraisingScreens.styles';
import { PayPalButton } from 'react-paypal-button-v2';

/*
The DonationScreen class renders the donation screen to the user.
Additionally, this screen is responsible for donation transactions through Paypal
*/ 
export default class DonationScreen extends React.Component {
    state = {
        donation_amount: "0.00"
    }

    currentView() {
        return (
            <View style={styles.container}>
                {/* Creates a Button that allows a user to return back to the Fundraising page*/}
                <TouchableOpacity style={styles.functionButton} onPress={() => this.props.navigation.goBack()}>
                    <Text> Go back </Text>
                </TouchableOpacity>
                {/* Creates a Text Input Field that allows the user to set the value of donation.
                This value entered by the user will be positive and numerical*/}
                <TextInput 
                    style={styles.textFillField}
                    placeholder="Donation Amount" 
                    value={"$" + this.state.donation_amount}
                    keyboardType = 'numeric'
                    onChangeText={
                        (value) => this.setState({donation_amount: parseFloat(value.replace(/[^0-9.]/g, '')).toFixed(2)})
                    } 
                />
                {/* Utilizing react-paypal-button-v2 we render a number of options for the user
                to complete a transaction based on the value currently in the donation input.
                Users can choose from paying with a Paypal account, paying later, or with a debit 
                or credit card*/}
                <PayPalButton
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: "USD",
                                    value: this.state.donation_amount
                                },
                                description: "Donation to Friends of the Urban Food Forest at Brown Mills",
                            }]
                        });
                    }}
                    onSuccess={(details, data) => {
                        alert("Thank you for your generous donation of $" + this.state.donation_amount + " " + details.payer.name.given_name + "!");
                        this.props.navigation.goBack()
                    }}
                    currency = "USD"
                    options={{
                        // Not the real client ID for security reasons
                        clientId: "AYz9JKsZ_TEo5elY-FFAuJRZBg9Nz5cbIhDQp-kGWX_W9SOA5_mAy0TAQ8ZQ1puEWkYJ9czpV9m_2deL",
                        currency: "USD"
                    }}
                />
            </View>
        )
    }

    render() {
        return this.currentView()
    }
}