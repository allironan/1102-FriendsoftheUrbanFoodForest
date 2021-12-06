import React from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import {checkoutTool} from '../../Components/InventoryComponents'
import firebase from 'firebase/app'
import styles from '../styles/InventoryScreens.styles'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons } from '@expo/vector-icons';



export default class CheckoutTool extends React.Component {
    state = {
      name: "",
      email: "",
      displayName: "",
      selectedTool: "",
      toolNames: [],
      toolNumber: 1
    };
    firestoreRef = firebase.firestore().collection('ToolsRental');

    
      currentView() {
          if (this.state.toolNames.length == 0){
            return (
              <View style={styles.container}>
                  <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                  </TouchableOpacity>
                  <Text> There are no tools available at this time.</Text>
              </View>
            );
          } else {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                      <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        Checkout Tool
                    </Text>
                  <SelectDropdown
                    data={this.state.toolNames}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index)
                      this.setState({selectedTool: selectedItem})
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome name="chevron-down" color={"#444"} size={18} />
                      );
                    }}
                    dropdownIconPosition={"right"}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                  />
                  <TextInput 
                          style={styles.contentFillField}
                          placeholder="Tool number"
                          keyboardType='decimal-pad'
                          value={this.state.toolNumber}
                          onChangeText={(value) => this.setState({toolNumber: value})}
                          maxLength={3}  //setting limit of input
                  />
                  <TouchableOpacity style={styles.submitButton}
                    onPress={() => {
                      if (this.state.selectedTool != "" && parseInt(this.state.toolNumber) > 0 && parseInt(this.state.toolNumber) < 100) {
                          checkoutTool(this.state.selectedTool, this.state.toolNumber, this.state.displayName)
                          this.props.navigation.goBack();  
                      } else {
                        alert('Please select tool or choose a number between 0 and 100.');
                      }
                    }}>
                    <Text style={styles.submitLabel}>Submit</Text>
                  </TouchableOpacity>
                </View>
            );
          }
          
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
            if (tool.data().Available && tool.data().CheckedOut < tool.data().Quantity) {
              toolNames.push(tool.data().Name)
            }    
        })
        if (toolNames.length != 0){
          this.setState({toolNames})
          const selectedTool = toolNames[0].Name;
          this.setState({selectedTool});
        }
    }
  }
  