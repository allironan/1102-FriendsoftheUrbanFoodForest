import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function ProgramComponent(props)  {
    return (
        <View style={styles.eventFrame} key={props.id}>
            <Text style={styles.eventTitle}>{props.title}</Text>
            <Text style={styles.eventDescription}>{props.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    eventFrame: {
        backgroundColor: 'rgba(242, 217, 128, 1)',
        borderRadius: 25,
        width: 325,
        height: 'auto',
        minHeight: 150,
        marginHorizontal: '2%',
        marginBottom: 12,
        textAlign: 'center'
    },
    eventTitle: {
        fontSize: 24,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginTop: 15,
        fontWeight: 'Bold'
    },
    eventDescription: {
        fontSize: 12,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginTop: 10,
        marginBottom: 30
    }
})