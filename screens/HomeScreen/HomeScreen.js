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
        posts: [],
        admin: true
    }

    firestoreRef = firebase.firestore().collection('Posts')

    currentView() {
        // console.log(this.state.posts);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.titleFrame} onMouseEnter={this.mouseEnter} onMouseOut={this.mouseOut}>
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
    createTwoButtonAlert = (postID) =>
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
            { text: "OK", onPress: () => {deleteToolLocal(this.props.route.params.toolID); (this.props.navigation.goBack())}}
          ]
        );
    /*
    The following two functions change the styling of the title component on the home screen 
    depending on whether the user taps on the title. 
    */
    mouseEnter = (event) => {
        console.log("over")
        event.target.style = styles.titleFrameHover
        this.setState
    }

    mouseOut = (event) => {
        event.target.style = styles.titleFrame
        this.setState
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
                    <TouchableOpacity onPress={this.createTwoButtonAlert(postID)}>
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

    /*
    currentView() is called for rendering everything to display on the home screen. 
        Returns:    
            View: A view with the application's title, any surveys, and a list of posts.
    */
    currentView() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.titleFrame} onMouseEnter={this.mouseEnter} onMouseOut={this.mouseOut}>
                        <Text style= {styles.title}> Friends of the Urban Food Forest </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Settings")} style={styles.settingsButton}> 
                        <Ionicons name={'person-circle-outline'} size={40} color={'black'}/>
                    </TouchableOpacity>
                
                    {/* this button navigates the user to the survey link */}
                    <TouchableOpacity onPress={this.handleClick} style={styles.button}>
                        <Text style= {styles.buttonLabel}> Take our survey! </Text>
                    </TouchableOpacity>
                    {/* this button navigates the user to the screen to add posts */}
                    {this.state.admin && (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddPostScreen")} style= {styles.button}>
                        <Text style= {styles.buttonLabel}> Add Post </Text>
                    </TouchableOpacity>
                    )}
                    <View>
                        {/* this takes all of the component's posts and passes in each post's data to 
                        displayPost() to return the view for each post */}
                        {this.state.posts.map(r => this.displayPost(r.Title, r.Date, r.Contents, r.Survey, r.PostID))}
                    </View>
                </ScrollView>
            </View>
        );
    }

<div id='test'></div>