import React, {useState} from 'react'
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Button
  } from "react-native";
import { ListItem, SearchBar, ButtonGroup } from "react-native-elements";
import 'firebase/firestore';
import firebase from 'firebase/app';
import _ from "lodash";
import styles from '../styles/SettingsScreen.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default class UsersScreen extends React.Component {
    firestoreRef = firebase.firestore().collection('Users')

    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          users: null,
          searchText: "",
          filteredData: null,
          selectedIndex: 2,
          buttonData: null,
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
        console.log(users)
        const adminData = this.state.users.map(user => user.Permissions == "admin")
        const buttonData = adminData.map(button => button ? 1 : 0)
        this.setState({buttonData: buttonData})
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
    changePermissions = (item) => {
      if (item.Permissions == 'admin') {
        this.state.users[this.state.users.indexOf(item)].Permissions = 'base'
        let uid  = this.state.users[this.state.users.indexOf(item)].UID
        const db = firebase.firestore();
        db.collection('Users').doc(uid).update({'Permissions': 'base'})
      } else {
        this.state.users[this.state.users.indexOf(item)].Permissions = 'admin'
        let uid  = this.state.users[this.state.users.indexOf(item)].UID
        const db = firebase.firestore();
        db.collection('Users').doc(uid).update({'Permissions': 'admin'})
      }
    }
    render() {
        return (<SafeAreaView>
            <StatusBar style="light-content" />
                <FlatList
                data={this.state.filteredData}
                renderItem={({ item }) => (
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={style.title}>{item.Username}</Text>
                    <View style={{flex:1, flexDirection: 'row-reverse'}}>
                        <Button title={item.Permissions} onPress={() => {this.changePermissions(item)}} />
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.Email}
                extraData={this.state}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                />
        </SafeAreaView>)
    }
}