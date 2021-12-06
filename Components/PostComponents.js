import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

/*
The PostComponents class consists of many functions for manipulating instances 
of a Post object using Firebase.
*/ 

/*
 Function that creates a new post and adds the post to Firebase

    Args:
        title (string): The desired title of the new post
        contents (string): The desired contents of the new post
        survey (string): The url to a survey to be included in the post.
            If none is provided, defaults to no survey.

    Returns:
        map: A map of properties that describe the newly created post
*/
export async function makeNewPost(title, contents, survey=null) {

    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    var curTime = Date();
    var postID = await getNextPost();

    if(survey === "") {
        survey = null;
    }

    const data = {
        Author: currentUID,
        Title: title,
        Contents: contents,
        PostID: postID.NextPostID,
        Date: curTime,
        Survey: survey
    };

    const res = await db.collection('Posts').doc(postID.NextPostID.toString()).set(data);
    return data;
}

/*
 Function that increments the id to be used in the next post

    Returns:
        integer: An integer value that represents a unique id
        to identify the next post to be made
*/
async function getNextPost() {

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const countRef = db.collection('Counters').doc('Post Count');
    const snapshot = await countRef.get();

    if (!snapshot.exists) {
        console.log("Post Count not found in firebase");

        const data = {
            NextPostID: 1,
        };

        const res = db.collection('Counters').doc('Post Count').set(data);
        const count = await countRef.get();
        return count.data();

    } else {
        const res = db.collection('Counters').doc('Post Count');
        const increment = firebase.firestore.FieldValue.increment(1);
        await res.update({NextPostID: increment})
        const count = await countRef.get();
        return count.data();
    }
}

/*
 Function that retrieves all Posts that are located in Firebase

    Returns:
        array: an Array of all post details that were found in Firebase
*/
export async function getPosts() {
    const db = firebase.firestore();

    const countRef = db.collection('Counters').doc('Post Count');
    const snapshot = await countRef.get();
    if (!snapshot.exists) {
        console.log("No posts in firebase");
        return null;
    } else {
        const postArray = [];
        console.log("The array of posts is below: ");
        console.log(postArray);

        return postArray;
    }
}

/*
 Function that edits a post in Firebase

    Args:
        title (string): The desired title of the post
        contents (string): The desired contents of the post
        survey (string): The url to a survey to be included in the post
        postID (string): The id of the post that is to be edited
*/
export async function editPost(title, contents, survey, postID) {

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    var curTime = Date();
    const db = firebase.firestore();
    const postToSet = {
        Author: currentUID,
        Title: title,
        Contents: contents,
        PostID: postID,
        Date: curTime,
        Survey: survey
    };

    const res = await db.collection('Posts').doc(postID.toString()).set(postToSet);
}

//Function to delete posts
/*
 Function that deletes a post from Firebase

    Args:
        postID (string): The id of the post that is to be deleted
*/
export async function deletePost(postID) {
    const db = firebase.firestore();
    const res = await db.collection('Posts').doc(postID.toString()).delete();

}