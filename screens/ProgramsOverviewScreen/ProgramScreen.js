import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../Components/UserDataComponents'
import {makeNewEvent, getEvents, deleteEvent, addParticipant, removeParticipant} from '../Components/EventComponents'
import { deleteProgram } from '../Components/ProgramComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles/ProgramsEventsScreen.style.js'


export default class ProgramScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        events: []
    }

    firestoreRefEvents = firebase.firestore().collection('Events')

    currentView() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Button style={styles.goBackButton} title="Back to Programs" onPress={() => this.props.navigation.goBack()} />

                    <View style={styles.programFrame}>
                        <Text style={styles.programTitle}> {this.props.route.params.title} </Text>
                        <Text style={styles.programInformation}> {this.props.route.params.information} </Text>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProgram", {
                            title: this.props.route.params.title,
                            information: this.props.route.params.information,
                            ProgramID: this.props.route.params.ProgramID
                        })}> 
                        <Text> Edit Program </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteProgramLocal(this.props.route.params.ProgramID)}> 
                        <Text> Delete Program </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.props.navigation.navigate("AddEvent")} style={styles.addEventButton}>
                        <Text> Add Event </Text>
                    </TouchableOpacity>

                    <View>
                        {this.state.events.map((event) => (
                            <TouchableOpacity key={event.ProgramID} onPress={() => this.props.navigation.navigate("EventInstance", {
                                key: event.EventID,
                                title: event.Title,
                                information: event.Information,
                                EventID: event.EventID
                            })}> 
                                <DisplayEvent key={event.EventID} EventID={event.EventID} Title={event.Title} Information={event.Information} StartTime={event.StartTime.toDate().toLocaleDateString("en-US")} EndTime={event.EndTime.toDate().toLocaleDateString("en-US")} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        this.unsubscribe = this.firestoreRefEvents.onSnapshot(this.getCollectionEvents)
    }

    componentWillUnmount(){
        this.unsubscribe
    }

    getCollectionEvents = (querySnapshot) => {
        const events = []
        querySnapshot.forEach((event) => {
            events.push(event.data())
        })
        this.setState({events})
    }

    render() { 
        return this.currentView()
    }

    createEventPressed = () => {
        //const newData = makeNewEvent();
        //ReactDOM.render(<DisplayEvent PostID={newData.PostID} Title={newData.Title} Date={newData.Date} Contents={newData.Contents} />, document.getElementById('root'))
        //code for get posts
    }
}

class DisplayEvent extends React.Component {
    render () {
        var startDateTime = new Date(this.props.StartTime);
        // console.log(startDateTime);
        var endDateTime = new Date(this.props.EndTime);
        // console.log(endDateTime);
        var monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return (
        <View style={styles.eventFrame} key={this.props.EventID}>
            <Text style={styles.eventTitle}>{this.props.Title}</Text>
            <Text style={styles.eventInformation}>{this.props.Information}</Text>
            <Text style={styles.eventStartTime}> {
                "StartTime: " + startDateTime.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + ":" + startDateTime.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + ":" + startDateTime.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + " on " + monthsList[startDateTime.getMonth()] 
                + " " + startDateTime.getDate() 
                + ", " + startDateTime.getFullYear()
            }
            </Text>
            <Text style={styles.eventEndTime}>{
                "EndTime: " + endDateTime.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + ":" + endDateTime.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + ":" + endDateTime.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + " on " + monthsList[endDateTime.getMonth()] 
                + " " + endDateTime.getDate() 
                + ", " + endDateTime.getFullYear()
            }
            </Text>
        </View>
        );
    }
}

function deleteProgramLocal(postID){
    deleteProgram(postID);
    //this.props.navigation.goBack()
    //onPress={() => deleteProgram(this.props.route.params.ProgramID)}
}