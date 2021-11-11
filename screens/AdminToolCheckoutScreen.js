import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import getUserData from '../Components/UserDataComponents'
import {makeNewPost, getPosts, deletePost} from '../Components/PostComponents'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles/HomeScreen.style.js'
import {deleteTool} from '../Components/InventoryComponents'

export default class AdminToolCheckoutScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        checkedOutTools: []
    }
    firestoreRefCheckedOut = firebase.firestore().collection('CheckedOutTool');

    currentView() {
        //if (this.state.checkedOutTools.length != 0) {
            return (
                <View style={styles.container}>
                    <Text>Hi</Text>
                    <Button title="Back to Tools" onPress={() => this.props.navigation.goBack()} />
                    {/* here add an admin only view to a page that has all the tools currently checked out */}
                    <View>
                            {this.state.checkedOutTools.map(r => this.displayCheckedOutTools(r.Tool, r.Number, r.UserName))}
                    </View>
                    {/* here add list of tools that are currenly checked out by UID */}
                </View>
            );
        // } else {
        //     <View style={styles.container}>
        //             <Text>Hi</Text>
        //             <Button title="Back to Tools" onPress={() => this.props.navigation.goBack()} />
        //             {/* here add an admin only view to a page that has all the tools currently checked out */}
        //             <View>
        //                     <Text>There are no tools currenly checked out.</Text>
        //             </View>
        //             {/* here add list of tools that are currenly checked out by UID */}
        //         </View>
        // }
        
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

    displayCheckedOutTools(tool, number, username) {
        return (
        <View>
            <Text style={styles.postTitle}>{tool}</Text>
            <Text style={styles.postTitle}>{number}</Text>
            <Text style={styles.postTitle}>{username}</Text>
        </View>
        );
    }
}