import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import * as firebase from '@firebase/app'
import '@firebase/auth'
import styles from './styles/LoginScreen.styles'

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null
    };

    handleLogin = () => {
       
        const {email, password} = this.state
        firebase.default.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({errorMessage: error.message}))
    }

    render() {
        return <View style={styles.container}> 
            <Text style={styles.greeting}> {'Hello again. \nWelcome back.'} </Text>
            <View style={styles.errorMessage}>
                {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>
            <View style={styles.form}>
                <View> 
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={email => this.setState({email})} 
                    value = {this.state.email}></TextInput>
                    
                </View>
                <View style={{marginTop: 32}}>  
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry={true} autoCapitalize="none" 
                    onChangeText={password => this.setState({password})}
                    value = {this.state.password}></TextInput>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                <Text style={{fontWeight: "600"}}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center", marginTop: 32}} onPress={() => this.props.navigation.navigate("Register")}>
                <Text style={{ fontSize: 13, fontWeight: "500"}}>
                    Signup
                </Text>
            </TouchableOpacity>
        </View>
    }
}