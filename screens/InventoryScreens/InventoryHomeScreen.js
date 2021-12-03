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
import { SafeAreaView } from 'react-navigation';


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
    //Creates a collection of the available tools to check out
    firestoreRef = firebase.firestore().collection('ToolsRental');
    //Creates a collection of the Checked Out Tools
    firestoreRefCheckedOut = firebase.firestore().collection('CheckedOutTool');

    /*
        Function used to create view object that displays all information, graphics, and components of InventoryHomeScreen
        */
    currentView() {
        // A conditional that checks if the current user is an administrator or not in order to render which Inventory Screen
        if (this.state.admin) {
            return (
                <SafeAreaView style={styles.container}>
                    {/* Creates a Button that navigates the user to AdminToolCheckoutScreen, a list of all checked out tools */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AdminToolCheckoutScreen")} style= {styles.addToolFrame}>
                            <Text> All checked out tools </Text>
                    </TouchableOpacity>

                    {/* Creates a Button that navigates the user to AddTool, a screen to add a new tool */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AddTool")} style={styles.addToolFrame}>
                            <Text> Add Tool </Text>
                    </TouchableOpacity>

                    {/* Creates a Button that navigates the user to CheckoutTool, a screen to checkout an available tool */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("CheckoutTool")} style={styles.addToolFrame}>
                            <Text> Check Out Tool </Text>
                    </TouchableOpacity>

                    <ScrollView>
                        <Text style={{textAlign: 'center'}}>Your checked out tools:</Text>
                        {/* Creates a view object with a list of all checked out tools of the current user */}
                        <View style={styles.toolsContainer}>
                            {this.state.userCheckedOutTools.map(r => this.displayUserCheckedOutTools(r.Tool, r.Number, r.CheckoutID))}
                        </View>
                        <Text style={{textAlign: 'center'}}>Tools Avaliable:</Text>
                        {/* Creates a view object with a list of all available tools to checkout */}
                        <View style={styles.toolsContainer}>
                                {this.state.tools.map(r => this.displayTools(r.Name, r.Quantity, r.ToolID, r.Available, r.CheckedOut))}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        } else {
            return (
                <View style={styles.container}>
                    {/* Creates a Button that navigates the user to CheckoutTool, a screen to checkout an available tool */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("CheckoutTool")} style={styles.addToolFrame}>
                            <Text> Checkout Tool </Text>
                    </TouchableOpacity>

                    <ScrollView>
                        <Text style={{textAlign: 'center'}}>Your checked out tools:</Text>
                        {/* Creates a view object with a list of all checked out tools of the current user */}
                        <View style={styles.toolsContainer}>
                            {this.state.userCheckedOutTools.map(r => this.displayUserCheckedOutTools(r.Tool, r.Number, r.CheckoutID))}
                        </View>
                        <Text style={{textAlign: 'center'}}>Tools Avaliable:</Text>
                        {/* Creates a view object with a list of all available tools to checkout */}
                        <View style={styles.toolsContainer}>
                                {this.state.visibleTools.map(r => this.displayTools(r.Name, r.Quantity, r.ToolID, r.Available, r.CheckedOut))}
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }

    /*
        Function called when navigating into InventoryHomeScreen.js
        */
    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollectionToolsRental)
        this.unsubscribe = this.firestoreRefCheckedOut.onSnapshot(this.getCollectionCheckedOut)
    }
    /*
        Function called when navigating off of InventoryHomeScreen.js
        */
    componentWillUnmount() {
        this.unsubscribe
    }
    /*
        Function to render the screen at start-up
        */
    render() {
        return this.currentView()
    }

    /*
        Function to create new tools list for state from tools in database.
        */
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
    /*
        Function to create new checked out tools list for state from checked out tools in database.
        */
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

    /*
        Function to create a view object for a user's checked out tool
            Args:
                name (string): The name of the tool type
                quantity (string): The amount of tools available
                ToolID (string): ID of the tool
                Available (boolean): If tool is available to check out
                checkedOut (boolean): If tool is checked out
            Returns:    
                View: A view object with the tool information
        */
    displayTools(name, quantity, toolID, Available, checkedOut) {
        // A conditional that checks if the current user is an administrator or not in order to render which Inventory Screen
        if (this.state.admin){
            return (
                <View style={styles.toolFrame}>
                    {/* The name of the tool type */}
                    <Text>{name}</Text>
                    {/* The total number of tools */}
                    <Text>Quantity: {quantity}</Text>
                    {/* The number of currently available tools */}
                    <Text>Amount Available: {parseInt(quantity) - checkedOut}</Text>
                    <Text>Visible: {String(Available)}</Text>
                    {/* Creates a Button that navigates the user to EditTool to edit the selected tool */}
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
                    {/* The name of the tool type */}
                    <Text>{name}</Text>
                    {/* The total number of tools */}
                    <Text>Quantity: {quantity}</Text>
                    {/* The number of currently available tools */}
                    <Text>Amount Available: {parseInt(quantity) - checkedOut}</Text>
                </View>
            );
        }
    }

    /*
        Function to create a view object for a user's checked out tool
            Args:
                tool (string): The name of the tool type
                number (string): The number associated with the tool
                CheckoutID (string): ID of the currently checked out tool
            Returns:    
                View: A view object with the tool information and an option to check it back in
        */
    displayUserCheckedOutTools(tool, number, CheckoutID){
        return (
            <View style={styles.toolFrame}>
                {/* The name of the tool type */}
                <Text>{tool}</Text>
                {/* ID of the currently checked out tool */}
                <Text>{"ID: " + number}</Text>
                {/* Button to check in tool */}
                <TouchableOpacity onPress={() => checkInToolLocal(CheckoutID, tool)}>
                        <Text> Check In Tool </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

/*
        Function to check in a tool using InventoryComponent's checkInTool
            Args:
                CheckoutID (string): ID of the currently checked out tool
                tool (string): The name of the tool type
        */
function checkInToolLocal(CheckoutID, tool){
    checkInTool(CheckoutID, tool);
}