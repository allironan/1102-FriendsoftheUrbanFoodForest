import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../UserData/getUserData'
import {makeNewEvent, getEvents, deleteEvent, addParticipant, removeParticipant} from '../Components/EventComponents'
import {makeNewProgram, getPrograms, deleteProgram, editProgram} from '../Components/ProgramComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './ProgramsScreen.style.js'
import ProgramComponent from './ProgramsUIComponent';


export default class EventsScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        events: [],
        programs: []
    }

    firestoreRefPrograms = firebase.firestore().collection('Programs')
    firestoreRefEvents = firebase.firestore().collection('Events')
    
    currentView() {
        //console.log(this.state.events);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.programFrame}>
                        <Text style= {styles.programTitle}> Programs Test </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddProgram")} style={styles.addEventButton}>
                        <Text> Add Program </Text>
                    </TouchableOpacity>
                    <View >
                        {this.state.programs.map((program) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("SingularProgram", {
                            key: program.ProgramID,
                            title: program.Title,
                            description: program.Information,
                            ProgramID: program.ProgramID
                        })}> 
                        <ProgramComponent id = {program.ProgramID} title={program.Title} description={program.Information}></ProgramComponent> 
                        </TouchableOpacity>
                        ))
                        }
                    </View>
                    <View>
                        {this.state.events.map(r => <DisplayEvent key={r.EventID} EventID={r.EventID} Title={r.Title} Information={r.Information} StartTime={r.StartTime.toDate().toLocaleDateString("en-US")} EndTime={r.EndTime.toDate().toLocaleDateString("en-US")} />)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser
        getUserData();
        this.setState({email, displayName})
        this.unsubscribe = this.firestoreRefPrograms.onSnapshot(this.getCollectionPrograms)
        this.unsubscribeAgain = this.firestoreRefEvents.onSnapshot(this.getCollectionEvents)
        console.log(this.state.programs)

    }
    
    componentWillUnmount(){
        this.unsubscribe
        this.unsubscribeAgain
    }

    getCollectionPrograms = (querySnapshot) => {
        const programs = []
        querySnapshot.forEach((program) => {
            programs.push(program.data())
        })
        this.setState({programs})
    }
    getCollectionEvents = (querySnapshot) => {
        const events = []
        querySnapshot.forEach((event) => {
            events.push(event.data())
        })
        console.log(events)
        this.setState({events})
    
    }

    updatePosts(){
        const posts = []
        db.collection("Programs").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if(change.type == 'added'){
                    posts.push(change.data())
                }
            })
        })
        this.setState({posts})
    }

    render() {
        return this.currentView()
    }
}

class DisplayEvent extends React.Component {
    render () {
        return (
        <View style={styles.eventFrame} key={this.props.EventID}>
            <Text style={styles.eventTitle}>{this.props.Title}</Text>
            <Text style={styles.eventInformation}>{this.props.Information}</Text>
            <Text style={styles.eventStartTime}>{this.props.StartTime}</Text>
            <Text style={styles.eventEndTime}>{this.props.EndTime}</Text>
        </View>
        );
    }
}

function deletePostLocal(postID){
}