import React, { Children } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import {makeNewEvent, getEvents, deleteEvent, addEventParticipant, removeEventParticipant, getIfEventParticipant} from '../../Components/EventComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../styles/ProgramsEventsScreen.style.js'


export default class EventScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        message: "",
        attending: false,
        admin: false,
        attendees: []
    }

    firestoreRefEvents = firebase.firestore().collection('Events')
    firestoreRefAttending = firebase.firestore().collection('Events').doc(String(this.props.route.params.EventID))

    currentView() {
        if (this.state.admin) {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.goBackLabel}> Back to Program </Text>
                        </TouchableOpacity>
    
                        <View style={styles.programFrame}>
                            <Text style={styles.programTitle}> {this.props.route.params.title} </Text>
                            <Text style={styles.programInformation}> {this.props.route.params.description} </Text>
                        </View>
                        <TouchableOpacity style={styles.leftButton} onPress={() => this.props.navigation.navigate("EditEventScreen", {
                                title: this.props.route.params.title,
                                description: this.props.route.params.description,
                                EventID: this.props.route.params.EventID
                            })}> 
                            <Text> Edit Event </Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity style={styles.leftButton} onPress={() => deleteEventLocal(this.props.route.params.EventID)}> 
                            <Text> Delete Event </Text>
                        </TouchableOpacity>
                        <Text style={styles.programTitle}>
                            Attending Users
                        </Text>
                        <View style={styles.toolsContainer}>
                                {this.state.attendees.map(r => this.displayAttendees(r))}
                        </View>
                    </ScrollView>
                </View>
            );
        } else if (this.state.attending == false) {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.goBackLabel}> Back to Program </Text>
                        </TouchableOpacity>
    
                        <View style={styles.programFrame}>
                            <Text style={styles.programTitle}> {this.props.route.params.title} </Text>
                            <Text style={styles.programInformation}> {this.props.route.params.description} </Text>
                        </View>
                        <TouchableOpacity style={styles.goBackButton} onPress={() => {addEventParticipant(String(this.props.route.params.EventID)); this.setState({message: "You've registered for the event!"})}}>
                            <Text style={styles.goBackLabel}> Register For Event </Text>
                        </TouchableOpacity>
                        <Text>{this.state.message}</Text>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.goBackLabel}> Back to Program </Text>
                        </TouchableOpacity>
    
                        <View style={styles.programFrame}>
                            <Text style={styles.programTitle}> {this.props.route.params.title} </Text>
                            <Text style={styles.programInformation}> {this.props.route.params.description} </Text>
                        </View>
                        <TouchableOpacity style={styles.goBackButton} onPress={() => {removeEventParticipant(String(this.props.route.params.EventID), firebase.default.auth().currentUser.uid); this.setState({message: "You've unregistered for the event."})}}>
                            <Text style={styles.goBackLabel}> Unregister For Event </Text>
                        </TouchableOpacity>
                        <Text>{((this.state.message))}</Text>
                    </ScrollView>
                </View>
            );
        }
        
    }

    deleteEventLocal() {
        deleteEvent(this.props.route.params.EventID, this.props.route.params.programID);
        this.props.navigation.goBack();
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.unsubscribe = this.firestoreRefEvents.onSnapshot(this.getCollectionEvents)
        this.unsubscribe = this.firestoreRefAttending.onSnapshot(this.getAttendance)
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
    getAttendance = (querySnapshot) => {
        const attendees = []
        var attending = false;
        querySnapshot.data().Participants.forEach((person) => {
            attendees.push(person)
        })
        if (querySnapshot.data().Participants.includes(firebase.default.auth().currentUser.uid)){
            attending = true;
        }
        this.setState({attendees})
        this.setState({attending})
    }
   
    render() { 
        return this.currentView()
    }

    displayAttendees(name) {
            return (
                <Text>{name}</Text>
            );
    }
}

class DisplayEvent extends React.Component {
    render () {
        var startDateTime = new Date(this.props.StartTime);
        // console.log(startDateTime);
        var endDateTime = new Date(this.props.EndTime);
        // console.log(endDateTime);
        return (
        <View style={styles.eventFrame} key={this.props.EventID}>
            <Text style={styles.eventTitle}>{this.props.Title}</Text>
            <Text style={styles.eventInformation}>{this.props.Information}</Text>
            <Text style={styles.eventStartTime}>{startDateTime.getDate()}</Text>
            <Text style={styles.eventEndTime}>{endDateTime.getDate()}</Text>
        </View>
        );
    }
}