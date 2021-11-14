import React, {useState} from 'react'
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
  } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import 'firebase/firestore';
import firebase from 'firebase/app'
import _ from "lodash";

export default class UsersScreen extends React.Component {

    firestoreRef = firebase.firestore().collection('Users')

    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          users: null,
          searchText: "",
          filteredData: null,
        };
      }
    async componentDidMount(){
       this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection)
    }
    
    componentWillUnmount(){
        this.unsubscribe
    }

    getCollection = (querySnapshot) => {
        const users = []
        this.setState({loading: true})
        querySnapshot.forEach((user) => {
            users.push(user.data())
        })
        this.setState({users: users, filteredData: users ,loading: false})
    }

    handleSearch = (username) => {
        const query = username.toLowerCase();
        const userData = _.filter(this.state.users, (user) => {
            return user.Username.toLowerCase().includes(query)
        })
        this.setState({filteredData: userData, searchText: username})
    }

    renderSeparator = () => {
        return (
            <View
              style={{
                height: 1,
                width: "86%",
                backgroundColor: "#CED0CD",
                marginLeft: "14%",
              }}
            />
          );
    }

    renderHeader = () => {
        return (
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={(text) => this.handleSearch(text)}
            value= {this.state.searchText}
          />
        );
      };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
            style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#CED0CE",
            }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        // return (
        //     <Text>hi</Text>
        // )
        return (<SafeAreaView>
            <StatusBar style="light-content" />
                <FlatList
                data={this.state.filteredData}
                renderItem={({ item }) => (
                    <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{`${item.Username}`}</ListItem.Title>
                        <ListItem.Subtitle>{item.Email}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                    </ListItem>
                )}
                keyExtractor={(item) => item.Email}
                extraData={this.state}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                />
        </SafeAreaView>)
    }
}
