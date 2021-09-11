import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';


export default async function getUserData() {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const usersRef = db.collection('Users').doc(currentUID);
    console.log(usersRef);
    const snapshot = await usersRef.get();

    if (!snapshot.exists) {
        console.log("User data not found in firebase");

        const data = {
            Username: "John Doe",
            Password: "abc123",
            Email: currentUser.email,
            UID: currentUID,
            Paypal: null,
            Permissions: "base",
            ColorTheme: "Default",
            TextSize: "Medium"
        };

        const res = await db.collection('Users').doc(currentUID).set(data);

        return data;

    } else {
        console.log("User data found: ", snapshot.data());
        return snapshot.data();
    }
}



