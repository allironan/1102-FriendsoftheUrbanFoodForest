import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

//Function to make new Cart
export async function makeNewCart() {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const data = {
        Contents: {}
    };

    const res = await db.collection('UserCart').doc(currentUID).set(data);

    return data;

}


//Function to get User Cart
export async function getUserCart() {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const res = await db.collection('UserCart').doc(currentUID);
    const snapshot = await res.get();

    if (!snapshot.exists) {
        console.log("Cart not found in database");

        makeNewCart();
        
        const res = await db.collection('UserCart').doc(currentUID);

        const newData = await res.get();
        return newData;
    } else {
        
        return snapshot.data;
    }
}

//Function to edit User Cart
export async function addToCart(itemID) {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;
    var res = await db.collection('UserCart').doc(currentUID);
    const contents = await res.get();

    var contentsD = contents.get("Contents");

    if (itemID in contentsD) {
        contentsD[itemID] += 1;
    } else {
        contentsD[itemID] = 1;
    }

    const data = {
        Contents: contentsD
    };
    
    var res = db.collection('UserCart').doc(currentUID).set(data);

    const cart = await countRef.get();
    return cart.data();

}

//Function to delete User Cart
export async function removeFromCart(itemID) {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    var res = await db.collection('UserCart').doc(currentUID);

    const contents = await res.get();

    var contentsD = contents.get("Contents");

    if (itemID in contentsD) {
        quantity = contentsD[itemID] - 1
        if (quantity = 0) {
            delete contentsD[itemID];
        } else {
            contentsD[itemID] = quantity;
        }
        
    } else {
        console.log("User attempted to remove an item from their cart that should not exist")
    }

    const data = {
        Contents: contentsD
    };

    const res = db.collection('UserCart').doc(currentUID).set(data);

    const cart = await countRef.get();
    return cart.data();
}