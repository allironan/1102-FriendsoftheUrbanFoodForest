import React, { Children } from 'react'
import ReactDOM from 'react-dom'
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, Dialog} from 'react-native'


export default class SingularProgram extends React.Component {
    // state = {
    //     details = this.props.route.params
    // }
    currentView() {
        return (
            <View>
                <Button title="Back to Programs" onPress={() => this.props.navigation.goBack()} />
                <Text>
                    {this.props.route.params.title}
                    {this.props.route.params.description}
                </Text>
            </View>
        );
    }
    render() {
        return this.currentView()
    }
}
