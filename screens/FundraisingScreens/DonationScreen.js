import React from 'react';
import { Text, TouchableOpacity, View, TextInput, BackHandler } from 'react-native';
import styles from '../styles/FundraisingScreens.styles';
import { PayPalButton } from 'react-paypal-button-v2';
import { CurrencyInput } from "react-currency-input-field";
export default class DonationScreen extends React.Component {
    state = {
        donation: "0.00"
    }

    currentView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.functionButton} onPress={() => this.props.navigation.goBack()}>
                    <Text> Go back </Text>
                </TouchableOpacity>
                {/* Creates a Text Input Field that sets the value of donation to a positive number*/}
                <TextInput 
                    style={styles.textFillField}
                    placeholder="Donation Amount" 
                    value={"$" + this.state.donation}
                    keyboardType = 'numeric'
                    onChangeText={
                        (value) => this.setState({donation: parseFloat(value.replace(/[^0-9.]/g, '')).toFixed(2)})
                    } 
                />
                <PayPalButton
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: "USD",
                                    value: this.state.donation
                                },
                                description: "Donation to Friends of the Urban Food Forest at Brown Mills",
                            }]
                        });
                    }}
                    onSuccess={(details, data) => {
                        alert("Thank you for your generous donation " + details.payer.name.given_name + "!");
                        this.props.navigation.goBack()
                    }}
                    currency = "USD"
                    options={{
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