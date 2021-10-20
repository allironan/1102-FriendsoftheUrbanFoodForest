import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

//Function to make new event
export async function makeNewEvent(title, information, startTime, endTime, programID) {

    const db = firebase.firestore();

    const newParticipants = new Map();
    
    var eventID = await getNextEvent()

    const data = {
        Title: title,
        Information: information,
        Participants: newParticipants,
        StartTime: startTime,
        EndTime: endTime,
        ProgramID: programID,
        EventID: eventID.NextEventID
    };

    const res = await db.collection('Events').doc(eventID.NextEventID.toString()).set(data);

    return data;

}

//Function to get next event in database
async function getNextEvent() {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;

    const countRef = db.collection('Counters').doc('Event Count');
    const snapshot = await countRef.get();

    if (!snapshot.exists) {
        console.log("Event Count not found in firebase");

        const data = {
            NextEventID: 1,
        };

        const res = db.collection('Counters').doc('Event Count').set(data);

        const count = await countRef.get();
        return count.data();

    } else {
        //console.log("Event Count found: ", snapshot.data());

        // Andrew: If this is done by incrementing by one on our end, it will occur atomically.
        // Multiple events, Events, etc. may end up having the same ID. Firebase has an API increment
        // call that works atomically for this purpose.

        const res = db.collection('Counters').doc('Event Count');
        const increment = firebase.firestore.FieldValue.increment(1);
        await res.update({NextEventID: increment})
        const count = await countRef.get();
        return count.data();
    }
}

//Function to get all events in database
export async function getEvents() {
    // Andrew: I would like to change this function so that rather than looping and querying each
    // individually, we would query all from desired doc/collection at once.
    const db = firebase.firestore();

    const countRef = db.collection('Counters').doc('Event Count');
    const snapshot = await countRef.get();
    if (!snapshot.exists) {
        console.log("No events in firebase");

        return null;
    } else {
        // Attempt 1
        const eventArray = [];
        for (let i = 0; i <= snapshot.data().NextEventID; i++) {
            const usersRef = db.collection('Events').doc(i.toString());
            const snapshot = await usersRef.get();
            if (snapshot.exists) {
                //console.log("Item data found: ", snapshot.data());
                eventArray.push(snapshot.data());
            }
        }
        
        return eventArray;
    }
}

//Function to edit events
export async function editEvent(eventToSet, eventID) {

    const db = firebase.firestore();

    const res = await db.collection('Events').doc(eventID.toString()).set(eventToSet);

}

//Function to delete events
export async function deleteEvent(eventID) {
    const db = firebase.firestore();
    const res = await db.collection('Events').doc(eventID.toString()).delete();
    // // if we want to add/subtract each time
    // const countRef = db.collection('Events').doc('Event Count');
    // const snapshot = await countRef.get();
    // const value = snapshot.data().NextEventID + 1;
    // const data = {
    //     NextEventID: value
    // }
    // const res2 = db.collection('Events').doc('Event Count').set(data);
}

export async function addParticipant(eventID, userID){

    const db = firebase.firestore();

    const eventsRef = db.collection('Events').doc(eventID);
    const snapshot = await eventsRef.get();
    const eventData = snapshot.data();
    const participantMap = eventData.Participants();
    participantMap.set(userID, true);
    const res = await eventsRef.update({Participants: participantMap});

}

export async function removeParticipant(eventID, userID){

    const db = firebase.firestore();

    const eventsRef = db.collection('Events').doc(eventID);
    const snapshot = await eventsRef.get();
    const eventData = snapshot.data();
    const participantMap = eventData.Participants();
    participantMap.delete(userID);
    const res = await eventsRef.update({Participants: participantMap});
}