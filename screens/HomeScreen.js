import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../getUserData'
import makeNewPost from '../makeNewPost'

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        title: "Hi ",
        contents: "Teest!",
    }

    currentView() {
        return <View style={styles.container}> 
            <Text> Friends of the Urban Food Forest </Text>
            <div>
                <TouchableOpacity onPress={this.createPostsPressed}>
                    <Text> Add Posts </Text>
                </TouchableOpacity>
            </div>
            <div>
            </div>

            
        </View> 
    } 

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser
        getUserData();
        this.setState({email, displayName})
        //const data = getPosts();
        // array.forEach(element => {
        //    console.log(element.title)
        //    console.log(element.content)
        // });
    }

    signOutUser = () => {
        firebase.default.auth().signOut()
    }
    render() {
        return this.currentView();
    }

    createPostsPressed = () => {
        makeNewPost(this.state.title, this.state.contents);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center" 
    }
    
    
})