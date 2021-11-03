import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import { makeNewEvent } from '../../Components/EventComponents';


export default class AddEventScreen extends React.Component {
  state = {
    title: "",
    information: "",
    startTime: "",
    endTime: "",
  };
    currentView() {
        return (
            <View>
                <Button title="Back to Program" onPress={() => this.props.navigation.goBack()} />
                <Text>
                    Create new Event
                </Text>
                <TextInput placeholder="Event Title" 
                                   value={this.state.title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                <TextInput placeholder="Event Information" 
                                    value={this.state.information}
                                    onChangeText={(value) => this.setState({information: value})} />
                <TouchableHighlight
                onPress={() => {
                  if (this.state.title != "" && this.state.information != "" && this.state.startTime != "" && this.state.endTime != "" && this.state.programID != "") {
                    makeNewEvent(this.state.title, this.state.information, Date(), Date(), this.props.route.params.programID)
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

/*
<TextInput placeholder="Event Start Time" 
  value={this.state.startTime}
  onChangeText={(value) => this.setState({startTime: value})} />
<TextInput placeholder="Event End Time" 
  value={this.state.endTime}
  onChangeText={(value) => this.setState({endTime: value})} />
*/