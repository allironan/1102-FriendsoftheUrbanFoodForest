import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import { makeNewEvent } from '../../Components/EventComponents';
import styles from '../styles/ProgramsEventsScreen.style.js'


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
              <View style={styles.viewContainer}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.goBackLabel}> Back to Program </Text>
                </TouchableOpacity>
                <Text style={styles.programTitle} >
                    Create new Event
                </Text>
                <TextInput style={styles.textFillField} placeholder="Event Title" 
                                  value={this.state.title} 
                                  onChangeText={(value) => this.setState({title: value})} />
                <TextInput style={styles.textFillField} placeholder="Event Information" 
                                    value={this.state.information}
                                    onChangeText={(value) => this.setState({information: value})} />
                <TouchableHighlight style={styles.submitButton} onPress={() => {
                  if (this.state.title != "" && this.state.information != "") {
                    makeNewEvent(this.state.title, this.state.information, Date(), Date(), this.props.route.params.programID)
                    this.props.navigation.goBack()
                  } else {
                    alert('Text cannot be empty.');
                  }
                  }}>
                  <Text style={{textAlign: "center"}}>Submit</Text>
                </TouchableHighlight>
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