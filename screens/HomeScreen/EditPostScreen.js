import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { editPost } from '../../Components/PostComponents'
import styles from '../styles/HomeScreen.style'
import { Ionicons } from '@expo/vector-icons';
 
export default class EditPostScreen extends Component {
  state = {
    modalVisible: false,
    title: this.props.route.params.Title,
    information: this.props.route.params.Information,
    survey: "",
    postID: ""
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
          <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black)'}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
            Edit Post
        </Text>
        <TextInput style={styles.titleFillField} placeholder="Post Title"
                            placeholder = {'Old Title: ' + this.props.route.params.Title}
                            value={this.state.title}
                            onChangeText={(value) => this.setState({title: value})} />
                            
        <TextInput style={styles.contentFillField} placeholder="Post Information"
                            placeholder = {'Old Information: ' + this.props.route.params.Information}
                            value={this.state.information}
                            maxLength={600}
                            multiline={true}
                            onChangeText={(value) => this.setState({information: value})} />
        <TouchableOpacity style={styles.submitButton} onPress={() => {
            if (this.state.title != "") {
              editPost(this.state.title, this.state.information, this.props.route.params.Survey, this.props.route.params.PostID)
              this.props.navigation.goBack()
            } else {
              alert('Title cannot be empty.');
            }
          }}>
            <Text style={styles.submitLabel}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}