import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

//Function to make new event
export async function makeNewUser(paypal = null, permissions = "base", colorTheme = "Default", textSize = "Medium") {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const data = {
        Username: currentUser.displayName,
        Email: currentUser.email,
        UID: currentUID,
        Paypal: paypal,
        Permissions: permissions,
        ColorTheme: colorTheme,
        TextSize: textSize
    };

    const res = await db.collection('Users').doc(currentUID).set(data);

    const newData = await usersRef.get();
    return newData;

}


//Function to get User Data
export async function getUserData(requestedUID = null) {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;
    
    if (!requestedUID == null) {
        currentUID = requestedUID;
    }
    const res = await db.collection('Users').doc(currentUID);
    const snapshot = await res.get();

    if (!snapshot.exists) {
        console.log("User not found in database");

        makeNewUser();
        
        const res = await db.collection('Users').doc(currentUID).set(data);

        const newData = await usersRef.get();
        return newData;
    } else {

        return snapshot.data;
    }

    

    const usersRef = db.collection('Users').doc(currentUID);
    const snapshot = await usersRef.get();

    if (!snapshot.exists) {
        console.log("User data not found in firebase");

        const data = {
            Username: currentUser.displayName,
            Email: currentUser.email,
            UID: currentUID,
            Paypal: null,
            Permissions: "base",
            ColorTheme: "Default",
            TextSize: "Medium"
        };

        const res = await db.collection('Users').doc(currentUID).set(data);

        const newData = await usersRef.get();
        return newData;

    } else {
        // console.log("User data found: ", snapshot.data());
        return snapshot.data();
    }
}

//Function to edit User Data
export async function editUserData(dataToSet) {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const res = await db.collection('Users').doc(currentUID).set(dataToSet);

}

//Function to delete User Data
export async function deleteUserData(UID) {
    const db = firebase.firestore();
    const res = await db.collection('Users').doc(UID.toString()).delete();
}