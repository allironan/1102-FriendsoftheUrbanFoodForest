import React from 'react'
import {View, Text, TouchableOpacity, Switch, TextInput, Alert} from 'react-native'
import styles from '../styles/InventoryScreens.styles'
import {deleteTool, editTool} from '../../Components/InventoryComponents'
import { Ionicons } from '@expo/vector-icons';

export default class EditTool extends React.Component {
    state = {
        quantity: "",
        available: false
      };
    createTwoButtonAlert = () =>
    //This works on iOS and Android simulators but not web (heads up for testing purposes)
      Alert.alert(
        "Delete Tool",
        "Are you sure you want to delete this tool?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => {deleteToolLocal(this.props.route.params.toolID); (this.props.navigation.goBack())}}
        ]
      );
  
    currentView() {
        return (
            <View style={styles.container}>
              <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                <Ionicons name={'chevron-back-circle-outline'} size={35} color={'black'}/>
              </TouchableOpacity>
              <View style={styles.viewContainer}>
                <Text style={styles.headerTitle}>
                    Edit Tool
                </Text>
                <Text style={styles.toolName}>{this.props.route.params.name}</Text>
                <TextInput 
                        style={styles.contentFillField} 
                        placeholder="Quantity" 
                        value={this.state.quantity} 
                        onChangeText={(value) => this.setState({quantity: value})}
                        keyboardType='decimal-pad'
                        maxLength={3}
                        />
                <Text>Visible:</Text>
                <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.available ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitch}
                        value={this.state.available} />
                <TouchableOpacity style={styles.submitButton} title="Submit" onPress={() => {
                  if (this.state.quantity != "") {
                    editTool(this.state.quantity, this.state.available, this.props.route.params.toolID, this.props.route.params.name, this.props.route.params.checkedOut)
                    this.props.navigation.goBack();
                  } else {
                    alert('Quantity cannot be empty.');
                  }
                  }}>
                    <Text style={styles.submitLabel}>Submit</Text>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.deleteButton} onPress={this.createTwoButtonAlert}>
                        <Text style={styles.submitLabel}> Delete Tool </Text>
                </TouchableOpacity>
              </View>
            </View>
        );
    }
    render() {
        return this.currentView()
    }
    componentDidMount(){
        const available = this.props.route.params.Available;
        const quantity = this.props.route.params.quantity;
        this.setState({available})
        this.setState({quantity})
    }
    toggleSwitch = () => this.setState({available: !this.state.available});
}
function deleteToolLocal(toolID){
    deleteTool(toolID);
}