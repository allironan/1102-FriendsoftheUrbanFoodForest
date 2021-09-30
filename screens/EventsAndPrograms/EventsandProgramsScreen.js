import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native' 
import ProgramComponent from './ProgramComponent';
import { ScrollView } from 'react-native-gesture-handler'

export default class EventandProgramsScreen extends React.Component {
  programs = [
    {id: 1, title: "program1", description: "Program 1 description"},
    {id: 2, title: "program2", description: "Program 2 description"},
    {id: 3, title: "program3", description: "Program 3 description"},
    {id: 4, title: "program4", description: "Program 4 description"},
    {id: 5, title: "program5", description: "Program 5 description"},
    {id: 6, title: "program6", description: "Program 6 description"},
    {id: 7, title: "program7", description: "Program 7 description"},
    {id: 8, title: "program8", description: "Program 8 description"},
  ]

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <div> 
            {this.programs.map((program) => (
              <ProgramComponent id = {program["id"]} title={program["title"]} description={program["title"]}></ProgramComponent> 
            ))

            }
          </div>
        </View>
      </ScrollView>
   
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'rgba(233,243,196,1)',
      paddingTop: 40,
  },
  postFrame: {
      backgroundColor: 'rgba(255,255,255,1)',
      borderRadius: 25,
      width: 325,
      height: 'auto',
      minHeight: 150,
      marginHorizontal: '2%',
      marginBottom: 12,
      textAlign: 'center'
  },
})