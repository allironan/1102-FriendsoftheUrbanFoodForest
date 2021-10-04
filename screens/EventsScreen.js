import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../Components/UserDataComponents'
import {makeNewEvent, getEvents, deleteEvent, addParticipant, removeParticipant} from '../Components/EventComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles/EventsScreen.style.js'


export default class EventsScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        events: []
    }

    currentView() {
        // console.log(this.state.events);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.programFrame}>
                        <Text style= {styles.programTitle}> Programs Test </Text>
                    </View>
                    <TouchableOpacity onPress={this.createEventPressed} style={styles.addEventButton}>
                        <Text> Add Event </Text>
                    </TouchableOpacity>
                    <View>
                        {this.state.events.map(r => <DisplayEvent key={r.EventID} EventID={r.EventID} Title={r.Title} Information={r.Information} StartTime={r.StartTime} EndTime={r.EndTime} />)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        getEvents().then((userData) => {
            // console.log(userData);
            const events = userData;
            this.setState({events})
        });
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
        var startDateTime = new Date(this.props.StartTime.toDate());
        // console.log(startDateTime);
        var endDateTime = new Date(this.props.EndTime.toDate());
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

function deletePostLocal(postID){
}