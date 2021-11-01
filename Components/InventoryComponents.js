import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

export async function makeNewTool(name, quantity, available) {

    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    var toolID = await getNextTool()

    const data = {
        Author: currentUID,
        Name: name,
        ToolID: toolID.NextToolID,
        Available: available,
        Quantity: quantity
    };

    const res = await db.collection('ToolsRental').doc(toolID.NextToolID.toString()).set(data);
    return data;
}

async function getNextTool() {

    const db = firebase.firestore();

    const currentUser = firebase.auth().currentUser;
    const countRef = db.collection('Counters').doc('Tool Count');
    const snapshot = await countRef.get();

    if (!snapshot.exists) {
        console.log("Tool Count not found in firebase");

        const data = {
            NextToolID: 1,
        };

        const res = db.collection('Counters').doc('Tool Count').set(data);
        const count = await countRef.get();
        return count.data();

    } else {
        const res = db.collection('Counters').doc('Tool Count');
        const increment = firebase.firestore.FieldValue.increment(1);
        await res.update({NextToolID: increment})
        const count = await countRef.get();
        return count.data();
    }
}

export async function getTools() {
    const db = firebase.firestore();

    const countRef = db.collection('Counters').doc('Tool Count');
    const snapshot = await countRef.get();
    if (!snapshot.exists) {
        console.log("No tools in firebase");
        return null;
    } else {
        // Attempt 4
        const toolArray = [];
        console.log("The array of posts is below: ");
        console.log(toolArray);

        return toolArray;
    }
}

export async function editTool(name, quantity, available, toolID) {

    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const db = firebase.firestore();
    const toolToSet = {
        Author: currentUID,
        Name: name,
        ToolID: toolID,
        Available: available,
        Quantity: quantity
    };

    const res = await db.collection('ToolsRental').doc(toolID.toString()).set(toolToSet);
}

export async function deletePost(toolID) {
    const db = firebase.firestore();
    const res = await db.collection('ToolsRental').doc(toolID.toString()).delete();
}