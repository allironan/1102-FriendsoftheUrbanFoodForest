import React, { Children } from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import firebase from 'firebase/app'
import 'firebase/auth'
import deletePost from '../PostFunctions/deletePost'

export default function PostsScreen(postsData) {
        return (
        <View style={styles.postFrame} key={postsData.PostID}>
            <Text style={styles.postTitle}>{postsData.Title}</Text>
            <Text style={styles.postDate}>{postsData.Date}</Text>
            <Text style={styles.postContent}>{postsData.Contents}</Text>
                <TouchableOpacity 
                        style={styles.addPostButton}
                        onPress={() => deletePostLocal(postsData.PostID)}
                    >
                        <Text style={styles.addPostLabel}> Delete Post </Text>
                    </TouchableOpacity>
        </View>
        );
}

function deletePostLocal(postID){
    //console.log(postID)
    deletePost(postID);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    title: {
        textAlign: "center",
        padding: 20,
        marginBottom: 60,
        fontSize: 36,
        fontWeight: 'bold',
        flexWrap: "wrap"
    },
    addPostButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 8,
        alignSelf: 'flex-end',
        width: 100,
        paddingVertical: 10,
        marginHorizontal: '2%',
        marginBottom: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    addPostLabel: {
        fontSize: 16,
        color: 'rgba(196,196,196,1)'
    },
    postFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 25,
        width: 325,
        height: 'auto',
        minHeight: 150,
        marginHorizontal: '2%',
        marginBottom: 12,
        textAlign: 'center'
    },
    postTitle: {
        fontSize: 24,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginTop: 15,
        marginVertical: '2%',
        fontWeight: 'Bold'
    },
    postDate: {
        fontSize: 10,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginBottom: 20,
        color: 'rgba(196,196,196,1)'
    },
    postContent: {
        fontSize: 12,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginVertical: '5%',
        marginBottom: 30
    }
})