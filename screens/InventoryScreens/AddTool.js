import React from 'react'
import {View, Text, TouchableOpacity, TextInput, Switch} from 'react-native'
import {makeNewTool} from '../../Components/InventoryComponents'
import styles from '../styles/InventoryScreens.styles'
import { Ionicons } from '@expo/vector-icons'


export default class AddTool extends React.Component {
    state = {
      name: "",
      quantity: 0,
      available: false
    };
      currentView() {
          return (
              <View style={styles.container}>
                  <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>
                      Create new tool
                  </Text>
                  <TextInput  
                        style={styles.titleFillField} 
                        placeholder="Tool Name" 
                        value={this.state.name} 
                        onChangeText={(value) => this.setState({name: value})}
                        maxLength={25}
                        />
                <TextInput 
                        style={styles.contentFillField} 
                        placeholder="Tool quantity"
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
                  <TouchableOpacity style={styles.submitButton}
                  onPress={() => {
                    if (this.state.name != "" && parseInt(this.state.quantity) > 0) {
                      makeNewTool(this.state.name, this.state.quantity, this.state.available)
                      this.props.navigation.goBack()
                    } else {
                      alert('Text cannot be empty and quantity must be more than 0.');
                    }
                  }}>
                  <Text style={styles.submitLabel}>Submit</Text>
                </TouchableOpacity>
              </View>
          );
      }
      render() {
          return this.currentView()
      }
    toggleSwitch = () => this.setState({available: !this.state.available});
  }