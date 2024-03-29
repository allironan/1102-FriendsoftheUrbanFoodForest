import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import { deleteProgram } from '../../Components/ProgramComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../styles/ProgramsEventsScreen.style.js'
import { deleteAllEvents, getEventInfo } from '../../Components/EventComponents'
import { Ionicons } from '@expo/vector-icons';
import { getUserData } from '../../Components/UserDataComponents'

export default class ProgramScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        events: [],
        admin: false
    }

    firestoreRefEvents = firebase.firestore().collection('Programs').doc(this.props.route.params.programID)


    currentView() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                </TouchableOpacity>
                <View style={styles.viewContainer}>
                    <View style={styles.titleFrame}>
                        <Text style={styles.programTitle}> {this.props.route.params.title} </Text>
                        <Text style={styles.programInformation}> {this.props.route.params.information} </Text>
                    </View>
                    {this.state.admin &&
                    <TouchableOpacity style={styles.leftButton} onPress={() => this.props.navigation.navigate("EditProgramScreen", {
                            Title: this.props.route.params.title,
                            Information: this.props.route.params.information,
                            ProgramID: this.props.route.params.programID
                        })}> 
                        <Text style={styles.buttonLabelText}> Edit Program </Text>
                    </TouchableOpacity>
                    }
                    {this.state.admin &&
                    <TouchableOpacity style={styles.leftButton} onPress={() => {
                        this.deleteProgramLocal(this.props.route.params.programID);
                        }}> 
                        <Text style={styles.buttonLabelText}> Delete Program </Text>
                    </TouchableOpacity>
                    }
                        {this.state.admin &&   <TouchableOpacity style={styles.rightButton} onPress={() => this.props.navigation.navigate("AddEventScreen", {
                            programID: this.props.route.params.programID
                        })}>
                            <View>
                                <Ionicons name={'add-outline'} size={30} color={'black'}/>
                            </View>
                        <Text style={styles.buttonLabelText}> Add Event </Text>
                    </TouchableOpacity>}
                    <ScrollView>
                        <View>
                            {this.state.events.map((event) => (
                                <TouchableOpacity key={event.EventID} onPress={() => this.props.navigation.navigate("EventScreen", {
                                    key: event.EventID,
                                    title: event.Title,
                                    information: event.Information,
                                    EventID: event.EventID,
                                    programID: this.props.route.params.programID
                                })}> 
                                    <DisplayEvent key={event.EventID} EventID={event.EventID} Title={event.Title} Information={event.Information} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    async componentDidMount() {
        var isAdmin = await getUserData();
        var admin = (isAdmin["Permissions"] == "admin")
        this.setState({admin});
        this.unsubscribe = this.firestoreRefEvents.onSnapshot(this.getCollectionEvents)
    }

    componentWillUnmount(){
        this.unsubscribe
       
    }

    getCollectionEvents = (querySnapshot) => {
        
        const events = []
        if (querySnapshot.exists) {
            querySnapshot.data().LinkedEvents.forEach((event) => {
                events.push(event)
            })
            this.setState({events}) 
            console.log(this.state)
        }
   
     
    }

    async deleteProgramLocal(programID){
        //const db = firebase.firestore();
        
        deleteAllEvents(programID, this.state.events)
        deleteProgram(programID);
        this.props.navigation.goBack();
        
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
        // var startDateTime = new Date(this.props.StartTime);
        // // console.log(startDateTime);
        // var endDateTime = new Date(this.props.EndTime);
        // // console.log(endDateTime);
        // var monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return (
        <View style={styles.eventFrame} key={this.props.EventID}>
            <Text style={styles.eventTitle}>{this.props.Title}</Text>
            <Text style={styles.eventInformation}>{this.props.Information}</Text>
            {/* <Text style={styles.eventStartTime}>{
                "Start Time: " + startDateTime.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + ":" + startDateTime.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + ":" + startDateTime.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + " on " + monthsList[startDateTime.getMonth()] 
                + " " + startDateTime.getDate() 
                + ", " + startDateTime.getFullYear()
            }
            </Text>
            <Text style={styles.eventEndTime}>{
                "End Time: " + endDateTime.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + ":" + endDateTime.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + ":" + endDateTime.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) 
                + " on " + monthsList[endDateTime.getMonth()] 
                + " " + endDateTime.getDate() 
                + ", " + endDateTime.getFullYear()
            }
            </Text> */}
        </View>
        );
    }
}

