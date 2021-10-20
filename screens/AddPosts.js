import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog} from 'react-native'
import {makeNewPost} from '../Components/PostComponents'

export default class AddPosts extends React.Component {
    state = {
      title: "",
      information: "",
    };
      currentView() {
          return (
              <View>
                  <Button title="Back to Posts" onPress={() => this.props.navigation.goBack()} />
                  <Text>
                      Create new post
                  </Text>
                  <TextInput placeholder="Post Title" 
                                     value={this.state.title} 
                                     onChangeText={(value) => this.setState({title: value})} />
                  <TextInput placeholder="Post Content" 
                                      value={this.state.content}
                                      onChangeText={(value) => this.setState({information: value})} />
                  <TouchableHighlight
                  onPress={() => {
                    if (this.state.content != "" || this.state.title != "") {
                      makeNewPost(this.state.title, this.state.information)
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