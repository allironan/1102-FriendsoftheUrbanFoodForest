import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import {makeNewPost} from '../../Components/PostComponents'
import styles from '../styles/HomeScreen.style.js'

export default class AddPostScreen extends React.Component {
    state = {
      title: "",
      information: "",
      surveyURL: "",
    };
      currentView() {
          return (
              <View style={styles.container}>
                  <Text style={styles.title}>
                      Create new post
                  </Text>
                  <TextInput style={styles.textFillField} placeholder="Post Title" 
                                     value={this.state.title} 
                                     onChangeText={(value) => this.setState({title: value})} />
                  <TextInput style={styles.textFillField} placeholder="Post Content" 
                                      value={this.state.information}
                                      onChangeText={(value) => this.setState({information: value})} />
                  <TextInput style={styles.textFillField} placeholder="Post Survey Link (Optional)" 
                                      value={this.state.surveyURL}
                                      onChangeText={(value) => this.setState({surveyURL: value})} />
                  <TouchableHighlight
                  onPress={() => {
                    if (this.state.information != "" && this.state.title != "") {
                      makeNewPost(this.state.title, this.state.information, this.state.surveyURL)
                      this.props.navigation.goBack()
                    } else {
                      alert('Text cannot be empty.');
                    }
                  }}>
                  <Text>Submit</Text>
                </TouchableHighlight>
                <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.goBackLabel}> Go back </Text>
                  </TouchableOpacity>
              </View>
          );
      }
      render() {
          return this.currentView()
      }
  }