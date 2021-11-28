import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
        width: 350,
        alignItems: 'flex-start',
        textAlign: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
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
        height: 120,
        width: 140,
        marginVertical: 10,
        marginHorizontal: 15,
        textAlign: 'center',
        justifyContent: 'center'
    },
})