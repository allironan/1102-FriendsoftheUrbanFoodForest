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
    storeContainer: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 350,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    donationOption: {

    },
    storeOption: {
        
    },
    productFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        alignSelf: 'center',
        height: 145,
        width: 145,
        marginVertical: 10,
        marginHorizontal: 15
    },
    productName: {
        alignSelf: 'center',
        textAlignVertical: 'bottom'
    },
    productDescription: {
        alignSelf: 'center',
        textAlignVertical: 'center'
    },
    productPrice: {
        alignSelf: 'center',
        textAlignVertical: 'bottom'
    }
})