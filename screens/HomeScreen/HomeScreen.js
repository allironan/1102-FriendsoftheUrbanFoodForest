import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../../Components/UserDataComponents'
import {makeNewPost, getPosts, deletePost} from '../../Components/PostComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../styles/HomeScreen.style.js'


export default class HomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        title: "Default Title: Hi",
        contents: "Default Content: Teest!",
        survey: "Default survey",
        postID: 26, //for testing deleting,
        posts: [],
        isModalVisible: false
    }

    firestoreRef = firebase.firestore().collection('Posts')

    currentView() {
        // console.log(this.state.posts);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.titleFrame}>
                        <Text style= {styles.title}> Friends of the Urban Food Forest </Text>
                    </View>
                    <TouchableOpacity onPress={this.handleClick} style={styles.button}>
                        <Text style= {styles.buttonLabel}> Take our survey! </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddPostScreen")} style= {styles.button}>
                        <Text style= {styles.buttonLabel}> Add Post </Text>
                    </TouchableOpacity>
                    <View>
                        {/* {this.state.posts.map(r => <DisplayPost key={r.PostID} PostID={r.PostID} Title={r.Title} Date={r.Date} Contents={r.Contents} navigation = {this.props.navigation} route = {this.props.route}/>)} */}
                        {this.state.posts.map(r => this.displayPost(r.Title, r.Date, r.Contents, r.Survey, r.PostID))}
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        // getPosts().then((userData) => {
        //     // console.log(userData);
        //     const posts = userData;
        //     this.setState({posts})
        // });
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection)
        // console.log(this.state.isModalVisible)
        // console.log(this.state.posts)
    }
    componentWillUnmount() {
        this.unsubscribe
    }
    toggleModal = () => {
        this.setState({isModalVisible: !(this.state.isModalVisible)})
        console.log("Modal is now:" + this.state.isModalVisible)
    }
    handleClick = () => {
        window.open("https://forms.gle/gcmT4cyGwSarndiz9");
      };
    postSurveyClick = (surveyLink) => {
        // window.open(surveyLink);
      };
    // toggleModalOff = () => {
    //     this.setState({isModalVisible: false})
    //     console.log("Modal off:" + this.state.isModalVisible)
    // }
    getCollection = (querySnapshot) => {
        const posts = []
        querySnapshot.forEach((post) => {
            posts.push(post.data())
        })
        this.setState({posts})
    }
   

    render() {
        return this.currentView()
    }

    updatePosts(){
        const posts = []
        db.collection("Posts").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if(change.type == 'added'){
                    posts.push(change.data())
                }
            })
        })
        this.setState({posts})
    }

    createPostsPressed = () => {
        const newData = makeNewPost(this.state.title, this.state.contents);
        ReactDOM.render(<DisplayPost PostID={newData.PostID} Title={newData.Title} Date={newData.Date} Contents={newData.Contents} />, document.getElementById('root'))
        //code for get posts
    }

    // TODO: Only display survey button if ((survey is not null) & (survey != ""))
    displayPost(title, date, contents, survey=null, postID) {
        if (survey) {
            return (
                <View style={styles.postFrame} key={postID}>
                    <Text style={styles.postTitle}>{title}</Text>
                    <Text style={styles.postDate}>{date}</Text>

                    <TouchableOpacity onPress={this.postSurveyClick(survey)}>
                            <Text> Take our survey! </Text>
                    </TouchableOpacity>

                    <Text style={styles.postContent}>{contents} </Text>
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditPostScreen", {
                                Title: title,
                                Information: contents,
                                Survey: survey,
                                PostID: postID
                            })}> 
                            <Text style={styles.postFeatureLabel}>Edit Post </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deletePostLocal(postID)}>
                            <Text style={styles.postFeatureLabel}> Delete Post </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.postFrame} key={postID}>
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postDate}>{date}</Text>

            <Text style={styles.postContent}>{contents}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("EditPostScreen", {
                            Title: title,
                            Information: contents,
                            Survey: survey,
                            PostID: postID
                        })}> 
                        <Text style={styles.postFeatureLabel}>Edit Post </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deletePostLocal(postID)}>
                        <Text style={styles.postFeatureLabel}> Delete Post </Text>
                </TouchableOpacity>
        </View>
        );
    } 
}

/*class DisplayPost extends React.Component {
    render () {
        return (
        <View style={styles.postFrame} key={this.props.PostID}>
            <Text style={styles.postTitle}>{this.props.Title}</Text>
            <Text style={styles.postDate}>{this.props.Date}</Text>
            <Text style={styles.postContent}>{this.props.Contents}</Text>
                <TouchableOpacity style={styles.addPostButton} onPress={() => deletePostLocal(this.props.PostID)}>
                        <Text style={styles.addPostLabel}> Delete Post </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("EditPost", {
                            title: title,
                            description: description,
                            postID: postID
                        })}> <Text>Edit Program</Text></TouchableOpacity>
        </View>
        );
    }
}*/

function deletePostLocal(postID){
    //console.log(postID)
    deletePost(postID);
}

<div id='test'></div>