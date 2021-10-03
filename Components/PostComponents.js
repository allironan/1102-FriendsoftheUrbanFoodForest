import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

//Function to make new posts
export async function makeNewPost(title, contents) {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    var curTime = Date();

    var postID = await getNextPost()

    const data = {
        Author: currentUID,
        Title: title,
        Contents: contents,
        PostID: postID.NextPostID,
        Date: curTime
    };

    const res = await db.collection('Posts').doc(postID.NextPostID.toString()).set(data);

    return data;

}

//Function to get next post in database
async function getNextPost() {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;

    const countRef = db.collection('Posts').doc('Post Count');
    const snapshot = await countRef.get();

    if (!snapshot.exists) {
        console.log("Post Count not found in firebase");

        const data = {
            NextPostID: 1,
        };

        const res = db.collection('Posts').doc('Post Count').set(data);

        const count = await countRef.get();
        return count.data();

    } else {
        //console.log("Post Count found: ", snapshot.data());

        const value = snapshot.data().NextPostID + 1;
        const data = {
            NextPostID: value
        }
        const res = db.collection('Posts').doc('Post Count').set(data);

        const count = await countRef.get();
        
        return count.data();
    }
}

//Function to get all posts in database
export async function getPosts() {
    const db = firebase.firestore();

    const countRef = db.collection('Posts').doc('Post Count');
    const snapshot = await countRef.get();
    if (!snapshot.exists) {
        console.log("No posts in firebase");

        return null;
    } else {
        const postArray = [];
        const test = 1;
        for (let i = 0; i <= snapshot.data().NextPostID; i++) {
            const usersRef = db.collection('Posts').doc(i.toString());
            const snapshot = await usersRef.get();
            if (snapshot.exists) {
                //console.log("Item data found: ", snapshot.data());
                postArray.push(snapshot.data());
            }
        }
        console.log(postArray);
        return postArray;
    }
}

//Function to edit posts
export async function editPost(postToSet, postID) {

    const db = firebase.firestore();

    const res = await db.collection('Posts').doc(postID.toString()).set(postToSet);

}

//Function to delete posts
export async function deletePost(postID) {
    const db = firebase.firestore();
    const res = await db.collection('Posts').doc(postID.toString()).delete();
    //if we want to add/subtract each time
    // const countRef = db.collection('Posts').doc('Post Count');
    // const snapshot = await countRef.get();
    // const value = snapshot.data().NextPostID + 1;
    // const data = {
    //     NextPostID: value
    // }
    // const res2 = db.collection('Posts').doc('Post Count').set(data);
}