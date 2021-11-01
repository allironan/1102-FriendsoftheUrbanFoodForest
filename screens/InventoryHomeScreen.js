import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../Components/UserDataComponents'
import {makeNewPost, getPosts, deletePost} from '../Components/PostComponents'
import { ScrollView } from 'react-native-gesture-handler'
import WebViewExample from '../screens/dialogScreen.js'
import styles from './styles/HomeScreen.style.js'
import {deleteTool} from '../Components/InventoryComponents'



export default class InventoryHomeScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        tools: []
    }
    currentView() {
        return (
            <View style={styles.container}>
                <Text>Hi</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("AddTool")} style={styles.addPostButton}>
                        <Text> Add Tool </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.addPostButton} onPress={() => deleteToolLocal(toolID)}>
                            <Text style={styles.addPostLabel}> Delete Tool </Text>
                    </TouchableOpacity> */}
                <View>
                        {this.state.tools.map(r => this.displayTools(r.Name, r.Quantity))}
                </View>
            </View>
        );
    }

    componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        //this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollectionToolsRental)
    }
    componentWillUnmount() {
        this.unsubscribe
    }
    render() {
        return this.currentView()
    }
    getCollectionToolsRental = (querySnapshot) => {
        const tools = []
        querySnapshot.forEach((tool) => {
            tools.push(tool.data())
        })
        this.setState({tools})
    }
    updateTools(){
        const tools = []
        db.collection("ToolsRental").onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if(change.type == 'added'){
                    tools.push(change.data())
                }
            })
        })
        this.setState({tools})
    }
    displayTools(name, quantity) {
        return (
        <View>
            <Text style={styles.postTitle}>{name}</Text>
            <Text style={styles.postDate}>{quantity}</Text>
                <TouchableOpacity style={styles.addPostButton} onPress={() => deleteToolLocal(toolID)}>
                        <Text style={styles.addPostLabel}> Delete Tool </Text>
                </TouchableOpacity>
        </View>
        );
}
}

function deleteToolLocal(toolID){
    //console.log(postID)
    deleteTool(toolID);
}