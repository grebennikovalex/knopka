import { StyleSheet, Dimensions } from 'react-native'



export const globalStyles = StyleSheet.create({

    container: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 25,
        
    },

    text: {

        
        fontFamily: 'custom',
        fontSize: 20,
        color: 'white',
        
    },
    
    icon:{
        
        fontFamily: 'knp',
        fontSize: 40,
        color: 'white',
        
    },

    wasteItem: {

        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: Dimensions.get('screen').width * 0.9,
        height: Dimensions.get('screen').width * 0.15,
        paddingLeft: 30,
        margin: 10,
        borderRadius: Dimensions.get('screen').width * 0.15 / 2,
        borderColor: 'white',
        borderWidth: 2,
        borderStyle: 'dotted',
        backgroundColor: 'transparent'

    },

    iconWrap: {
        width: Dimensions.get('screen').width * 0.9,
        height: Dimensions.get('screen').width * 0.15,
        marginTop: 20,
        marginBottom: 10,
        paddingLeft: 22,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: Dimensions.get('screen').width * 0.15 / 2,
        backgroundColor: 'transparent'

    },

    wasteListContainer: {
        height: Dimensions.get('screen').height * 0.35,
    }


    

})