import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

export default async function getPosts() {
    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;

    const countRef = db.collection('Posts').doc('Post Count');
    const collection = db.collection('Posts')

    const snapshot = await countRef.get();
    if (!snapshot.exists) {
        console.log("No posts in firebase");

        return null;

    } else {
        console.log("Posts found: ", snapshot.data());
        const postArray = null;
        for (let i = 0; i < countRef; i++) {
            if (db.collection('Posts').doc(i) != null) {
                postArray.add(db.collection('Posts').doc(i));
            }
        }
        return postArray;
    }
}
