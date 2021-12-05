import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../../Components/UserDataComponents'
import {makeNewPost, getPosts, deletePost} from '../../Components/PostComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../styles/InventoryScreens.styles'
import {deleteTool, checkInTool} from '../../Components/InventoryComponents'

export default class AdminToolCheckoutScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        checkedOutTools: []
    }
    firestoreRefCheckedOut = firebase.firestore().collection('CheckedOutTool');

    currentView() {
        if (this.state.checkedOutTools.length != 0) {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.addToolFrame} onPress={() => this.props.navigation.goBack()}>
                        <Text>Go back</Text>
                    </TouchableOpacity>
                    {/* here add an admin only view to a page that has all the tools currently checked out */}
                    <ScrollView>
                        <View style={styles.toolsContainer}>
                                {this.state.checkedOutTools.map(r => this.displayCheckedOutTools(r.Tool, r.Number, r.UserName, r.CheckoutID))}
                        </View>
                    </ScrollView>
                    {/* here add list of tools that are currenly checked out by UID */}
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                        <TouchableOpacity style={styles.addToolFrame} onPress={() => this.props.navigation.goBack()}>
                            <Text>Go back</Text>
                        </TouchableOpacity>
                        <Text>There are no tools currenly checked out.</Text>
                </View>
            )
            
        }
        
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        this.unsubscribe = this.firestoreRefCheckedOut.onSnapshot(this.getCollectionCheckedOut)
    }
    componentWillUnmount() {
        this.unsubscribe
    }
    render() {
        return this.currentView()
    }
    getCollectionCheckedOut = (querySnapshot) => {
        const checkedOutTools = []
        querySnapshot.forEach((tool) => {
            checkedOutTools.push(tool.data())
        })
        this.setState({checkedOutTools})
    }
    updateTools(){
        const tools = []
        db.collection("CheckedOutTool").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if(change.type == 'added'){
                    tools.push(change.data())
                }
            })
        })
        this.setState({checkedOutTools})
    }

    displayCheckedOutTools(tool, number, username, CheckoutID) {
        return (
        <View style={styles.toolFrame}>
            <Text>{tool}</Text>
            <Text>{number}</Text>
            <Text>{username}</Text>
            <TouchableOpacity onPress={() => checkInToolLocal(CheckoutID, tool)}>
                        <Text> Check In Tool </Text>
            </TouchableOpacity>
        </View>
        );
    }
}

function checkInToolLocal(CheckoutID, tool){
    checkInTool(CheckoutID, tool);
}