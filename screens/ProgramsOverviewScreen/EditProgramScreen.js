import React from 'react'
import {View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {editProgram} from '../../Components/ProgramComponents'
import styles from '../styles/ProgramsEventsScreen.style.js'
import { Ionicons } from '@expo/vector-icons';

export default class EditProgramScreen extends React.Component {
  state = {
    title: this.props.route.params.Title,
    information: this.props.route.params.Information,
    programID: ""
  };
    currentView() {
        return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                  <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
              </TouchableOpacity>
              <View style={styles.viewContainer}>
                <Text style={styles.programTitle}>
                    Edit Program
                </Text>
                <TextInput 
                          style={styles.titleFillField} 
                          placeholder="Program Title" 
                          placeholder = {'Old Title: ' + this.props.route.params.Title}
                          value={this.state.title} 
                          maxLength={50}
                          onChangeText={(value) => this.setState({title: value})} />
                <TextInput 
                          style={styles.contentFillField} 
                          placeholder="Program Information" 
                          placeholder = {'Old Information: ' + this.props.route.params.Information}
                          value={this.state.information}
                          maxLength={600}
                          multiline={true}
                          onChangeText={(value) => this.setState({information: value})} />
                <TouchableOpacity style={styles.submitButton} title="Submit" onPress={() => {
                  if (this.state.information != "" || this.state.title != "") {
                    editProgram(this.state.title, this.state.information, this.props.route.params.ProgramID)
                    this.props.navigation.navigate("ProgramsOverviewScreen")
                  } else {
                    alert('Text cannot be empty.');
                  }
                  }}>
                    <Text style={styles.submitLabel}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
            </TouchableWithoutFeedback>
        );
    }
    render() {
        return this.currentView()
    }
}