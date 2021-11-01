import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog, Switch} from 'react-native'
import {makeNewTool} from '../Components/InventoryComponents'
//import * as NumericInput from "react-numeric-input"

export default class AddPosts extends React.Component {
    state = {
      name: "",
      quantity: 0,
      available: false
    };
      currentView() {
          return (
              <View>
                  <Button title="Back to Tools" onPress={() => this.props.navigation.goBack()} />
                  <Text>
                      Create new tool
                  </Text>
                  <TextInput placeholder="Tool Name" 
                                     value={this.state.name} 
                                     onChangeText={(value) => this.setState({name: value})} />
                <Text>Quantity:</Text>
                <TextInput 
                        keyboardType='numeric'
                        value={this.state.quantity}
                        onChangeText={(value) => this.setState({quantity: value})}
                        maxLength={3}  //setting limit of input
                        />
                    <Text>Currently available</Text>
                  <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.available ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitch}
                        value={this.state.available} />
                  <TouchableHighlight
                  onPress={() => {
                    if (this.state.name != "" || this.state.quantity > 0) {
                      makeNewTool(this.state.name, this.state.quantity, this.state.available)
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
    toggleSwitch = () => this.setState({available: !this.state.available});
  }