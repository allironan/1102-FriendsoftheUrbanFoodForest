import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'
import { deleteProgram } from '../Components/ProgramComponents';


export default class SingularProgram extends React.Component {
    currentView() {
        return (
            <View>
                <Button title="Back to Programs" onPress={() => this.props.navigation.goBack()} />
                <Text>
                    {this.props.route.params.title}
                    {this.props.route.params.description}
                </Text>
                <TouchableOpacity > <Text>Edit Program</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => deleteProgramLocal(this.props.route.params.ProgramID)}> <Text>Delete Program</Text></TouchableOpacity>
                <Text>
                    Program Events Below
                </Text>
                <TouchableOpacity > <Text>Add new event</Text></TouchableOpacity>

            </View>
        );
    }
    render() {
        return this.currentView()
    }
}
function deleteProgramLocal(postID){
    deleteProgram(postID);
    //this.props.navigation.goBack()
    //onPress={() => deleteProgram(this.props.route.params.ProgramID)}
}
