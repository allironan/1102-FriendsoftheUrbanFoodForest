import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/firestore';

//Function to make new Cart
export async function makeDonation(amount, memo=null) {

    const db = firebase.firestore();
    
    const currentUser = firebase.auth().currentUser;
    const currentUID = currentUser.uid;

    if(memo.equals("")) {
        memo = null;
    }

    var donationID = await getNextDonation()

    const data = {
        Donor: currentUID,
        Amount: amount,
        Memo: memo,
        DonationID: donationID
    };

    const res = await db.collection('Donations').doc(donationID.NextDonationID.toString()).set(data);

    const updatedTotalDonationAmount = ((currentUser.totalDonations) + amount);

    const updatedUserData = {
        Username: currentUser.displayName,
        Email: currentUser.email,
        UID: currentUID,
        TotalDonations: updatedTotalDonationAmount,
        Paypal: currentUser.paypal,
        Permissions: currentUser.permissions,
        ColorTheme: currentUser.colorTheme,
        TextSize: currentUser.textSize
    };

    const res = await db.collection('Users').doc(currentUID).set(updatedUserData);

    return data;

}

// Function to get next post in database
async function getNextDonation() {

    const db = firebase.firestore();

    const countRef = db.collection('Counters').doc('Donation Count');
    const snapshot = await countRef.get();

    if (!snapshot.exists) {
        console.log("Donation Count not found in firebase");

        const data = {
            NextDonationID: 1,
        };

        const res = db.collection('Counters').doc('Donation Count').set(data);
        const count = await countRef.get();
        return count.data();

    } else {
        const res = db.collection('Counters').doc('Donation Count');
        const increment = firebase.firestore.FieldValue.increment(1);
        //const count = res.update("NextDonationID", admin.firestore.FieldValue.increment(1));
        await res.update({NextDonationID: increment})
        const count = await countRef.get();
        return count.data();
    }
}

//Function to get all posts in database
export async function getDonations() {
    const db = firebase.firestore();

    const countRef = db.collection('Counters').doc('Donation Count');
    const snapshot = await countRef.get();
    if (!snapshot.exists) {
        console.log("No donations in firebase");
        return null;
    } else {
        // Attempt 4
        const donationArray = [];
        console.log("The array of donations is below: ");
        console.log(donationArray);

        return donationArray;
    }
}