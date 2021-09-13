import React, { Children } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../getUserData'
import makeNewPost from '../makeNewPost'
import getPosts from '../getPosts'
import PostsScreen from '../screens/PostsScreen'
import { ScrollView } from 'react-native-gesture-handler'

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        title: "Hi ",
        contents: "Teest!",
        postID: 26, //for testing deleting,
        posts: [],
    }

    currentView() {
        return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ padding: 10, flex: 1}}>
                    <Text style= {styles.title}> Friends of the Urban Food Forest </Text>
                </View>
                <TouchableOpacity 
                    onPress={this.createPostsPressed}
                    style={styles.addPostButton}
                >
                    <Text> Add Post </Text>
                </TouchableOpacity>
                <View>
                    {this.state.posts.map(r => <View>{PostsScreen(r)}</View>)}  
                </View>
                <TouchableOpacity 
                    onPress={this.signOutUser}
                    style={styles.addPostButton}
                >
                    <Text> Sign Out </Text>
                </TouchableOpacity>
            </ScrollView>
               
        </View>
        );
    } 

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser
        getUserData();
        this.setState({email, displayName})
        getPosts().then((userData) => {
            console.log(userData);
            const posts = userData;
            this.setState({posts})
        });
        console.log(this.state.posts)
    }

    signOutUser = () => {
        firebase.default.auth().signOut()
    }

    render() {
        return this.currentView()
    }

    createPostsPressed = () => {
        makeNewPost(this.state.title, this.state.contents);
        this.currentView;
    //code for get posts
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