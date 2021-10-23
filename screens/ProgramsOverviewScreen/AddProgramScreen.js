import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import { makeNewProgram } from '../../Components/ProgramComponents'


export default class AddProgramScreen extends React.Component {
  state = {
    title: "",
    information: "",
  };
    currentView() {
        return (
            <View>
                <Button title="Back to Programs" onPress={() => this.props.navigation.goBack()} />
                <Text>
                    Create new Program
                </Text>
                <TextInput placeholder="Program Title" 
                                   value={this.state.title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                <TextInput placeholder="Program Information" 
                                    value={this.state.information}
                                    onChangeText={(value) => this.setState({information: value})} />
                <TouchableHighlight
                onPress={() => {
                  if (this.state.information != "" || this.state.title != "") {
                    makeNewProgram(this.state.title, this.state.information)
                    this.props.navigation.goBack()
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