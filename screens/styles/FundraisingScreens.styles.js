import { StyleSheet, StatusBar, Dimensions } from "react-native";

export default StyleSheet.create({
    //Containers
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: StatusBar.currentHeight,
        alignItems: "center",
        backgroundColor: 'rgba(233,243,196,1)'
    },
    fundraisingOptionsContainer: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(233,243,196,1)',
    },
    storeFunctions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(233,243,196,1)',
        marginBottom: '5%'
    },
    productFunctions: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    storeScrollContainer: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(233,243,196,1)'
    },

    //Frames
    fundraisingOption: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        height: '25%',
        width: '40%',
        marginVertical: '50%',
        marginHorizontal: '2%',
        textAlign: 'center',
        justifyContent: 'center'
    },
    productFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        alignSelf: 'center',
        height: Dimensions.get('window').height * 0.18,
        width: Dimensions.get('window').width * 0.38,
        marginVertical: 10,
        marginHorizontal: 15,
        justifyContent: 'center'
    },
    cartFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        alignSelf: 'center',
        height: 145,
        width: Dimensions.get('window').width * 0.8,
        marginVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    

    //Buttons
    goBackButton: {
        alignSelf: 'flex-start',
        marginLeft: '3%',
        marginTop: '3%'
    },
    functionButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        height: 40,
        width: 145,
        marginVertical: 8,
        marginHorizontal: 15,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 15,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        width: '28%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginRight: '3%',
        marginTop: '3%',
        justifyContent: 'center'
    },
    addItemButton: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 15,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        width: '30%',
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '3%',
        marginBottom: 15,
    },

    //Text
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    fundraisingOptionLabel: {
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center'
    },
    addItemLabel: {
        fontSize: 12,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    productName: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    productDescription: {
        alignSelf: 'center',
        marginBottom: '2%'
    },
    productPrice: {
        alignSelf: 'center',
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