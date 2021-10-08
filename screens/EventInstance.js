import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../Components/UserDataComponents'
import {makeNewEvent, getEvents, deleteEvent, addParticipant, removeParticipant} from '../Components/EventComponents'
import deleteProgram from '../Components/ProgramComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles/ProgramsEventsScreen.style.js'


export default class EventInstance extends React.Component {
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
                    <Button style={styles.goBackButton} title="Back to Program" onPress={() => this.props.navigation.goBack()} />

                    <View style={styles.programFrame}>
                        <Text style={styles.programTitle}> {this.props.route.params.title} </Text>
                        <Text style={styles.programInformation}> {this.props.route.params.description} </Text>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditEvent", {
                            title: this.props.route.params.title,
                            description: this.props.route.params.description,
                            EventID: this.props.route.params.EventID
                        })}> 
                        <Text> Edit Event </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteEventLocal(this.props.route.params.EventID)}> 
                        <Text> Delete Event </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
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

function deleteEventLocal(postID){
    //this.props.navigation.goBack()
    //onPress={() => deleteProgram(this.props.route.params.ProgramID)}
}