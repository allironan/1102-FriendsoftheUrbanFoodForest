import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

//Function to make new posts
export async function makeNewItem(name, description, price) {

    const db = firebase.firestore();

    var itemID = await getNextItem();

    const data = {
        Name: name,
        Description: description,
        Price: price,
        ItemID: itemID.NextItemID
    };

    const res = await db.collection('StoreGoods').doc(itemID.NextItemID.toString()).set(data);
    return data;
}

// Function to get next post in database
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

//Function to get all posts in database
export async function getItems() {
    const db = firebase.firestore();

    const countRef = db.collection('Counters').doc('Store Item Count');
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
    }
}

export async function editItem(name, description, price, itemID) {

    const db = firebase.firestore();

    const itemToSet = {
        Name: name,
        Description: description,
        Price: price,
        ItemID: itemID
    };

    const res = await db.collection('StoreGoods').doc(itemID.toString()).set(itemToSet);
}

//Function to delete posts
export async function deleteItem(itemID) {
    const db = firebase.firestore();
    const res = await db.collection('StoreGoods').doc(itemID.toString()).delete();

    // // if we want to add/subtract each time
    // const countRef = db.collection('StoreGoods').doc('Store Item Count');
    // const snapshot = await countRef.get();
    // const value = snapshot.data().NextItemID + 1;
    // const data = {
    //     NextItemID: value
    // }
    // const res2 = db.collection('StoreGoods').doc('Store Item Count').set(data);
}