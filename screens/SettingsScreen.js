import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import { TextInput } from 'react-native'
import getUserData from '../firebaseData'

export default class SettingsScreen extends React.Component {
    
    // const [displayName, setDisplayName] = useState("")



    state = {
        Username: "",
        Email: "",
        Paypal: "",
        TextSize: "",
        ColorTheme: "",

        readOnly: true
    }

    componentDidMount() {
        const {Email, Username} = firebase.default.auth().currentUser

        const userData = getUserData();
        this.setState({Username: userData.Username})
        this.state.Email = userData.Email;
        this.state.Paypal = userData.Paypal;
        this.state.TextSize = userData.TextSize;
        this.state.ColorTheme = userData.ColorTheme;

        console.log("I AM IN SETTINGS", userData);

        this.setState({Email , Username})
    }

    currentView() {
        if (this.state.readOnly) {
            return <View style={styles.container}> 
            <Text>Username: {this.state.Username} </Text>
            <Text>Email: {this.state.Email} </Text>
            <Text>Paypal: {this.state.Paypal} </Text>

            <TouchableOpacity onPress={() => {
                this.setState({readOnly: false})
            }}>
                <Text>Change Settings</Text>
            </TouchableOpacity>
            </View> 
        } else {
            return <View style={styles.container}> 

            <div>
                <Text>Name: </Text>
                <TextInput 
                    placeholder={this.state.Username}
                    value={this.state.Username}
                    onChangeText={Username => this.setState({Username: Username})}
                />
            </div>

            <div>
                <Text>Email: </Text>
                <TextInput 
                    placeholder={this.state.Email}
                    value={this.state.Email}
                    onChangeText={Email => this.setState({Email: Email})}
                />
            </div>

            <Text>Paypal: {this.state.Paypal} </Text>

            <TouchableOpacity onPress={() => {
                this.setState({readOnly: true})
            }}>
                <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                this.setState({readOnly: true})
            }}>
                <Text>Save Settings</Text>
            </TouchableOpacity>
            </View>
        }
    }

    render() {
        return this.currentView()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center" 
    },
    flexbox_container: {
        flexDirection: "row",
    }
})