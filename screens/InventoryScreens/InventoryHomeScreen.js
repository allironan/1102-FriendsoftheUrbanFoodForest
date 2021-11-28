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



export default class InventoryHomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        tools: [],
        visibleTools: [],
        checkedOutTools: [],
        userCheckedOutTools: [],
        admin: true 
    }
    firestoreRef = firebase.firestore().collection('ToolsRental');
    firestoreRefCheckedOut = firebase.firestore().collection('CheckedOutTool');

    currentView() {
        if (this.state.admin) {
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AdminToolCheckoutScreen")} style= {styles.addToolFrame}>
                            <Text> Admin: See checked out tools </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddTool")} style={styles.addToolFrame}>
                            <Text> Admin: Add Tool </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("CheckoutTool")} style={styles.addToolFrame}>
                            <Text> Checkout Tool </Text>
                    </TouchableOpacity>
                    <ScrollView>
                    {/* here add list of tools that are currenly checked out by UID */}
                    <Text style={{textAlign: 'center'}}>Your checked out tools:</Text>
                    <View style={styles.toolsContainer}>
                        {this.state.userCheckedOutTools.map(r => this.displayUserCheckedOutTools(r.Tool, r.Number, r.CheckoutID))}
                    </View>
                    <Text style={{textAlign: 'center'}}>Tools Avaliable:</Text>
                    <View style={styles.toolsContainer}>
                            {this.state.tools.map(r => this.displayTools(r.Name, r.Quantity, r.ToolID, r.Available, r.CheckedOut))}
                    </View>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("CheckoutTool")} style={styles.addToolFrame}>
                            <Text> Checkout Tool </Text>
                    </TouchableOpacity>
                    <ScrollView>
                        {/* here add list of tools that are currenly checked out by UID */}
                        <Text style={{textAlign: 'center'}}>Your checked out tools:</Text>
                        <View style={styles.toolsContainer}>
                            {this.state.userCheckedOutTools.map(r => this.displayUserCheckedOutTools(r.Tool, r.Number, r.CheckoutID))}
                        </View>
                        <Text style={{textAlign: 'center'}}>Tools Avaliable:</Text>
                        <View style={styles.toolsContainer}>
                                {this.state.visibleTools.map(r => this.displayTools(r.Name, r.Quantity, r.ToolID, r.Available, r.CheckedOut))}
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollectionToolsRental)
        this.unsubscribe = this.firestoreRefCheckedOut.onSnapshot(this.getCollectionCheckedOut)
    }
    componentWillUnmount() {
        this.unsubscribe
    }
    render() {
        return this.currentView()
    }
    getCollectionToolsRental = (querySnapshot) => {
        const tools = []
        const visibleTools = []
        querySnapshot.forEach((tool) => {
            tools.push(tool.data())
            if (tool.data().Available){
                visibleTools.push(tool.data())
            }
        })
        this.setState({tools})
        this.setState({visibleTools})
    }
    getCollectionCheckedOut = (querySnapshot) => {
        const checkedOutTools = []
        const userCheckedOutTools = [];
        querySnapshot.forEach((tool) => {
            checkedOutTools.push(tool.data())
            if (tool.UID == firebase.default.auth().currentUser.UID){
                userCheckedOutTools.push(tool.data());
            }
        })
        this.setState({checkedOutTools})
        this.setState({userCheckedOutTools})
    }
    updateTools(){
        const tools = []
        const visibleTools = []
        db.collection("ToolsRental").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if(change.type == 'added'){
                    tools.push(change.data())
                    if (change.data().Available){
                        visibleTools.push(change.data())
                    }
                }
            })
        })
        this.setState({tools})
        this.setState({visibleTools})
    }
    updateCheckedOutTools(){
        const tools = []
        db.collection("CheckedOutTool").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if(change.type == 'added'){
                    tools.push(change.data())
                }
                //to do: add update for user ones?
            })
        })
        this.setState({tools})
    }
    
    displayTools(name, quantity, toolID, Available, checkedOut) {
        if (this.state.admin){
            return (
                <View style={styles.toolFrame}>
                    <Text>{name}</Text>
                    <Text>Quantity: {quantity}</Text>
                    <Text>Amount Available: {parseInt(quantity) - checkedOut}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditTool", {
                                    name: name,
                                    quantity: quantity,
                                    toolID: toolID,
                                    Available: Available,
                                    checkedOut: checkedOut
                                })}> 
                            <Text> Edit Tool </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.toolFrame}>
                    <Text>{name}</Text>
                    <Text>Quantity: {quantity}</Text>
                    <Text>Amount Available: {parseInt(quantity) - checkedOut}</Text>
                </View>
            );
        }
}

    displayUserCheckedOutTools(tool, number, CheckoutID){
        return (
            <View style={styles.toolFrame}>
                <Text>{tool}</Text>
                <Text>{"ID: " + number}</Text>
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