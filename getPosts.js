import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

export default async function getPosts() {
    const db = firebase.firestore();

    const countRef = db.collection('Posts').doc('Post Count');
    const snapshot = await countRef.get();
    if (!snapshot.exists) {
        console.log("No posts in firebase");

        return null;
    } else {
        const postArray = [];
        const test = 1;
        for (let i = 0; i < snapshot.data().NextPostID; i++) {
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
