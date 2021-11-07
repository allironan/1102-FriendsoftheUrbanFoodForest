import React, { Children } from 'react'
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
              <View style={styles.viewContainer}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.goBackLabel}> Back to Program </Text>
                </TouchableOpacity>
                <Text style={styles.programTitle}>
                    Edit Program
                </Text>
                <TextInput style={styles.textFillField} placeholder="Program Title" 
                                   value={this.props.route.params.title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                <TextInput style={styles.textFillField} placeholder="Program Information" 
                                    value={this.props.route.params.information}
                                    onChangeText={(value) => this.setState({information: value})} />
                <TouchableOpacity style={styles.submitButton} title="Submit" onPress={() => {
                  if (this.state.information != "" || this.state.title != "") {
                    editProgram(this.state.title, this.state.information, this.props.route.params.ProgramID)
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