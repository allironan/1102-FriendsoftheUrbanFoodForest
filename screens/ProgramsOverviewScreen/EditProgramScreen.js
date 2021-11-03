import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import {editProgram} from '../../Components/ProgramComponents'
import styles from '../styles/ProgramsEventsScreen.style.js'

export default class EditProgramScreen extends React.Component {
  state = {
    title: "",
    information: "",
  };
    currentView() {
        return (
            <View style={styles.container}>
                <Button style={styles.goBackButton} title="Back to Programs" onPress={() => this.props.navigation.goBack()} />
                <Text>
                    Edit Program
                </Text>
                <TextInput placeholder="Program Title" 
                                   value={this.props.route.params.title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                <TextInput placeholder="Program Information" 
                                    value={this.props.route.params.information}
                                    onChangeText={(value) => this.setState({information: value})} />
                <Button styles={styles.submitButton} title="Submit"
                onPress={() => {
                  if (this.state.information != "" || this.state.title != "") {
                    editProgram(this.state.title, this.state.information, this.props.route.params.ProgramID)
                    this.props.navigation.navigate("ProgramsOverviewScreen")
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