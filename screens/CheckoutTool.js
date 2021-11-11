import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput, Button, Dialog, Switch} from 'react-native'
import {getToolNames, checkoutTool} from '../Components/InventoryComponents'
import { Picker } from "react-native";
import firebase from 'firebase/app'


export default class CheckoutTool extends React.Component {
    state = {
      name: "",
      email: "",
      displayName: "",
      selectedTool: "",
      toolNames: [],
      toolNumber: 0
    };
    firestoreRef = firebase.firestore().collection('ToolsRental');

      currentView() {
          //if (this.state.toolNames.size() != 0) {
            return (
                <View>
                    <Button title="Back to Tools" onPress={() => this.props.navigation.goBack()} />
                    <Text>
                        Checkout Tool
                    </Text>
                  <Picker
                      selectedValue={this.state.selectedTool}
                      style={{ height: 50, width: 150 }}
                      onValueChange={(itemValue) => this.setState({selectedTool: itemValue})}
                  > 
                      {this.state.toolNames.map(r => <Picker.Item label={r.Name} value={r.ToolID}/>)}
                  </Picker>
                  <TextInput 
                          keyboardType='numeric'
                          value={this.state.toolNumber}
                          onChangeText={(value) => this.setState({toolNumber: value})}
                          maxLength={3}  //setting limit of input
                  />
                  <TouchableHighlight
                    onPress={() => {
                      if (this.state.selectedTool != "" || this.state.toolNumber > 0) {
                          //send toolname (selectedTool), and number
                          console.log(this.state.selectedTool);
                          checkoutTool(this.state.selectedTool, this.state.toolNumber, this.state.displayName)
                        this.props.navigation.goBack()
                        //might need to come back to do an if this exists 
                      } else {
                        alert('Fields cannot be empty.');
                      }
                    }}>
                    <Text>Submit</Text>
                  </TouchableHighlight>
                </View>
            );
        //   } else {
        //     return (
        //         <View>
        //             <Button title="Back to Tools" onPress={() => this.props.navigation.goBack()} />
        //             <Text>
        //                 There are no tools currently available.
        //             </Text>
        //         </View>
        //     );
        //   }
          
      }
      render() {
          return this.currentView()
      }
      componentDidMount() {
        const {email, displayName} = firebase.default.auth().currentUser;
        this.setState({email, displayName})
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollectionToolsRental);
    }
    getCollectionToolsRental = (querySnapshot) => {
        const toolNames = []
        querySnapshot.forEach((tool) => {
            toolNames.push(tool.data())
        })
        this.setState({toolNames})
        const selectedTool = toolNames[0].Name;
        this.setState({selectedTool});
    }
      createItem(name, toolID){
          return (
              <Picker.Item label={name} value={toolID}/>
          )
      }
  }