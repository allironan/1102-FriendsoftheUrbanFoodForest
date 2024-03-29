import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../styles/ProgramsEventsScreen.style.js'
import { Ionicons } from '@expo/vector-icons';


export default class ProgramsOverviewScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        events: [],
        programs: []
    }

    firestoreRefPrograms = firebase.firestore().collection('Programs')
    
    currentView() {
        return (
            <View style={styles.container}>
                <Text style= {styles.headerTitle}> Programs </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("AddProgramScreen")} style={styles.rightButton}>
                    <View>
                        <Ionicons name={'add-outline'} size={30} color={'black'}/>
                    </View>
                    <Text style={styles.buttonLabelText}>Add Program </Text>
                </TouchableOpacity>
                <ScrollView>
                    <View>
                        {this.state.programs.map((program) => (
                            <TouchableOpacity key={program.ProgramID} onPress={() => this.props.navigation.navigate("ProgramScreen", {
                                key: program.ProgramID,
                                title: program.Title,
                                information: program.Information,
                                programID: program.ProgramID
                            })}> 
                                <ProgramComponent key={program.ProgramID} id = {program.ProgramID} title={program.Title} information={program.Information}></ProgramComponent> 
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

    updatePrograms(){
        const programs = []
        db.collection("Programs").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if(change.type == 'added'){
                    programs.push(change.data())
                }
            })
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
            <View style={styles.programFrame} key={this.props.id}>
                <Text style={styles.programTitle}>{this.props.title}</Text>
                <Text style={styles.programInformation}>{this.props.information}</Text>
            </View>
        );
    }
}