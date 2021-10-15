import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    programTitle: {
        textAlign: "center",
        padding: 20,
        marginBottom: 20,
        fontSize: 36,
        fontWeight: 'bold',
        flexWrap: "wrap"
    },
    programFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        alignSelf: 'flex-center',
        width: 350,
        height: 'auto',
        minHeight: 100,
        paddingVertical: 10,
        marginBottom: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    programInformation: {
        fontSize: 15,
        textAlign: 'left',
        textAlignVertical: 'top',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
    },
    goBackButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 8,
        alignSelf: 'flex-end',
        width: 100,
        paddingVertical: 10,
        marginHorizontal: '2%',
        marginBottom: 20,
        textAlign: 'left',
        textAlignVertical: 'center'
    },
    submitButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 8,
        alignSelf: 'flex-end',
        width: 100,
        paddingVertical: 10,
        marginHorizontal: '2%',
        marginBottom: 20,
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
        textAlign: 'left',
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
        fontWeight: 'Bold'
    },
    eventInformation: {
        fontSize: 10,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '8%',
        marginBottom: 20,
        color: 'rgba(196,196,196,1)'
    },
    attendButton: {

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
        marginBottom: 30
    }
})