import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import { TextInput } from 'react-native'
import {getUserData, editUserData} from '../Components/UserDataComponents'
import styles from './styles/SettingsScreen.styles'

export default class SettingsScreen extends React.Component {

    state = {
        Username: "",
        Email: "",
        TextSize: "",
        ColorTheme: "",
        readOnly: true
    }

    componentDidMount() {
        const db = firebase.firestore();
        const currentUser = firebase.auth().currentUser;
        this.setState({Username: currentUser.displayName, Email: currentUser.email})
    }

    currentView() {
        if (this.state.readOnly) {
            return (
            <View style={styles.container}>
                <View style={styles.topSettingFrame}>
                    <Text style={styles.settingFont}>Username: {this.state.Username} </Text>
                </View>
                <View style={styles.settingFrame}>
                    <Text style={styles.settingFont}>Email: {this.state.Email} </Text>
                </View>
                <View style={styles.choiceFrame}>
                    <TouchableOpacity onPress={this.changeSettingsPressed}>
                        <Text style={styles.choiceText}>Change Settings</Text>
                    </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity onPress={this.signOutUser} style={styles.choiceFrame}>
                        <Text style={styles.choiceText}> Sign Out </Text>
                </TouchableOpacity>
            </View>
            </View>
            )
        } else {
            return <View style={styles.container}>

            <View style={styles.topSettingFrame}>
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

            <View style={styles.choiceFrame}>
                <TouchableOpacity onPress={this.cancelPressed}>
                    <Text  style={styles.choiceText}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.choiceFrame}>
                <TouchableOpacity onPress={this.savePressed}>
                    <Text style={styles.choiceText}>Save Settings</Text>
                </TouchableOpacity>
            </View>
            </View>
        }
    }
    signOutUser = () => {
        firebase.default.auth().signOut()
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
            displayName: this.state.Username,
            email: this.state.email
        })
        editUserData(this.state)
        this.setState({readOnly: true})
    }

    render() {
        return this.currentView()
    }
}

