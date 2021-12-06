import React, { Children } from 'react'
import {View, Text, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native'
import {makeNewPost} from '../../Components/PostComponents'
import styles from '../styles/HomeScreen.style.js'
import { Ionicons } from '@expo/vector-icons';

export default class AddPostScreen extends React.Component {
    state = {
      title: "",
      information: "",
      surveyURL: "",
    };
      currentView() {
          return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={styles.container}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                  <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    Create New Post
                </Text>
                <TextInput style={styles.titleFillField} placeholder="Post Title" 
                                    value={this.state.title}
                                    maxLength={50}
                                    multiline={true}
                                    onChangeText={(value) => this.setState({title: value})} />
                <TextInput style={styles.contentFillField} placeholder="Post Content" 
                                    value={this.state.information}
                                    maxLength={600}
                                    multiline={true}
                                    onChangeText={(value) => this.setState({information: value})} />
                <TouchableOpacity style={styles.submitButton} onPress={() => {
                  if (this.state.information != "" && this.state.title != "") {
                    makeNewPost(this.state.title, this.state.information, this.state.surveyURL)
                    this.props.navigation.goBack()
                  } else {
                    alert('Text cannot be empty.');
                  }
                }}>
                  <Text style={styles.submitLabel}>Submit</Text>
                </TouchableOpacity>
              </View>
              </TouchableWithoutFeedback>
          );
      }
      render() {
          return this.currentView()
      }
  }