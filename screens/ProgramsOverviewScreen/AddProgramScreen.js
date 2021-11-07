import React, { Children } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import { makeNewProgram } from '../../Components/ProgramComponents'
import styles from '../styles/ProgramsEventsScreen.style.js'


export default class AddProgramScreen extends React.Component {
  state = {
    title: "",
    information: "",
  };
    currentView() {
        return (
            <View style={styles.container}>
              <View style={styles.viewContainer}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.goBackLabel}> Back to Programs </Text>
                </TouchableOpacity>
                <Text style={styles.programTitle}>
                    Create new Program
                </Text>
                <TextInput style={styles.textFillField} placeholder="Program Title" 
                                   value={this.state.title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                <TextInput style={styles.textFillField} placeholder="Program Information" 
                                    value={this.state.information}
                                    onChangeText={(value) => this.setState({information: value})} />
                <TouchableHighlight style={styles.submitButton} onPress={() => {
                  if (this.state.information != "" && this.state.title != "") {
                    makeNewProgram(this.state.title, this.state.information)
                    this.props.navigation.goBack()
                  } else {
                    alert('Text cannot be empty.');
                  }
                }}>
                  <Text style={{textAlign: "center"}}> Submit </Text>
                </TouchableHighlight>
              </View>
            </View>
        );
    }
    render() {
        return this.currentView()
    }
}