import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import { TextInput } from 'react-native'

export default class SettingsScreen extends React.Component {
    
    // const [displayName, setDisplayName] = useState("")

    state = {
        displayName: "",
        email: "",
        paypalUsername: "",
        textSize: "",
        colorTheme: "",

        readOnly: true
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser

        this.setState({email, displayName})
    }

    currentView() {
        if (this.state.readOnly) {
            return <View style={styles.container}> 
            <Text>Name: {this.state.displayName} </Text>
            <Text>Email: {this.state.email} </Text>
            <Text>paypalUsername: {this.state.paypalUsername} </Text>

            <TouchableOpacity onPress={this.changeSettingsPressed}>
                <Text>Change Settings</Text>
            </TouchableOpacity>
            </View> 
        } else {
            return <View style={styles.container}> 

            <div>
                <Text>Name: </Text>
                <TextInput 
                    placeholder={this.state.displayName}
                    value={this.state.displayName}
                    onChangeText={displayName => this.setState({displayName: displayName})}
                />
            </div>

            <div>
                <Text>Email: </Text>
                <TextInput 
                    placeholder={this.state.email}
                    value={this.state.email}
                    onChangeText={email => this.setState({email: email})}
                />
            </div>

            <Text>paypalUsername: {this.state.paypalUsername} </Text>

            <TouchableOpacity onPress={this.cancelPressed}>
                <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.savePressed}>
                <Text>Save Settings</Text>
            </TouchableOpacity>
            </View>
        }
    }

    changeSettingsPressed = () => {
        this.setState({readOnly: false})
    }

    cancelPressed = () => {
        const {email, displayName} = firebase.default.auth().currentUser
        this.setState({displayName: displayName})
        this.setState({email: email})
        this.setState({readOnly: true})
    }

    savePressed = () => {
        firebase.default.auth().currentUser.updateProfile({
            displayName: this.state.displayName,
            email: this.state.email
        })
        this.setState({readOnly: true})
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