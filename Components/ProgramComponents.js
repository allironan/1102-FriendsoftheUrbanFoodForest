import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

//Function to make new program
export async function makeNewProgram(title, information) {

    const db = firebase.firestore();

    const linkedEvents = {};//new Map();
    var programID = await getNextProgram();
    const data = {
        Title: title,
        Information: information,
        LinkedEvents: linkedEvents,
        ProgramID: programID.NextProgramID,
    };

    const res = await db.collection('Programs').doc(programID.NextProgramID.toString()).set(data);

    return data;

}

//Function to get next program in database
async function getNextProgram() {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;

    const countRef = db.collection('Counters').doc('Program Count');
    const snapshot = await countRef.get();

    if (!snapshot.exists) {
        console.log("Program Count not found in firebase");

        const data = {
            NextProgramID: 1,
        };

        const res = db.collection('Counters').doc('Program Count').set(data);

        const count = await countRef.get();
        return count.data();

    } else {
        //console.log("Program Count found: ", snapshot.data());

        // Will: If this is done by incrementing by one on our end, it will occur atomically.
        // Multiple programs, Programs, etc. may end up having the same ID. Firebase has an API increment
        // call that works atomically for this purpose.

        const res = db.collection('Counters').doc('Program Count');
        const increment = firebase.firestore.FieldValue.increment(1);
        await res.update({NextProgramID: increment})
        const count = await countRef.get();
        return count.data();
    }
}

//Function to get all events in database
export async function getPrograms() {
    // Andrew: I would like to change this function so that rather than looping and querying each
    // individually, we would query all from desired doc/collection at once.
    const db = firebase.firestore();

    const countRef = db.collection('Counters').doc('Program Count');
    const snapshot = await countRef.get();
    if (!snapshot.exists) {
        console.log("No events in firebase");

        return null;
    } else {
        // Attempt 1
        const programArray = [];
        for (let i = 0; i <= snapshot.data().NextProgramID; i++) {
            const usersRef = db.collection('Programs').doc(i.toString());
            const snapshot = await usersRef.get();
            if (snapshot.exists) {
                //console.log("Item data found: ", snapshot.data());
                programArray.push(snapshot.data());
            }
        }
        // console.log("The array of programs is below: ");
        console.log(programArray);

        // // Attempt 2
        // const usersRef = await db.collection('Programs').get();
        // const programArray = [];
        // if (usersRef.exists) {
        //     //console.log("Item data found: ", snapshot.data());
        //     usersRef.forEach((program) => {
        //         programArray.push(program);
        //     })
        // }
        // console.log("The array of programs is below: ");
        // console.log(programArray);

        return programArray;
    }
}

//Function to edit events
export async function editProgram(title, information, programID) {

    const db = firebase.firestore();
    const linkedEvents = {};
    const programToSet = {
        Title: title,
        Information: information,
        LinkedEvents: linkedEvents,
        ProgramID: programID,
    };

    const res = await db.collection('Programs').doc(programID.toString()).set(programToSet);

}

//Function to delete events
export async function deleteProgram(programID) {
    const db = firebase.firestore();
    const res = await db.collection('Programs').doc(programID.toString()).delete();
    //if we want to add/subtract each time
    // const countRef = db.collection('Programs').doc('Program Count');
    // const snapshot = await countRef.get();
    // const value = snapshot.data().NextProgramID + 1;
    // const data = {
    //     NextProgramID: value
    // }
    // const res2 = db.collection('Programs').doc('Program Count').set(data);
}

export async function linkEventToProgram(programID, eventID) {
    const db = firebase.firestore();

    const programsRef = db.collection('Programs').doc(programID);
    const snapshot = await programsRef.get();
    const programData = snapshot.data();
    const linkedEventsMap = programData.LinkedEvents();
    
    if(linkedEventsMap.has(programID)) {
        const eventArray = linkedEventsMap.get(programID);
        eventArray.push(eventID);
        linkedEventsMap.set(programID, eventArray);
    } else {
        const eventArray = [eventID];
        linkedEventsMap.set(programID, eventArray);
    }
}

export async function unLinkEventFromProgram(programID, eventID) {
    const db = firebase.firestore();

    const programsRef = db.collection('Programs').doc(programID);
    const snapshot = await programsRef.get();
    const programData = snapshot.data();
    const linkedEventsMap = programData.LinkedEvents();
    
    const eventArray = linkedEventsMap.get(programID);
    const indexToBeRemoved = eventArray.indexOf(eventID);
    if(indexToBeRemoved > -1) {
        eventArray.splice(indexToBeRemoved, 1);
    }
    linkedEventsMap.set(programID, eventArray);
}