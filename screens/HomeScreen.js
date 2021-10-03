import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../UserData/getUserData'
import {makeNewPost, getPosts, deletePost} from '../Components/PostComponents'
import { ScrollView } from 'react-native-gesture-handler'
import WebViewExample from '../screens/dialogScreen.js'
import styles from './HomeScreen.style.js'


export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        title: "Hi ",
        contents: "Teest!",
        postID: 26, //for testing deleting,
        posts: [],
        isModalVisible: false
    }

    currentView() {
        // console.log(this.state.posts);
        return (
            <View style={styles.container}>
                {/* <Modal
                isVisible={this.state.isModalVisible}
                transparent={false} >
                    <View>
                    <Text>Hello!</Text>

                    <Button title="Hide modal" onPress={this.toggleModal} />
                    </View>
                </Modal> */}
                <ScrollView>
                    <View style={{ padding: 10, flex: 1}}>
                        <Text style= {styles.title}> Friends of the Urban Food Forest </Text>
                    </View>
                    <TouchableOpacity onPress={this.createPostsPressed} style={styles.addPostButton}>
                        <Text> Add Post </Text>
                    </TouchableOpacity>
                    <View>
                        {this.state.posts.map(r => <DisplayPost key={r.PostID} PostID={r.PostID} Title={r.Title} Date={r.Date} Contents={r.Contents} />)}
                    </View>
                    <TouchableOpacity onPress={this.signOutUser} style={styles.addPostButton}>
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
            // console.log(userData);
            const posts = userData;
            this.setState({posts})
        });
        // console.log(this.state.isModalVisible)
        // console.log(this.state.posts)
    }
    toggleModal = () => {
        this.setState({isModalVisible: !(this.state.isModalVisible)})
        console.log("Modal is now:" + this.state.isModalVisible)
    }

    // toggleModalOff = () => {
    //     this.setState({isModalVisible: false})
    //     console.log("Modal off:" + this.state.isModalVisible)
    // }

    signOutUser = () => {
        firebase.default.auth().signOut()
    }

    render() {
        return this.currentView()
    }

    createPostsPressed = () => {
        const newData = makeNewPost(this.state.title, this.state.contents);
        ReactDOM.render(<DisplayPost PostID={newData.PostID} Title={newData.Title} Date={newData.Date} Contents={newData.Contents} />, document.getElementById('root'))
        //code for get posts
    }
}

class DisplayPost extends React.Component {
    render () {
        return (
        <View style={styles.postFrame} key={this.props.PostID}>
            <Text style={styles.postTitle}>{this.props.Title}</Text>
            <Text style={styles.postDate}>{this.props.Date}</Text>
            <Text style={styles.postContent}>{this.props.Contents}</Text>
                <TouchableOpacity style={styles.addPostButton} onPress={() => deletePostLocal(this.props.PostID)}>
                        <Text style={styles.addPostLabel}> Delete Post </Text>
                </TouchableOpacity>
        </View>
        );
    }
}

function deletePostLocal(postID){
    //console.log(postID)
    deletePost(postID);
}

<div id='test'></div>