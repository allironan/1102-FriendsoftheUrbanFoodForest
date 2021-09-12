import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';


export default async function deletePost(postID) {
    const db = firebase.firestore();
    const res = await db.collection('Posts').doc(postID.toString()).delete();
}