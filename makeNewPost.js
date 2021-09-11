import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';


export default async function makeNewPost(title, content) {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    var curTime = Date();

    var postID = getNextPost().this();

    console.log(postID);

    const data = {
        Author: currentUID,
        Title: title,
        Contents: content,
        PostID: postID,
        Date: curTime
    };

    const res = await db.collection('Posts').doc(postID).set(data);

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

        const count = await usersRef.get();
        return count.data();

    } else {
        console.log("Post Count found: ", snapshot.data());
        
        countRef.update({NextPostID : FieldValue.increment(1)})

        const count = await usersRef.get();
        return count.data();
    }
}