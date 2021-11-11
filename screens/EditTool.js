import React, { Children } from 'react'
import {View, Text, TouchableOpacity, TouchableHighlight,Switch, TextInput, Button, Dialog} from 'react-native'
import styles from './styles/HomeScreen.style.js'
import {deleteTool, editTool} from '../Components/InventoryComponents'

export default class EditTool extends React.Component {
    state = {
        quantity: "",
        available: false
      };
    currentView() {
        return (
            <View style={styles.container}>
              <View style={styles.viewContainer}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.goBackLabel}> Back to Tools </Text>
                </TouchableOpacity>
                <Text style={styles.programTitle}>
                    Edit Tool
                </Text>
                <Text>{this.props.route.params.name}</Text>
                <TextInput style={styles.textFillField} placeholder="Quantity" 
                                   value={this.state.quantity} 
                                   onChangeText={(value) => this.setState({quantity: value})} />
                <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.available ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitch}
                        value={this.state.available} />
                <TouchableOpacity style={styles.submitButton} title="Submit" onPress={() => {
                  if (this.state.quantity != "") {
                    editTool(this.state.quantity, this.state.available, this.props.route.params.toolID, this.props.route.params.name, this.props.route.params.AmountCheckedOut)
                    this.props.navigation.goBack();
                  } else {
                    alert('Quantity cannot be empty.');
                  }
                  }}>
                    <Text style={{textAlign: "center"}}>Submit</Text>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.addPostButton} onPress={() => { deleteToolLocal(this.props.route.params.toolID); this.props.navigation.goBack()}}>
                        <Text style={styles.addPostLabel}> Delete Tool </Text>
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