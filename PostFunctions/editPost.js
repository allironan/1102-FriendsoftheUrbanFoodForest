import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

export default async function editPost(postToSet) {

    const db = firebase.firestore();

    const res = await db.collection('Posts').doc('Post Count').set(postToSet);

}