import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(233,243,196,1)'
    },
    title: {
        textAlign: "center",
        padding: 20,
        marginBottom: 20,
        maxWidth: 350,
        fontSize: 34,
        fontWeight: 'bold',
        flexWrap: "wrap"
    },
    titleFrame: {
        backgroundColor: 'rgba(164,116,73,1)',
        borderRadius: 25,
        flex: 1,
        padding: 10,
        maxHeight: 200,
        marginHorizontal: '2%',
        marginBottom: 12,
        textAlign: 'center'
    },
    button: {
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
    buttonLabel: {
        fontSize: 16,
        color: 'rgba(196,196,196,1)'
    },
    postFrame: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 25,
        alignSelf: 'flex-center',
        width: 350,
        height: 'auto',
        minHeight: 150,
        marginHorizontal: '2%',
        marginBottom: 12,
        textAlign: 'center'
    },
    postTitle: {
        fontSize: 24,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '7%',
        marginTop: 15,
        marginVertical: '2%',
        fontWeight: 'Bold'
    },
    postDate: {
        fontSize: 10,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '7%',
        marginBottom: 20,
        color: 'rgba(196,196,196,1)'
    },
    postContent: {
        fontSize: 12,
        textAlign: 'left',
        flexWrap: 'wrap',
        marginHorizontal: '7%',
        marginVertical: '5%',
        marginBottom: 30
    },
    postFeatureLabel: {
        fontSize: 14,
        textAlign: "right",
        marginRight: "7%",
        marginBottom: "4%",
    },
    textFillField: {
        backgroundColor: 'rgba(255,255,255,1)',
        alignSelf: 'center',
        width: 350,
        paddingVertical: 10,
        marginHorizontal: '10%',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})