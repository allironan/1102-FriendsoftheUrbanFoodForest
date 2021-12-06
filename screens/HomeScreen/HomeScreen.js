import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, Image, TouchableOpacity, Alert, Linking} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import { getUserData } from '../../Components/UserDataComponents'
import {makeNewPost, getPosts, deletePost} from '../../Components/PostComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../styles/HomeScreen.style.js'
import { Ionicons } from '@expo/vector-icons';
import logo from '../../assets/Friends-Company-Logo.png'


export default class HomeScreen extends React.Component {
    
    /* 
    The state variable locally stores the data specific to this component. 
    The component uses this local data for rendering purposes or to execute other logic. 
     */
    state = {
        posts: [],
        admin: true
    }

    /*
     postsRef makes a call to get the collection of Post data documents from Firestore.
    */
    postsRef = firebase.firestore().collection('Posts')

    /*
    componentDidMount() executes functionality necessary before the home screen renders. 
    Here it sets up an event listener for the posts collection (any time the posts collection in the database changes, the UI changes as well).
    Once the database call to get the posts collection returns, it calls the getCollection method. 
    */
    componentDidMount() {
        this.unsubscribe = this.postsRef.onSnapshot(this.getCollection)
    }

    /*
    This function takes the post collection and stores it in the component's state
    
        Args:
        querySnapshot (Firestore Collection): This is a Firestore collection with all the data documents 
        for the collection (in this case posts)
    */
    getCollection = (querySnapshot) => {
        const posts = []
        querySnapshot.forEach((post) => {
            posts.push(post.data())
        })
        posts.reverse();
        this.setState({posts})
    }

    /*
    componentDidMount() executes functionality right before a component is exited. 
    Before the HomeScreen component is exited, this unsubscribes the event listener set up on the posts collection. 
    */
    componentWillUnmount() {
        this.unsubscribe
    }

    /*
    handleclick() opens a browser window that navigates the user to the specicified link 
    (used for displaying Google Form surveys)
    */
    handleClick = () => {
        Linking.canOpenURL('https://www.google.com').then(supported => {
          if (supported) {
            Linking.openURL('https://www.google.com');
          } else {
            console.log("Don't know how to open URI: " + 'https://www.google.com');
          }
        });
      };

    /*
    createTwoButtonAlert() creates an alert for when a user tries to delete a post, confirming that this is what they want
    */
    createTwoButtonAlert = (postID) => {
      //This works on iOS and Android simulators but not web (heads up for testing purposes)
        Alert.alert(
          "Delete Post",
          "Are you sure you want to delete this post?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {deletePost(postID)}}
          ]
        );
    }

    /*
    updatePosts() is called when any posts were changed or added to the database to 
    accordingly change the post data in the components state.
    */
    updatePosts(){
        const posts = []
        db.collection("Posts").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(post => {
                if(post.type == 'added'){
                    posts.push(post.data())
                }
            })
        })
        posts.reverse()
        this.setState({posts})
    }

    /*
    updatePosts() is called when any posts were changed or added to the database to 
    accordingly change the post data in the components state.
    */
    createPostsPressed = () => {
        const newData = makeNewPost(this.state.title, this.state.contents);
        ReactDOM.render(<DisplayPost PostID={newData.PostID} Title={newData.Title} Date={newData.Date} Contents={newData.Contents} />, document.getElementById('root'))
    }

    /*
    displayPost() is called for rendering each post with it's relevant data. 

        Args: title (string): title of the post,
              date (string): date the post was made,
              contents (string): the post's content,
              postID (string): the id of the post
        Returns:    
            View: A view representing a post with it's styling and relevant info.
    */
    displayPost(title, date, contents, survey=null, postID) {
        return (
            <View style={styles.postFrame} key={postID}>
                <Text style={styles.postTitle}>{title}</Text>
                <Text style={styles.postDate}>{date}</Text>

                <Text style={styles.postContent}>{contents}</Text>
                {this.state.admin && (
                    <View style={styles.postOptions}>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => this.createTwoButtonAlert(postID)}>
                            <Ionicons name={'trash-outline'} size={16} color={'black'}/>
                            <Text style={styles.postOptionLabel}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => this.props.navigation.navigate("EditPostScreen", {
                                Title: title,
                                Information: contents,
                                Survey: survey,
                                PostID: postID
                            })}> 
                                <Ionicons name={'create-outline'} size={16} color={'black'}/>
                                <Text style={styles.postOptionLabel}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    } 

    /*
    currentView() is called for rendering everything to display on the home screen. 
        Returns:    
            View: A view with the application's title, any surveys, and a list of posts.
    */
    currentView() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logo} style={styles.logo}/>
                    <Text style={styles.headerTitle}>Friends of the Urban Food Forest</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Settings")} > 
                        <Ionicons name={'person-circle-outline'} size={40} color={'black'}/>
                    </TouchableOpacity>
                </View>
                {/* this button navigates the user to the survey link */}
                <TouchableOpacity onPress={this.handleClick} style={styles.surveyButton}>
                    <Text style= {styles.surveyLabel}> Take our survey! </Text>
                </TouchableOpacity>
                {/* this button navigates the user to the screen to add posts */}
                {this.state.admin && (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddPostScreen")} style= {styles.addPostButton}>
                        <View>
                            <Ionicons name={'add-outline'} size={30} color={'black'}/>
                        </View>
                        <Text style={styles.addPostLabel}>Add Post</Text>
                    </TouchableOpacity>
                )}
                <ScrollView>
                    <View>
                        {/* this takes all of the component's posts and passes in each post's data to 
                        displayPost() to return the view for each post */}
                        {this.state.posts.map(r => this.displayPost(r.Title, r.Date, r.Contents, r.Survey, r.PostID))}
                    </View>
                </ScrollView>
            </View>
        );
    }

    render() {
        return this.currentView()
    }
}