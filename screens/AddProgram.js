import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import {makeNewProgram, getPrograms, deleteProgram, editProgram} from '../Components/ProgramComponents'


export default class AddProgram extends React.Component {
  state = {
    title: "",
    information: "",
  };
    currentView() {
        return (
            <View>
                <Button title="Back to Programs" onPress={() => this.props.navigation.goBack()} />
                <Text>
                    Create new post
                </Text>
                <TextInput placeholder="Post Title" 
                                   value={this.state.title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                <TextInput placeholder="Post Content" 
                                    value={this.state.content}
                                    onChangeText={(value) => this.setState({information: value})} />
                <TouchableHighlight
                onPress={() => {
                  if (this.state.content != "" || this.state.title != "") {
                    makeNewProgram(this.state.title, this.state.information)
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