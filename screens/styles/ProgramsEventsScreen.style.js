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
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },

    //Frames
    titleFrame: {
        backgroundColor: 'rgba(255,174,66,1)',
        borderRadius: 25,
        width: 350,
        minHeight: '20%',
        marginHorizontal: '2%',
        marginVertical: 14,
        textAlign: 'center',
        marginTop: 20,
    },
    programFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        alignSelf: 'center',
        width: 350,
        height: 'auto',
        minHeight: 100,
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    eventFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 25,
        width: 350,
        height: 'auto',
        minHeight: 150,
        marginHorizontal: '2%',
        marginBottom: 12,
        textAlign: 'center'
    },

    //Buttons
    goBackButton: {
        alignSelf: 'flex-start',
        marginLeft: '3%',
        marginTop: '15%'
    },
    leftButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 15,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        width: '30%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: '8%',
        marginBottom: '4%',
    },
    rightButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 15,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        width: '30%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: '8%',
        marginBottom: '4%',
    },
    submitButton: {
        backgroundColor: 'rgba(0,132,233,1)',
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.30,
        paddingVertical: '3%',
        marginVertical: '2%',
    },
    eventTitle: {
        fontSize: 24,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginTop: 15,
        marginVertical: '2%',
        fontWeight: 'bold'
    },
    eventInformation: {
        fontSize: 14,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '7%',
        marginVertical: '5%',
        marginBottom: 30
    },
    eventStartTime: {
        fontSize: 12,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '5%',
        marginTop: 10,
        marginBottom: 5
    },
    eventEndTime: {
        fontSize: 12,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '5%',
        marginBottom: 20
    },
    buttonLabelText: {
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    submitLabel: {
        fontWeight: 'bold',
        color: 'rgba(255,255,255,1)',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    

    //Text
    headerTitle: {
        fontSize: 24,
        marginTop: '2%',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 60,
        width: 200,
        marginTop: 50
    },
    programTitle: {
        textAlign: "center",
        paddingVertical: 20,
        fontSize: 36,
        fontWeight: 'bold',
        flexWrap: "wrap",
    },
    programInformation: {
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'top',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginBottom: 10
    },
    addEventLabel: {
        fontSize: 16,
        color: 'rgba(196,196,196,1)'
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