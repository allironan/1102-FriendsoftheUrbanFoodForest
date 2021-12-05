import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
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
        width: 350,
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    goBackButton: {
        backgroundColor: 'rgba(8,39,245,1)',
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginTop: '4%',
        width: 150,
        textAlign: "center",
        paddingVertical: 8,
        textAlignVertical: 'center',
    },
    goBackLabel: {
        fontSize: 16,
        color: 'rgba(255,255,255,1)',
    },

    titleFrame: {
        backgroundColor: 'rgba(255,174,66,1)',
        borderRadius: 25,
        flex: 1,
        maxHeight: 200,
        width: 350,
        marginHorizontal: '2%',
        marginVertical: 14,
        textAlign: 'center',
        marginTop: 20,
    },

    programTitle: {
        textAlign: "center",
        paddingVertical: 20,
        fontSize: 36,
        fontWeight: 'bold',
        flexWrap: "wrap",
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
    programInformation: {
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'top',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginBottom: 10
    },
    leftButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 15,
        alignSelf: 'flex-start',
        width: 150,
        textAlign: "center",
        paddingVertical: 8,
        textAlignVertical: 'center',
        marginVertical: 5
    },
    submitButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 8,
        alignSelf: 'center',
        width: 100,
        paddingVertical: 10,
        marginHorizontal: '2%',
        marginVertical: 10,
        textAlign: 'left',
        textAlignVertical: 'center'
    },

    addEventButton: {
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
    addEventLabel: {
        fontSize: 16,
        color: 'rgba(196,196,196,1)'
    },

    eventFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
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
        marginVertical: '2%',
        fontWeight: 'bold'
    },
    eventInformation: {
        fontSize: 10,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginBottom: 20,
        color: 'rgba(196,196,196,1)'
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
    
    textFillField: {
        backgroundColor: 'rgba(255,255,255,1)',
        alignSelf: 'center',
        width: 350,
        paddingVertical: 10,
        marginHorizontal: '10%',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    buttonLabelText: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})