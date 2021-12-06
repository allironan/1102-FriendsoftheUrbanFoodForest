import React from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import { makeNewEvent } from '../../Components/EventComponents';
import styles from '../styles/ProgramsEventsScreen.style.js';
import { Ionicons } from '@expo/vector-icons';


export default class AddEventScreen extends React.Component {
  state = {
    title: "",
    information: "",
    startTime: "",
    endTime: "",
  };
    currentView() {
        return (
            <View style={styles.container}>
              <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
              </TouchableOpacity>
              <View style={styles.viewContainer}>
                <Text style={styles.programTitle} >
                    Create new Event
                </Text>
                <TextInput 
                          style={styles.titleFillField} 
                          placeholder="Event Title" 
                          value={this.state.title} 
                          maxLength={50}
                          onChangeText={(value) => this.setState({title: value})} />
                <TextInput 
                          style={styles.contentFillField}
                          placeholder="Event Information" 
                          value={this.state.information}
                          maxLength={600}
                          multiline={true}
                          onChangeText={(value) => this.setState({information: value})} />                 
                <TouchableOpacity style={styles.submitButton} onPress={() => {
                  if (this.state.title != "" && this.state.information != "") {
                    makeNewEvent(this.state.title, this.state.information, this.props.route.params.programID)
                    this.props.navigation.goBack()
                  } else {
                    alert('Text cannot be empty.');
                  }
                  }}>
                  <Text style={styles.submitLabel}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
        );
    }
    render() {
        return this.currentView()
    }
}

/*
<TextInput placeholder="Event Start Time" 
  value={this.state.startTime}
  onChangeText={(value) => this.setState({startTime: value})} />
<TextInput placeholder="Event End Time" 
  value={this.state.endTime}
  onChangeText={(value) => this.setState({endTime: value})} />
*/