import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

//Function to make new survey
export async function makeNewSurvey(title, url) {

    const db = firebase.firestore();

    const data = {
        Title: title,
        URL: url
    };

    const res = await db.collection('Surveys').doc(title).set(data);

    return data;

}


//Function to get all surveys in database
export async function getSurveys() {
    // Andrew: I would like to change this function so that rather than looping and querying each
    // individually, we would query all from desired doc/collection at once.
    const db = firebase.firestore();

    const snapshot = await db.collection('Surveys').get();
    if (!snapshot.exists) {
        console.log("No surveys in firebase");

        return null;
    } else {

        const surveyArray = [];
        usersRef.forEach((survey) => {
            surveyArray.push(survey);
        })
        
        console.log(surveyArray);
        return surveyArray;
    }
}

//Function to edit survey
export async function editSurvey(surveyToSet, surveyName) {

    const db = firebase.firestore();

    const res = await db.collection('Surveys').doc(surveyName.toString()).set(surveyToSet);

}

//Function to delete events
export async function deleteEvent(eventID) {
    const db = firebase.firestore();
    const res = await db.collection('Surveys').doc(eventID.toString()).delete();
    //if we want to add/subtract each time
    // const countRef = db.collection('Events').doc('Event Count');
    // const snapshot = await countRef.get();
    // const value = snapshot.data().NextEventID + 1;
    // const data = {
    //     NextEventID: value
    // }
    // const res2 = db.collection('Events').doc('Event Count').set(data);
}