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
    toolsContainer: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },

    //Frames
    addToolFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 10,
        alignSelf: 'center',
        height: 50,
        width: 200,
        marginVertical: 10,
        marginHorizontal: 15,
        textAlign: 'center',
        justifyContent: 'center'
    },
    toolFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        alignSelf: 'center',
        height: Dimensions.get('window').height * 0.18,
        width:  Dimensions.get('window').width * 0.3,
        marginVertical: 10,
        marginHorizontal: 15,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    //Buttons
    dropdown1BtnStyle: {
        width: "50%",
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#444",
      },
      dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
      dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
      dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
      },
      dropdown1RowTxtStyle: { color: "#444", textAlign: "left"
    }
    //Text
    //TextInputs
    
    
    
})