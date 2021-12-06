import React from 'react'
import {View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { editEvent } from '../../Components/EventComponents'
import styles from '../styles/ProgramsEventsScreen.style.js'
import { Ionicons } from '@expo/vector-icons';

export default class EditEventScreen extends React.Component {
  state = {
    title: this.props.route.params.Title,
    information: this.props.route.params.Information
  };
    currentView() {
        return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.goBackLabel}> Back to Event </Text>
              </TouchableOpacity>
              <View style={styles.viewContainer}>
                <Text style={styles.programTitle}> Edit Event </Text>
                <TextInput 
                          style={styles.titleFillField}
                          placeholder="Event Title"
                          placeholder = {'Old Title: ' + this.props.route.params.Title}
                          value={this.state.title} 
                          maxLength={50}
                          onChangeText={(value) => this.setState({title: value})} />
                <TextInput 
                          style={styles.contentFillField}
                          placeholder="Event Content"
                          placeholder = {'Old Information: ' + this.props.route.params.Information}
                          value={this.state.information}
                          maxLength={600}
                          multiline={true}
                          onChangeText={(value) => this.setState({information: value})} />
                <TouchableOpacity style={styles.submitButton} onPress={() => {
                  if (this.state.information != "" || this.state.title != "") {
                    editEvent(this.state.title, this.state.information, this.props.route.params.EventID, this.props.route.params.programID)
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

/*
                <TextInput placeholder="Start Time" 
                                    value={this.props.route.params.Information}
                                    onChangeText={(value) => this.setState({startTime: value})} />
                <TextInput placeholder="End Time" 
                                    value={this.props.route.params.Information}
                                    onChangeText={(value) => this.setState({endTime: value})} />
*/