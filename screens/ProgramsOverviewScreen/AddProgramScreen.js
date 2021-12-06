import React from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import { makeNewProgram } from '../../Components/ProgramComponents'
import styles from '../styles/ProgramsEventsScreen.style.js'
import { Ionicons } from '@expo/vector-icons';


export default class AddProgramScreen extends React.Component {
  state = {
    title: "",
    information: "",
  };
    currentView() {
        return (
            <View style={styles.container}>
              <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                  <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
              </TouchableOpacity>
              <View style={styles.viewContainer}>
                <Text style={styles.programTitle}>
                    Create New Program
                </Text>
                <TextInput 
                          style={styles.titleFillField} 
                          placeholder="Program Title" 
                          value={this.state.title} 
                          maxLength={50}
                          onChangeText={(value) => this.setState({title: value})} />
                <TextInput 
                          style={styles.contentFillField}
                          placeholder="Program Information" 
                          value={this.state.information}
                          maxLength={600}
                          multiline={true}
                          onChangeText={(value) => this.setState({information: value})} />
                <TouchableOpacity style={styles.submitButton} onPress={() => {
                  if (this.state.information != "" && this.state.title != "") {
                    makeNewProgram(this.state.title, this.state.information)
                    this.props.navigation.goBack()
                  } else {
                    alert('Text cannot be empty.');
                  }
                }}>
                  <Text style={styles.submitLabel}> Submit </Text>
                </TouchableOpacity>
              </View>
            </View>
        );
    }
    render() {
        return this.currentView()
    }
}