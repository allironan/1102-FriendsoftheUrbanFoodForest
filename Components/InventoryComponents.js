import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

export async function makeNewTool(name, quantity, available) {

    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    var toolID = name.toLowerCase();
    const countRef = db.collection('ToolsRental').doc(toolID);
    const snapshot = await countRef.get();

    const data = {
        Author: currentUID,
        Name: name,
        ToolID: toolID,
        Available: available,
        Quantity: quantity
    };
    if (snapshot.exists) {
        console.log("Tool already exists in firebase");
    } else {
        const res = await db.collection('ToolsRental').doc(toolID.toString()).set(data);
    }
    return data;
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

    //const res = str.replace(/ /g, '')
    // to take out all strings from string for tool id
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

export async function deleteTool(toolID) {
    const db = firebase.firestore();
    const res = await db.collection('ToolsRental').doc(toolID.toString()).delete();
}