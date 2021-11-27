import React from 'react';
import { Text, TouchableOpacity, View, TextInput, BackHandler } from 'react-native';
import styles from '../styles/FundraisingScreens.styles';

export default class DonationScreen extends React.Component {
    state = {
        donation: ""
    }

    currentView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.functionButton} onPress={() => this.props.navigation.goBack()}>
                    <Text> Go back </Text>
                </TouchableOpacity>

                <TextInput placeholder="Donation Amount" 
                                        value={this.state.donation}
                                        onChangeText={(value) => this.setState({donation: value})} />

                <TouchableOpacity style={styles.functionButton} onPress={() => this.props.navigation.goBack()}>
                    <Text> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return this.currentView()
    }
}