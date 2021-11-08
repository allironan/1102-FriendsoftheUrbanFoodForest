import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

export async function makeNewTool(name, quantity, available) {

    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    var toolID = name.toLowerCase();
    toolID = toolID.replace(/ /g, '')
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
    //figure out here if theres anyway to change the actual doc or do i need to delete it and make a new one
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

//get tools name for checkout 
//this is actually just get avaailable tools rn
export async function getToolNames() {
    const db = firebase.firestore();

    const countRef = db.collection('ToolsRental');
    console.log("count ref works");
    const snapshot = await countRef.get();
    console.log("snapshot works");
    console.log(snapshot);
    if (!snapshot.exists) {
        console.log("No tools in firebase");
        return null;
    } else {
        // Attempt 4
        const toolArray = [];
        for (i = 0; i < snapshot.size(); i++) {
            if (snapshot[i].Available) {
                toolArray.push(snapshot[i]);
            }
        }
        console.log("The array of posts is below: ");
        console.log(toolArray);

        return toolArray;
    }
}

//checkout new tool (fully functional)
export async function checkoutTool(toolName, number) {

    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    console.log(toolName);
    var toolID = toolName.toLowerCase();
    console.log(toolID);
    //might need to remove spaces here
    toolID = toolID + number.toString();
    console.log(toolID);
    const countRef = db.collection('CheckedOutTool').doc(toolID);
    const snapshot = await countRef.get();

    const data = {
        UID: currentUID,
        Tool: toolName,
        Number: number,
        CheckoutID: toolID
    };
    if (snapshot.exists) {
        console.log("Tool already exists in firebase");
    } else {
        const res = await db.collection('CheckedOutTool').doc(toolID.toString()).set(data);
    }
    return data;
}