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
        // programs: [
        //     {id: 1, title: "program1", description: "Program 1 description"},
        //     {id: 2, title: "program2", description: "Program 2 description"},
        //     {id: 3, title: "program3", description: "Program 3 description"},
        //     {id: 4, title: "program4", description: "Program 4 description"},
        //     {id: 5, title: "program5", description: "Program 5 description"},
        //     {id: 6, title: "program6", description: "Program 6 description"},
        //     {id: 7, title: "program7", description: "Program 7 description"},
        //     {id: 8, title: "program8", description: "Program 8 description"},
        //   ]
         programs: []
    }
    
    currentView() {
        //console.log(this.state.events);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.programFrame}>
                        <Text style= {styles.programTitle}> Programs </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddProgram")} style={styles.addEventButton}>
                        <Text> Add Program </Text>
                    </TouchableOpacity>
                    <View >
                        {this.state.programs.map((program) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("SingularProgram", {
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
                        {this.state.events.map(r => <DisplayEvent key={r.EventID} EventID={r.EventID} Title={r.Title} Information={r.Information} StartTime={r.Date} EndTime={r.EndTime} />)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser
        getUserData();
        this.setState({email, displayName})
        getPrograms().then((userData) => {
            console.log(userData);
            const programs = userData;
            this.setState({programs})
        });
        console.log(this.state.programs)

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