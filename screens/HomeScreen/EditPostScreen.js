import React, { Component, useEffect } from 'react';
import { Text, TouchableHighlight, View, TextInput, Button } from 'react-native';
import { editPost } from '../../Components/PostComponents'
import Modal from 'modal-react-native-web';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import styles from '../styles/HomeScreen.style'
 
export default class EditPostScreen extends Component {
  state = {
    modalVisible: false,
    title: this.props.route.params.Title,
    information: this.props.route.params.Information,
    survey: "",
    postID: ""
  };
 
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.button} title="Back to Home" onPress={() => this.props.navigation.goBack()} />
        <Text style={styles.title}>
            Edit Post
        </Text>
        <TextInput style={styles.textFillField} placeholder="Post Title"
                            placeholder = {'Old Title: ' + this.props.route.params.Title}
                            value={this.state.title}
                            onChangeText={(value) => this.setState({title: value})} />
                            
        <TextInput style={styles.textFillField} placeholder="Post Information"
                            placeholder = {'Old Information: ' + this.props.route.params.Information}
                            value={this.state.information}
                            onChangeText={(value) => this.setState({information: value})} />
                            
        <Button styles={styles.button} title="Submit" onPress={() => {
          if (this.state.title != "") {
            editPost(this.state.title, this.state.information, this.props.route.params.Survey, this.props.route.params.PostID)
            this.props.navigation.goBack()
          } else {
            alert('Title cannot be empty.');
          }
        }}>
        </Button>
      </View>
      /*<View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={styles.container}>
            <View>
              <Text>Enter your new post</Text>
              <TextInput placeholder="Post Title" 
                                   value={this.props.route.params.Title} 
                                   onChangeText={(value) => this.setState({title: value})} />
            <TextInput placeholder="Post Content" 
                                    value={this.props.route.params.Information}
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
      </View>*/
    );
  }
}