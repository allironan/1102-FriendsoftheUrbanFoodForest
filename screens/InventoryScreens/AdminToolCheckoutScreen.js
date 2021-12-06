import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../../Components/UserDataComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../styles/InventoryScreens.styles'
import {checkInTool} from '../../Components/InventoryComponents'
import { Ionicons } from '@expo/vector-icons';

export default class AdminToolCheckoutScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        checkedOutTools: []
    }
    firestoreRefCheckedOut = firebase.firestore().collection('CheckedOutTool');

    currentView() {
        if (this.state.checkedOutTools.length > 0) {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
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
                        <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
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
            <Text style={styles.toolName}>{tool}</Text>
            <Text style={styles.toolInfo}>ID: {number}</Text>
            <Text style={styles.toolInfo}>User: {username}</Text>
            <TouchableOpacity style={styles.functionButton}
                onPress={() => checkInToolLocal(CheckoutID, tool)}>
                <Text style={styles.toolInfo}> Check In </Text>
            </TouchableOpacity>
        </View>
        );
    }
}

function checkInToolLocal(CheckoutID, tool){
    checkInTool(CheckoutID, tool);
}