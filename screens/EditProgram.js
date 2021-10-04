import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import {makeNewProgram, getPrograms, deleteProgram, editProgram} from '../Components/ProgramComponents'


export default class EditProgram extends React.Component {
  state = {
    title: "",
    information: "",
  };
    currentView() {
        return (
            <View>
                <Button title="Back to Programs" onPress={() => this.props.navigation.navigate.goBack()} />
                <Text>
                    Edit Post
                </Text>
                <TextInput placeholder="Post Title" 
                                   value={this.props.route.params.Title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                <TextInput placeholder="Post Content" 
                                    value={this.props.route.params.Description}
                                    onChangeText={(value) => this.setState({information: value})} />
                <TouchableHighlight
                onPress={() => {
                  if (this.state.content != "" || this.state.title != "") {
                    editProgram(this.state.title, this.state.information, this.props.route.params.ProgramID)
                    this.props.navigation.navigate("ProgramsHome")
                  } else {
                    alert('Text cannot be empty.');
                  }
                }}>
                <Text>Submit</Text>
              </TouchableHighlight>
            </View>
        );
    }
    render() {
        return this.currentView()
    }
}