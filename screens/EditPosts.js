import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import {editPost} from '../Components/PostComponents'

export default class EditPosts extends React.Component {
    state = {
      title: "",
      information: "",
      surveyURL: "",
    };
      currentView() {
          return (
              <View>
                  <Button title="Back to Posts" onPress={() => this.props.navigation.goBack()} />
                  <Text>
                      Edit Post
                  </Text>
                  <TextInput placeholder="Post Title" 
                                   value={this.props.route.params.Title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                  <TextInput placeholder="Post Content" 
                                      value={this.props.route.params.Description}
                                      onChangeText={(value) => this.setState({information: value})} />
                  <TextInput placeholder="Post Survey URL (Optional)" 
                                    value={this.props.route.params.Survey}
                                    onChangeText={(value) => this.setState({surveyURL: value})} />     
                  <TouchableHighlight
                  onPress={() => {
                    if (this.state.content != "" || this.state.title != "") {
                      editPost(this.state.title, this.state.information, this.state.surveyURL, this.props.route.params.postID)
                      this.props.navigation.goBack();
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