import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

/*
 This function works with the Admin: Add Tool button on Inventory Home Screen. It allows an admin to add another tool
 into the Firebase collection, which will display on the list of tools the organization owns.
 
    Args:
        Name: name of the tool, ex: Shovel
        Quantity: quantity of that tool owned by the organization
        Available: Boolean representing if this tool is currently available to volunteers, or can only be seen by admins.
*/


export async function makeNewTool(name, quantity, available) {

    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    name = name.trim()
    var toolID = name.toLowerCase();
    toolID = toolID.replace(/ /g, '')
    const countRef = db.collection('ToolsRental').doc(toolID);
    const snapshot = await countRef.get();

    const data = {
        Author: currentUID,
        Name: name,
        ToolID: toolID,
        Available: available,
        Quantity: quantity,
        CheckedOut: "0"
    };
    if (snapshot.exists) {
        console.log("Tool already exists in firebase");
    } else {
        const res = await db.collection('ToolsRental').doc(toolID.toString()).set(data);
    }
    return data;
}

/*
    Function is used by DeleteTool on EditTool screen. It takes in the toolID and deletes the the item from the collection.
 
    Args:
       toolID: Unique ID for tool Ex: Garden Hose -> gardenhose
 
*/

export async function deleteTool(toolID) {
    const db = firebase.firestore();
    const res = await db.collection('ToolsRental').doc(toolID.toString()).delete();
}

/*
 Function is used by admins on InventoryHomeScreen when interacting with the Edit Tool button. This takes in all the currently
 set values of the tool and upon submit, changes the values in firebase with the new ones submitted by the admin.
 
    Args:
        Quantity: quantity of that tool owned by the organization
        Available: Boolean representing if this tool is currently available to volunteers
        ToolID: Unique ID for tool Ex: Garden Hose -> gardenhose
        Name: name of the tool, ex: Shovel
        CheckedOut: amount of tool currently checked out by volunteers/end users
 
*/

export async function editTool(quantity, available, toolID, name, checkedOut){
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    const db = firebase.firestore();
    const postToSet = {
        Author: currentUID,
        Available: available,
        CheckedOut: checkedOut,
        Quantity: quantity,
        ToolID: toolID,
        Name: name
    };

    const res = await db.collection('ToolsRental').doc(toolID.toString()).set(postToSet);
}

/*
 Function is used by end users and volunteers to checkout a tool they would like to use. It allows a user to check out a
 singular tool, so if users are checking out more than one they must use the function more than once. They provide the toolname
 and the unique number of the tool in the checkout process. This is then added to a collection in Firebase.

    Args:
        toolName: Name of the tool being used. This is chosen from a drop down menu of currently available tools
        number: Unique number of the tool being checked out
        userName: Name of the user checking out the tool, which is provided to admins 
 
*/

export async function checkoutTool(toolName, number, userName) {

    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    var toolID = toolName.toLowerCase();
    toolID = toolID.replace(/ /g, '')
    toolID = toolID + number.toString();
    const countRef = db.collection('CheckedOutTool').doc(toolID);
    const snapshot = await countRef.get();

    const data = {
        UID: currentUID,
        Tool: toolName,
        Number: number,
        CheckoutID: toolID,
        UserName: userName
    };
    if (snapshot.exists) {
        console.log("Tool already exists in firebase");
    } else {
        const res = await db.collection('CheckedOutTool').doc(toolID.toString()).set(data);
    }

    /* This aspect of the function below is to increase the amount of the 
    tool currently checkedout in the ToolsRental collection when one gets checked out*/
    const countRef2 = db.collection('ToolsRental').doc(toolName.toLowerCase().replace(/ /g, ''));
    const snapshot2 = await countRef2.get();
    const dataInitial = snapshot2.data();
    const dataChange = {
            Author: dataInitial.Author,
            CheckedOut: dataInitial.CheckedOut + 1,
            Name: dataInitial.Name,
            Quantity: dataInitial.Quantity,
            Available: dataInitial.Available,
            ToolID: dataInitial.ToolID
        };
    const res2 = await db.collection('ToolsRental').doc(toolName.toLowerCase().replace(/ /g, '')).set(dataChange);

    return data;
}

/*
 Function is used by end users and volunteers to check in a tool they have currently checked out. The tool appears on
 their inventory home page and this process is trigged by hitting the check in button. This deletes the tool from the
 checked out collection in Firebase.
 
    Args:
        CheckoutID: Unique id for the tool that contains the tool name and the number of the tool. Ex: gardenhose2
        tool: tool name used in ToolsRental collection. Ex: gardenhose
*/

export async function checkInTool(CheckoutID, tool){
    const db = firebase.firestore();
    const res = await db.collection('CheckedOutTool').doc(CheckoutID.toString()).delete();
     /* This aspect of the function below is to decrease the amount of the 
    tool currently checkedout in the ToolsRental collection when one gets checked out*/
    var toolID = tool.toLowerCase();
    toolID = toolID.replace(/ /g, '')
    const countRef = db.collection('ToolsRental').doc(toolID);
    const snapshot = await countRef.get();
    const dataInitial = snapshot.data();
    const data = {
        Author: dataInitial.Author,
        CheckedOut: dataInitial.CheckedOut - 1,
        Name: dataInitial.Name,
        Quantity: dataInitial.Quantity,
        Available: dataInitial.Available,
        ToolID: dataInitial.ToolID
    };
    const res2 = await db.collection('ToolsRental').doc(toolID.toString()).set(data);

}