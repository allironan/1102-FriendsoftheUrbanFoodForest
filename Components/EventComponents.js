import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';
import uuid from 'react-native-uuid';
import { deleteProgram } from './ProgramComponents';

//Function to make new event
export async function makeNewEvent(title, information, programID) {

    const db = firebase.firestore();

    const newParticipants = [];
    const ParticipantNames = [];
    var linkedEvents = [];
    console.log(title)
    console.log(information)
    console.log(programID)
    await db.collection('Programs').doc(programID).get().then(query => 
        {  
            linkedEvents = query.data().LinkedEvents
        })
    const data = {
        Title: title,
        Information: information,
        Participants: newParticipants,
        ParticipantNames: ParticipantNames,
        ProgramID: programID,
        EventID: uuid.v4(),
    };
    linkedEvents.push(data)
   
   await db.collection('Programs').doc(programID).update({LinkedEvents: linkedEvents})
   await db.collection('Events').doc(data.EventID).set(data);
   return data;

}

//Function to get next event in database
async function getNextEvent() {

    const db = firebase.firestore();

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
                eventArray.push(snapshot.data());
            }
        }
        
        return eventArray;
    }
}

//Function to edit events
export async function editEvent(title, information, eventID, programID) {
    const db = firebase.firestore();
    var linkedEvents = []
    const newParticipants = [];

    await db.collection('Programs').doc(programID).get().then(query => 
        {
            linkedEvents = query.data().LinkedEvents
        })

    linkedEvents.splice(linkedEvents.findIndex(event => event["EventID"] == eventID), 1)

    const eventToSet = {
        Title: title,
        Information: information,
        Participants: newParticipants,
        ProgramID: programID,
        EventID: eventID
    };

    linkedEvents.push(eventToSet)
   
    await db.collection('Programs').doc(programID).update({LinkedEvents: linkedEvents})
    const res = await db.collection('Events').doc(eventID.toString()).update(eventToSet);

}

//Function to delete events
export async function deleteEvent(eventID, programID, deleteAll = false) {
    const db = firebase.firestore();
    if (!deleteAll) {
        var linkedEvents = []
        await db.collection('Programs').doc(programID).get().then(query => 
            {
                linkedEvents = query.data().LinkedEvents
            })

        linkedEvents.splice(linkedEvents.findIndex(event => event["EventID"] == eventID), 1)
    
        await db.collection('Programs').doc(programID).update({LinkedEvents: linkedEvents})
    }
    
    await db.collection('Events').doc(eventID.toString()).delete();
}

export async function addEventParticipant(eventID){

    const {email, displayName} = firebase.default.auth().currentUser;
    const currentUser = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const eventsRef = db.collection('Events').doc(eventID);
    const snapshot = await eventsRef.get();
    const dataInitial = snapshot.data();
    console.log(snapshot.data())
    var newParticipants = []
    var ParticipantNames = []
    if (dataInitial.Participants.length == 0){
        newParticipants.push(currentUser)
        ParticipantNames.push(displayName)
    } else {
        newParticipants = dataInitial.Participants
        newParticipants.push(currentUser)
        ParticipantNames = dataInitial.ParticipantNames
        ParticipantNames.push(displayName)
    }
    const data = {
        Title: dataInitial.Title,
        Information: dataInitial.Information,
        Participants: newParticipants,
        ParticipantNames: ParticipantNames,
        ProgramID: dataInitial.ProgramID,
        EventID: eventID,
    };
    const res = await db.collection('Events').doc(eventID).set(data);
}

export async function removeEventParticipant(eventID, userID){

    const {email, displayName} = firebase.default.auth().currentUser;
    const currentUser = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const eventsRef = db.collection('Events').doc(eventID);
    const snapshot = await eventsRef.get();
    const dataInitial = snapshot.data();
    var newParticipants = dataInitial.Participants
    var ParticipantNames = dataInitial.ParticipantNames
    var index = newParticipants.indexOf(currentUser);
    if (index > -1) {
        newParticipants.splice(index, 1);
    }
    index = ParticipantNames.indexOf(displayName);
    if (index > -1) {
        ParticipantNames.splice(index, 1);
    }
    const data = {
        Title: dataInitial.Title,
        Information: dataInitial.Information,
        Participants: newParticipants,
        ParticipantNames: ParticipantNames,
        ProgramID: dataInitial.ProgramID,
        EventID: eventID,
    };
    const res = await db.collection('Events').doc(eventID).set(data);
}

//Function to delete events
export async function deleteAllEvents(programID, stateEvents) {

    var linkedEvents = stateEvents
    linkedEvents.forEach((event) => {
                deleteEvent(event["EventID"], programID, deleteAll= true)
    })
    const data = {
        Title: dataInitial.Title,
        Information: dataInitial.Information,
        Participants: newParticipants,
        ProgramID: dataInitial.ProgramID,
        EventID: eventID,
    };
    const res = await db.collection('Events').doc(eventID).set(data);
}