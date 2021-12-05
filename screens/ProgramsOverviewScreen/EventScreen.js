import React, { Children } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import {makeNewEvent, getEvents, deleteEvent, addParticipant, removeParticipant} from '../../Components/EventComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../styles/ProgramsEventsScreen.style.js'


export default class EventScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
    }

    firestoreRefEvents = firebase.firestore().collection('Events')

    currentView() {
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
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.unsubscribe = this.firestoreRefEvents.onSnapshot(this.getCollectionEvents)
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