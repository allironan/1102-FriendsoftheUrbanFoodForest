import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../getUserData'
import makeNewPost from '../makeNewPost'
import getPosts from '../getPosts'
import deletePost from '../deletePost'

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        title: "Hi ",
        contents: "Teest!",
        postID: 26 //for testing deleting data
    }

    currentView() {
        return <View style={styles.container}> 
            <Text> Friends of the Urban Food Forest </Text>
            <div>
                <TouchableOpacity onPress={this.createPostsPressed}>
                    <Text> Add Posts </Text>
                </TouchableOpacity>
            </div>
            <div id="postsArray">
            </div>

        </View> 
    } 

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser
        getUserData();
        this.setState({email, displayName})
        const postsArray = getPosts();
    }

    signOutUser = () => {
        firebase.default.auth().signOut()
    }
    render() {
        return this.currentView();
    }

    createPostsPressed = () => {
       makeNewPost(this.state.title, this.state.contents);
       //deletePost(this.state.postID);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center" 
    }
    
    
})