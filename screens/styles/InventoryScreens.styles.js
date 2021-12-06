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
        width: 350,
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    invFunctionsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(233,243,196,1)',
        marginBottom: '2%',
        marginTop: '5%'
    },
    toolsContainer: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(233,243,196,1)'
    },

    //Frames
    invFunctionFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 10,
        alignSelf: 'center',
        height: 50,
        width: '30%',
        marginVertical: 10,
        marginHorizontal: 15,
        textAlign: 'center',
        justifyContent: 'center'
    },
    toolFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        height: Dimensions.get('window').height * 0.18,
        width:  Dimensions.get('window').width * 0.4,
        marginVertical: 10,
        marginHorizontal: 15,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    //Buttons
    goBackButton: {
        alignSelf: 'flex-start',
        marginLeft: '3%',
        marginTop: '4%'
    },
    dropdown1BtnStyle: {
        width: "50%",
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 8,
      },
      dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
      dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
      dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
      },
      dropdown1RowTxtStyle: { color: "#444", textAlign: "left"
    },
    submitButton: {
        backgroundColor: 'rgba(0,132,233,1)',
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.30,
        paddingVertical: '3%',
        marginVertical: '2%',
    },
    deleteButton: {
        backgroundColor: 'rgba(234,71,71,1)',
        borderRadius: 8,
        width: Dimensions.get('window').width * 0.30,
        paddingVertical: '3%',
        marginVertical: '2%',
    },
    functionButton: {
        backgroundColor: 'rgba(255,225,153,1)',
        borderRadius: 8,
        marginTop: '3%',
        width: '50%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    //Text
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: '2%'
    },
    invFunctionLabel: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    toolName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    toolInfo: {
        fontSize: 13,
        textAlign: 'center',
        textAlignVertical: 'center'
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
        width: '50%',
        paddingVertical: 10,
        marginHorizontal: '10%',
        marginVertical: '2%',
        borderRadius: 8,
        textAlign: 'center',
        textAlignVertical: 'center',
        flexWrap: 'wrap'
    },
    contentFillField: {
        backgroundColor: 'rgba(255,255,255,1)',
        alignSelf: 'center',
        width: '50%',
        paddingVertical: 10,
        marginHorizontal: '10%',
        marginVertical: '4%',
        borderRadius: 8,
        textAlign: 'center',
        textAlignVertical: 'center',
        flexWrap: 'wrap'
    }
})