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
    optionsContainer: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 350,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    storeContainer: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 350,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    fundraisingOption: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        height: 160,
        width: 150,
        marginVertical: '50%',
        marginHorizontal: 10,
        textAlign: 'center',
        justifyContent: 'center'
    },
    productFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        alignSelf: 'center',
        height: 145,
        width: 145,
        marginVertical: 10,
        marginHorizontal: 15,
        justifyContent: 'center'
    },
    productName: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    productDescription: {
        alignSelf: 'center',
    },
    productPrice: {
        alignSelf: 'center',
    },
    productFunctions: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 350,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    functionButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        height: 40,
        width: 145,
        marginVertical: 8,
        marginHorizontal: 15,
        textAlign: 'center',
        justifyContent: 'center'
    }
})