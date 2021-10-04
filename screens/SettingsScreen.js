import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import { TextInput } from 'react-native'
import {getUserData, editUserData} from '../Components/UserDataComponents'
import styles from './SettingsScreen.styles'

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

        getUserData().then((userData) => {
            // this.state.Paypal = userData.Paypal;
            // this.state.TextSize = userData.TextSize;
            // this.state.ColorTheme = userData.ColorTheme;
            console.log(userData)
            this.setState({Username : userData.Username})
            this.setState({Email : userData.Email})
            //this.setState({Paypal : userData.Permissions})
        });

        this.setState({Email , Username})
    }

    currentView() {
        if (this.state.readOnly) {
            return (
            <View style={styles.container}>
                <View style={styles.settingFrame}>
                    <Text style={styles.settingFont}>Username: {this.state.Username} </Text>
                </View>
                <View style={styles.settingFrame}>
                    <Text style={styles.settingFont}>Email: {this.state.Email} </Text>
                </View>
                <View style={styles.settingFrame}>
                    <Text style={styles.settingFont}>Paypal: {this.state.Paypal} </Text>
                </View>

                <View style={styles.choiceFrame}>
                    <TouchableOpacity onPress={this.changeSettingsPressed}>
                        <Text>Change Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )
        } else {
            return <View style={styles.container}>

            <View style={styles.settingFrame}>
                <Text style={styles.settingFont}>Name: </Text>
                <TextInput
                    placeholder={this.state.Username}
                    value={this.state.Username}
                    onChangeText={Username => this.setState({Username: Username})}
                    style={styles.settingFont}
                />
            </View>

            <View style={styles.settingFrame}>
                <Text style={styles.settingFont}>Email: </Text>
                <TextInput
                    placeholder={this.state.Email}
                    value={this.state.Email}
                    onChangeText={Email => this.setState({Email: Email})}
                    style={styles.settingFont}
                />
            </View>

            <View style={styles.settingFrame}>
                <Text style={styles.settingFont}>Paypal: {this.state.Paypal} </Text>
            </View>

            <View style={styles.choiceFrame}>
                <TouchableOpacity onPress={this.cancelPressed}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.choiceFrame}>
                <TouchableOpacity onPress={this.savePressed}>
                    <Text>Save Settings</Text>
                </TouchableOpacity>
            </View>
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
        editUserData(this.state)
        this.setState({readOnly: true})
    }

    render() {
        return this.currentView()
    }
}

