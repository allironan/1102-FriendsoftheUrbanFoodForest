import db from './app.json';
import React, { createContext, useEffect } from 'react'
import firebaseConfig from './firebaseConfig';
import app from 'firebase/app'
import 'firebase/database';

function getUserData() {

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.getUid();

    const usersRef = db.collection('Users').doc(currentUID);
    const snapshot = await usersRef.get();
    if (!snapshot.exists) {
        console.log("User data not found in firebase");

        const data = {
            Username: "John Doe",
            Password: "abc123",
            Email: currentUser.getEmail(),
            UID: currentUID,
            Paypal: null,
            Permissions: "base",
            ColorTheme: "Default",
            TextSize: "Medium"
        };

        const res = await db.collection('Users').doc(currentUID).set(data);

    } else {
        console.log("User data found: ", snapshot.data());
    }
}



