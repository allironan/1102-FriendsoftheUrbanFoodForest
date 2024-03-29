import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import {getUserData} from '../../Components/UserDataComponents'
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
        return (
            <View style={styles.container}>
                {this.state.admin && (
                    <View style={styles.invFunctionsContainer}>
                        {/* Creates a Button that navigates the user to AdminToolCheckoutScreen, a list of all checked out tools */}
                        <TouchableOpacity   onPress={() => this.props.navigation.navigate("AdminToolCheckoutScreen")} 
                                            style={styles.invFunctionFrame}>
                                <Text style={styles.invFunctionLabel}> All Checked Out Tools </Text>
                        </TouchableOpacity>

                        {/* Creates a Button that navigates the user to AddTool, a screen to add a new tool */}
                        <TouchableOpacity   onPress={() => this.props.navigation.navigate("AddTool")} 
                                            style={styles.invFunctionFrame}>
                                <Text style={styles.invFunctionLabel}> Add Tool </Text>
                        </TouchableOpacity>
                    </View>
                )}
                

                {/* Creates a Button that navigates the user to CheckoutTool, a screen to checkout an available tool */}
                <TouchableOpacity   onPress={() => this.props.navigation.navigate("CheckoutTool")} 
                                    style={styles.invFunctionFrame}>
                        <Text style={styles.invFunctionLabel}> Check Out Tool </Text>
                </TouchableOpacity>

                <Text style={{textAlign: 'center'}}>Your Checked Out Tools:</Text>
                <ScrollView>
                    {/* Creates a view object with a list of all checked out tools of the current user */}
                    <View style={styles.toolsContainer}>
                        {this.state.userCheckedOutTools.map(r => this.displayUserCheckedOutTools(r.Tool, r.Number, r.CheckoutID))}
                    </View>
                </ScrollView>

                <Text style={{textAlign: 'center'}}>Tools Available:</Text>
                <ScrollView>
                    {/* Creates a view object with a list of all available tools to checkout */}
                    <View style={styles.toolsContainer}>
                            {this.state.tools.map(r => this.displayTools(r.Name, r.Quantity, r.ToolID, r.Available, r.CheckedOut))}
                    </View>
                </ScrollView>
            </View>
        );
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
        return (
            <View style={styles.toolFrame} id={toolID}>
                {/* The name of the tool type */}
                <Text style={styles.toolName}>{name}</Text>
                {/* The total number of tools */}
                <Text style={styles.toolInfo}>Total Number: {quantity}</Text>
                {/* The number of currently available tools */}
                <Text style={styles.toolInfo}>Amount Available: {parseInt(quantity) - checkedOut}</Text>
                {this.state.admin && (
                    <Text style={styles.toolInfo}>Visible: {String(Available)}</Text>
                )}
                {/* Creates a Button that navigates the user to EditTool to edit the selected tool */}
                {this.state.admin && (
                    <TouchableOpacity style={styles.functionButton}
                    onPress={() => this.props.navigation.navigate("EditTool", {
                                    name: name,
                                    quantity: quantity,
                                    toolID: toolID,
                                    Available: Available,
                                    checkedOut: checkedOut
                                })}> 
                            <Text style={styles.toolInfo}> Edit Tool </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
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
            <View style={styles.toolFrame} id={CheckoutID}>
                {/* The name of the tool type */}
                <Text style={styles.toolName}>{tool}</Text>
                {/* ID of the currently checked out tool */}
                <Text style={styles.toolInfo}>{"ID: " + number}</Text>
                {/* Button to check in tool */}
                <TouchableOpacity   style={styles.functionButton}
                                    onPress={() => checkInToolLocal(CheckoutID, tool)}>
                        <Text style={styles.toolInfo}> Check In </Text>
                </TouchableOpacity>
            </View>
        );
    }

    /*
        Function called when navigating into InventoryHomeScreen.js
        */
    async componentDidMount() {
        var isAdmin = await getUserData();
        console.log(isAdmin)
        var admin = (isAdmin["Permissions"] == "admin")
        this.setState({admin});
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