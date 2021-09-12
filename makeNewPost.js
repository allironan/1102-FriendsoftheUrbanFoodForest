import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';


export default async function makeNewPost(title, contents) {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    var curTime = Date();

    var postID = await getNextPost()//.this();

    console.log(postID);

    const data = {
        Author: currentUID,
        Title: title,
        Contents: contents,
        PostID: postID,
        Date: curTime
    };

    const res = await db.collection('Posts').doc(postID.toString()).set(data);

    return data;

}

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
        console.log("Post Count found: ", snapshot.data());

        const value = snapshot.data().NextPostID + 1;
        const data = {
            NextPostID: value
        }
        const res = db.collection('Posts').doc('Post Count').set(data);

        const count = await countRef.get();
        
        return count.data();
    }
}