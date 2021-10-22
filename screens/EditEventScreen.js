import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import { editEvent } from '../Components/EventComponents.js'
import styles from './styles/ProgramsEventsScreen.style.js'

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
                <Button style={styles.goBackButton} title="Back to Events" onPress={() => this.props.navigation.goBack()} />
                <Text>
                    Edit Post
                </Text>
                <TextInput placeholder="Event Title" 
                                   value={this.props.route.params.Title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                <TextInput placeholder="Event Content" 
                                    value={this.props.route.params.Information}
                                    onChangeText={(value) => this.setState({information: value})} />
                <Button styles={styles.submitButton} title="Submit"
                onPress={() => {
                  if (this.state.information != "" || this.state.title != "") {
                    editProgram(this.state.title, this.state.information, Date(), Date(), this.props.route.params.ProgramID)
                    this.props.navigation.navigate("ProgramsHome")
                  } else {
                    alert('Text cannot be empty.');
                  }
                }}>
                </Button>
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