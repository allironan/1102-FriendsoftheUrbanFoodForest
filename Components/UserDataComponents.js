import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';
import { ReadStream } from 'fs';

//Function to make new user
export async function makeNewUser(paypal = null, permissions = "base", colorTheme = "Default", textSize = "Medium") {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;
    const totalDonations = 0;

    const data = {
        Username: currentUser.displayName,
        Email: currentUser.email,
        UID: currentUID,
        TotalDonations: totalDonations,
        Paypal: paypal,
        Permissions: permissions,
        ColorTheme: colorTheme,
        TextSize: textSize
    };

    const res = await db.collection('Users').doc(currentUID).set(data);

    return data;
}

//Function to get User Data
export async function getUserData(requestedUID = null) {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;
    
    if (!requestedUID == null) {
        currentUID = requestedUID;
    }
    const res = await db.collection('Users').doc(currentUID).get().then((snapshot) => {
        if (snapshot) {
            return snapshot.data()
        }   
    });
    if (res) {
        return res
    }

    makeNewUser();
    const newData = await db.collection('Users').doc(currentUID).get().then((snapshot) => {
        if (snapshot) {
            return snapshot.data()
        }   
    });
    return newData
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