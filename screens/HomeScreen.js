import React, { Children } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../getUserData'
import makeNewPost from '../makeNewPost'
import getPosts from '../getPosts'
import deletePost from '../deletePost'

interface Post {
    Author: currentUID,
    Title: title,
    Contents: contents,
    PostID: postID.NextPostID,
    Date: curTime
}

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        title: "Hi ",
        contents: "Teest!",
        postID: 26 //for testing deleting
    }

    currentView() {
        let posts = getPosts();
        return (
        <View style={styles.container}>
                <View style={{ padding: 10, flex: 1}}>
                    <Text style= {styles.title}> Friends of the Urban Food Forest </Text>
                </View>
                <TouchableOpacity 
                    onPress={this.createPostsPressed}
                    style={styles.addPostButton}
                >
                    <Text style={styles.addPostLabel}> Add Post </Text>
                </TouchableOpacity>
                <View style={styles.postFrame}>
                    <Text style={styles.postTitle}>Test Title</Text>
                    <Text style={styles.postDate}>August 12th, 4:25pm</Text>
                    <Text style={styles.postContent}>Test Content</Text>
                </View>
        </View>
        );
    } 

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser
        getUserData();
        this.setState({email, displayName})
        const postsArray = []//this was created for the div, don't think it does anything
    }

    signOutUser = () => {
        firebase.default.auth().signOut()
    }

    render() {
        return this.currentView();
    }

    createPostsPressed = () => {
    makeNewPost(this.state.title, this.state.contents);
    //code for get posts
    getPosts().then((userData) => {
        console.log(userData);
        postsArray = getPosts();
    });
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    title: {
        textAlign: "center",
        padding: 20,
        marginBottom: 60,
        fontSize: 36,
        fontWeight: 'bold',
        flexWrap: "wrap"
    },
    addPostButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 8,
        alignSelf: 'flex-end',
        width: 100,
        paddingVertical: 10,
        marginHorizontal: '2%',
        marginBottom: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    addPostLabel: {
        fontSize: 16,
        color: 'rgba(196,196,196,1)'
    },
    postFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 25,
        width: 325,
        height: 'auto',
        minHeight: 150,
        marginHorizontal: '2%',
        marginBottom: 12,
        textAlign: 'center'
    },
    postTitle: {
        fontSize: 24,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginTop: 15,
        marginVertical: '2%',
        fontWeight: 'Bold'
    },
    postDate: {
        fontSize: 10,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginBottom: 20,
        color: 'rgba(196,196,196,1)'
    },
    postContent: {
        fontSize: 12,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginVertical: '5%',
        marginBottom: 30
    }
})