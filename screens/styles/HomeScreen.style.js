import { StyleSheet, StatusBar, Dimensions } from "react-native";

export default StyleSheet.create({
    //Containers
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: '5%',
        width: '90%'
    },
    postOptions: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: '5%'
    },

    //Frames
    postFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 25,
        alignSelf: 'center',
        width: '90%',
        height: 'auto',
        minHeight: Dimensions.get('window').height * 0.2,
        marginHorizontal: '2%',
        marginBottom: '5%',
        textAlign: 'center'
    },

    //Buttons
    goBackButton: {
        alignSelf: 'flex-start',
        marginLeft: '3%',
        marginTop: '3%'
    },
    surveyButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 8,
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.045,
        marginHorizontal: '2%',
        marginBottom: 15,
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    addPostButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 15,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        width: '28%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: '8%',
        marginBottom: '4%',
    },
    deleteButton: {
        backgroundColor: 'rgba(234,71,71,1)',
        borderRadius: 8,
        width: '28%',
        height: '110%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    editButton: {
        backgroundColor: 'rgba(255,225,153,1)',
        borderRadius: 8,
        width: '28%',
        height: '110%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitButton: {
        backgroundColor: 'rgba(0,132,233,1)',
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.30,
        paddingVertical: '3%',
        marginVertical: '2%',
    },

    //Images
    logo: {
        resizeMode: 'stretch',
        height: 200 * 0.16,
        width: 286 * 0.16
    },

    //Text
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '1%',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 60,
        width: 200
    },
    surveyLabel: {
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    addPostLabel: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    postTitle: {
        fontSize: 24,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '7%',
        marginTop: 15,
        marginVertical: '2%',
        fontWeight: 'bold'
    },
    postDate: {
        fontSize: 10,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '7%',
        marginBottom: '0.5%',
        color: 'rgba(196,196,196,1)'
    },
    postContent: {
        fontSize: 12,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '7%',
        marginVertical: '3%',
        marginBottom: 45
    },
    postOptionLabel: {
        fontSize: 10,
        marginBottom: "4%",
    },
    submitLabel: {
        fontWeight: 'bold',
        color: 'rgba(255,255,255,1)',
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    //TextInputs
    titleFillField: {
        backgroundColor: 'rgba(255,255,255,1)',
        alignSelf: 'center',
        width: 350,
        paddingVertical: 10,
        marginHorizontal: '10%',
        marginVertical: '2%',
        borderRadius: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        flexWrap: 'wrap'
    },
    contentFillField: {
        backgroundColor: 'rgba(255,255,255,1)',
        alignSelf: 'center',
        width: 350,
        minHeight: 300,
        padding: 10,
        paddingVertical: 15,
        marginHorizontal: '10%',
        marginVertical: '2%',
        borderRadius: 20,
        textAlign: 'left',
        textAlignVertical: 'top',
        flexWrap: 'wrap'
    }
})