import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';


export default async function deletePost(postID) {
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