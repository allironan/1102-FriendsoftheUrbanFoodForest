import React, { Component } from 'react';
import { Text, TouchableHighlight, View, TextInput } from 'react-native';
import { makeNewPost } from '../../Components/PostComponents'
import Modal from 'modal-react-native-web';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import styles from '../styles/HomeScreen.style'
 
export default class EditPostScreen extends Component {
  state = {
    modalVisible: false,
    title: PostsScreen.passData.Title,
  };
 
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={{marginTop: 22}}>
            <View>
              <Text>Enter your new post</Text>
              <TextInput placeholder="Post Title" 
                                   value={this.getData().title} style={styles.buttonLabel} 
                                   onChangeText={(value) => this.setState({title: value})} />
            <TextInput placeholder="Post Content" 
                                    value={this.getData().content} style={styles.buttonLabel} 
                                    onChangeText={(value) => this.setState({content: value})} />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  if (this.state.title != "") {
                    makeNewPost(this.state.title)
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
          <Text style={styles.buttonLabel}>Edit Post </Text>
        </TouchableHighlight>
      </View>
    );
  }
}