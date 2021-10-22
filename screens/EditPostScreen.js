import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet, TextInput } from 'react-native';
import makeNewPost from '../makeNewPost'
import PostsScreen from '../screens/PostsScreen.js'
 
import Modal from 'modal-react-native-web';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import styles from './styles/HomeScreen.style'
 
export default class EditPostScreen extends Component {
  state = {
    modalVisible: false,
    //PostID: PostsScreen.passData.PostID,
    title: PostsScreen.passData.Title,
  };
 
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  // getData = () => {
  //   return PostsScreen.passData();
  // }
 
  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={{marginTop: 22}}>
            <View>
              <Text>Enter your new post</Text>
              <TextInput placeholder="Post Title" 
                                   value={this.getData().title} style={styles.textInput} 
                                   onChangeText={(value) => this.setState({title: value})} />
            <TextInput placeholder="Post Content" 
                                    value={this.getData().content} style={styles.textInput} 
                                    onChangeText={(value) => this.setState({content: value})} />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  if (this.state.content != "" || this.state.title != "") {
                    makeNewPost(this.state.title, this.state.content)
                  } else {
                    alert('Text cannot be empty.');
                  }
                }}>
                <Text>Submit</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
 
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.addPostLabel}>Edit Post </Text>
        </TouchableHighlight>
      </View>
    );
  }
}