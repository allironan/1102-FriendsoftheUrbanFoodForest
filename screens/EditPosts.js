import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import {editPost} from '../Components/PostComponents'

export default class EditPosts extends React.Component {
    state = {
      title: "",
      information: "",
    };
      currentView() {
          return (
              <View>
                  <Button title="Back to Posts" onPress={() => this.props.navigation.goBack()} />
                  <Text>
                      Edit Post
                  </Text>
                  <TextInput placeholder="Program Title" 
                                   value={this.props.route.params.Title} 
                                   onChangeText={(value) => this.setState({title: value})} />
                <TextInput placeholder="Program Content" 
                                    value={this.props.route.params.Description}
                                    onChangeText={(value) => this.setState({information: value})} />
                  <TouchableHighlight
                  onPress={() => {
                    if (this.state.content != "" || this.state.title != "") {
                      editPost(this.state.title, this.state.information, this.props.route.params.postID)
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