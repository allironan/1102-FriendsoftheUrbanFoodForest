import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../Components/UserDataComponents'
import {makeNewEvent, getEvents, deleteEvent, addParticipant, removeParticipant} from '../Components/EventComponents'
import {makeNewProgram, getPrograms, deleteProgram, editProgram} from '../Components/ProgramComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles/ProgramsEventsScreen.style.js'


export default class ProgramsScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        programs: []
    }

    firestoreRefPrograms = firebase.firestore().collection('Programs')
    
    currentView() {
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
                        <TouchableOpacity key={program.ProgramID} onPress={() => this.props.navigation.navigate("EventsScreen", {
                            key: program.ProgramID,
                            title: program.Title,
                            description: program.Information,
                            ProgramID: program.ProgramID
                        })}> 
                            <ProgramComponent key={program.ProgramID} id = {program.ProgramID} title={program.Title} description={program.Information}></ProgramComponent> 
                        </TouchableOpacity>
                        ))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        this.unsubscribe = this.firestoreRefPrograms.onSnapshot(this.getCollectionPrograms)
    }
    
    componentWillUnmount(){
        this.unsubscribe
    }

    getCollectionPrograms = (querySnapshot) => {
        const programs = []
        querySnapshot.forEach((program) => {
            programs.push(program.data())
        })
        this.setState({programs})
    }

    render() {
        return this.currentView()
    }
}

class ProgramComponent extends React.Component  {
    render () {
        return (
            <View style={styles.eventFrame} key={this.props.id}>
                <Text style={styles.eventTitle}>{this.props.title}</Text>
                <Text style={styles.eventInformation}>{this.props.description}</Text>
            </View>
        );
    }
}