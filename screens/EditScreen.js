import React, { Component } from 'react';
import { Text, TouchableHighlight, View, StyleSheet, TextInput } from 'react-native';
import makeNewPost from '../makeNewPost'
import PostsScreen from '../screens/PostsScreen.js'
 
import Modal from 'modal-react-native-web';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
 
export default class EditScreen extends Component {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    title: {
        textAlign: "center",
        padding: 20,
        marginBottom: 60,
        fontSize: 36,
        fontWeight: 'bold',
        flexWrap: "wrap"
    },
    addPostButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 8,
        alignSelf: 'flex-end',
        width: 100,
        paddingVertical: 10,
        marginHorizontal: '2%',
        marginBottom: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    addPostLabel: {
        fontSize: 16,
        color: 'rgba(196,196,196,1)'
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
    postTitle: {
        fontSize: 24,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginTop: 15,
        marginVertical: '2%',
        fontWeight: 'Bold'
    },
    postDate: {
        fontSize: 10,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginBottom: 20,
        color: 'rgba(196,196,196,1)'
    },
    postContent: {
        fontSize: 12,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginVertical: '5%',
        marginBottom: 30
    }
})