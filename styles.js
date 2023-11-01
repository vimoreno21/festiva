import { StyleSheet } from 'react-native';
import Constants from './colors';

export const commonStyles = StyleSheet.create({
    blackBorder: {
        zIndex : 2,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 0,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowOffset: { width: 4, height: 4 },
        borderWidth: 1,
        borderColor: 'rgb(0.67, 0.66, 0.66)',
    },
    background: {
        zIndex: -1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        zIndex : 1,
        width: 259,
        height: 63,
        backgroundColor: Constants.Flax,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    buttonText: {
        zIndex : 2,
        fontSize: 18,
        color: 'black',
    },
    input: {
        zIndex : 2,
        width: 250,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    text: {
        fontFamily: 'Futura',
        zIndex: 2,
        fontSize: 36,
        color: 'black',
    },
});