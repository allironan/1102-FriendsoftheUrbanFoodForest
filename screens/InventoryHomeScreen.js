import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../Components/UserDataComponents'
import {makeNewPost, getPosts, deletePost} from '../Components/PostComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles/HomeScreen.style.js'
import {deleteTool, checkInTool} from '../Components/InventoryComponents'



export default class InventoryHomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        tools: [],
        visibleTools: [],
        checkedOutTools: [],
        userCheckedOutTools: [],
        admin: true //to do: make this dynamic
    }
    firestoreRef = firebase.firestore().collection('ToolsRental');
    firestoreRefCheckedOut = firebase.firestore().collection('CheckedOutTool');

    currentView() {
        if (this.state.admin) {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        {/* here add an admin only view to a page that has all the tools currently checked out */}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("AdminToolCheckoutScreen")} style= {styles.button}>
                                <Text style= {styles.buttonLabel}> Admin: See checked out tools </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("AddTool")} style={styles.addPostButton}>
                                <Text> Admin Add Tool </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("CheckoutTool")} style={styles.addPostButton}>
                                <Text> Checkout Tool </Text>
                        </TouchableOpacity>
                        {/* here add list of tools that are currenly checked out by UID */}
                        <View>
                            <Text>Your checked out tools:</Text>
                            {this.state.userCheckedOutTools.map(r => this.displayUserCheckedOutTools(r.Tool, r.Number, r.CheckoutID))}
                        </View>
                        <View>
                                {this.state.tools.map(r => this.displayTools(r.Name, r.Quantity, r.ToolID, r.Available, r.CheckedOut))}
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("CheckoutTool")} style={styles.addPostButton}>
                                <Text> Checkout Tool </Text>
                        </TouchableOpacity>
                        {/* here add list of tools that are currenly checked out by UID */}
                        <View>
                            <Text>Your checked out tools:</Text>
                            {this.state.userCheckedOutTools.map(r => this.displayUserCheckedOutTools(r.Tool, r.Number, r.CheckoutID))}
                        </View>
                        <View>
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
            return (
                <View>
                    <Text style={styles.postTitle}>{name}</Text>
                    <Text style={styles.postTitle}>Quantity: {quantity}</Text>
                    <Text style={styles.postTitle}>Amount Available: {parseInt(quantity) - checkedOut}</Text>
                    <TouchableOpacity style={styles.leftButton} onPress={() => this.props.navigation.navigate("EditTool", {
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
}
    displayUserCheckedOutTools(tool, number, CheckoutID){
        return (
            <View style={styles.postFrame}>
                <Text style={styles.postTitle}>{tool}</Text>
                <Text style={styles.postTitle}>{number}</Text>
                <TouchableOpacity onPress={() => checkInToolLocal(CheckoutID, tool)}>
                        <Text style={styles.postFeatureLabel}> Check In Tool </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
function checkInToolLocal(CheckoutID, tool){
    checkInTool(CheckoutID, tool);
}