import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: ""
    }

    currentView() {
        return <View style={styles.container}> 
            <Text> Friends of the Urban Food Forest </Text>
            <div>
                <TouchableOpacity onPress={this.createPostsPressed}>
                    <Text> Add Posts </Text>
                </TouchableOpacity>
            </div>
            
        </View> 
    } 

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser

        this.setState({email, displayName})
    }

    signOutUser = () => {
        firebase.default.auth().signOut()
    }
    render() {
        return this.currentView();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center" 
    }
    
    
})