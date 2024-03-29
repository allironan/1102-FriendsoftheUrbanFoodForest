import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
    //Containers
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    flexbox_container: {
        flexDirection: "row",
    },

    //Frames
    settingFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 10,
        width: '90%',
        paddingVertical: 20,
        marginHorizontal: '2%',
        marginTop: '8%',
        textAlign: 'left'
    },
    topSettingFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 10,
        width: 400,
        paddingVertical: 20,
        marginHorizontal: '2%',
        marginVertical: 10,
        textAlign: 'left',
        marginTop: 60,
    },
    choiceFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 10,
        width: 150,
        paddingVertical: 20,
        marginHorizontal: '2%',
        marginVertical: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    //Buttons
    goBackButton: {
        alignSelf: 'flex-start',
        marginLeft: '3%',
        marginTop: '3%'
    },

    //Text
    choiceText: {
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    settingFont: {
        marginLeft: 10
    },

    //TextInputs
    
    
    
})