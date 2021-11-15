import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';
import './ImageComponents'
import { deleteImage, selectImage, uploadImage } from './ImageComponents';

//Function to make new item
export async function makeNewItem(name, description, price) {

    const db = firebase.firestore();

    var itemID = await getNextItem();

    const data = {
        Name: name,
        Description: description,
        Price: price,
        ItemID: itemID.NextItemID,
    };

    const res = await db.collection('StoreGoods').doc(itemID.NextItemID.toString()).set(data);
    return data;
}

// Function to get next item in database
async function getNextItem() {

    const db = firebase.firestore();

    const countRef = db.collection('Counters').doc('Store Item Count');
    const snapshot = await countRef.get();

    if (!snapshot.exists) {
        console.log("Store Item Count not found in firebase");

        const data = {
            NextPostID: 1,
        };

        const res = db.collection('Counters').doc('Store Item Count').set(data);
        const count = await countRef.get();
        return count.data();

    } else {
        const res = db.collection('Counters').doc('Store Item Count');
        const increment = firebase.firestore.FieldValue.increment(1);
        //const count = res.update("NextItemID", admin.firestore.FieldValue.increment(1));
        await res.update({NextItemID: increment})
        const count = await countRef.get();
        return count.data();
    }
}

//Function to get all items in database
export async function getItems() {
    const db = firebase.firestore();

    return db.collection('StoreGoods')
    /*const countRef = db.collection('Counters').doc('Store Item Count');
    const snapshot = await countRef.get();
    if (!snapshot.exists) {
        console.log("No items in firebase");
        return null;
    } else {
        // Attempt 4
        const itemArray = [];
        console.log("The array of items is below: ");
        console.log(itemArray);

        return itemArray;
    }*/
}

export async function editItem(name, description, price, itemID) {

    const db = firebase.firestore();

    const itemToSet = {
        Name: name,
        Description: description,
        Price: price,
        ItemID: itemID,
    };

    const res = await db.collection('StoreGoods').doc(itemID.toString()).set(itemToSet);
}

//Function to delete item
export async function deleteItem(itemID) {
    const db = firebase.firestore();
    const res = await db.collection('StoreGoods').doc(itemID.toString()).delete();
}

export async function editItemImage(itemName) {

    uploadUri = selectImage();

    if (uploadUri == -1) {
        return;
    }

    deleteImage(itemName);
    uploadImage(itemName, uploadUri);
}