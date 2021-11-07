import React, { Children } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import { editEvent } from '../../Components/EventComponents'
import styles from '../styles/ProgramsEventsScreen.style.js'

export default class EditEventScreen extends React.Component {
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
                  <Text style={styles.goBackLabel}> Back to Event </Text>
                </TouchableOpacity>
                <Text style={styles.programTitle}> Edit Event </Text>
                <TextInput style={styles.textFillField} placeholder="Event Title" 
                                   value={this.props.route.params.Title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                <TextInput style={styles.textFillField} placeholder="Event Content" 
                                    value={this.props.route.params.Information}
                                    onChangeText={(value) => this.setState({information: value})} />
                <TouchableOpacity style={styles.submitButton} onPress={() => {
                  if (this.state.information != "" || this.state.title != "") {
                    editEvent(this.state.title, this.state.information, Date(), Date(), this.props.route.params.EventID)
                    this.props.navigation.navigate("ProgramsOverviewScreen")
                  } else {
                    alert('Text cannot be empty.');
                  }
                  }}>
                  <Text style={{textAlign: "center"}}>Submit</Text>
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
                <TextInput placeholder="Start Time" 
                                    value={this.props.route.params.Information}
                                    onChangeText={(value) => this.setState({startTime: value})} />
                <TextInput placeholder="End Time" 
                                    value={this.props.route.params.Information}
                                    onChangeText={(value) => this.setState({endTime: value})} />
*/