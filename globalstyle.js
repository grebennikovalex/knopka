import { StyleSheet, Dimensions } from 'react-native'



export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 28
        
    },

    ordercontainer: {
        flex: 1,
        width: Dimensions.get('screen').width * 0.9,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        marginTop: 10
     
    },

    text: {
        fontFamily: 'custom',
        fontSize: 18,
        color: 'white'
        
    },
    
    icon:{
        fontFamily: 'knp',
        fontSize: 40,
        color: 'white',
       
        
    },

    wasteItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width * 0.47,
        paddingTop: 10,
        marginLeft: 4,
        marginRight: 4,
        borderColor: 'white',
        

    },

    headerWastes: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').width * 0.1,
        marginTop: 20,
        marginBottom: 0,
        paddingLeft: 22,
        flexDirection: 'row',
        alignItems: 'flex-end',
      

    },

    wasteListContainer: {
        height: Dimensions.get('screen').height * 0.75,
        paddingLeft: 1,
        paddingRight: 1
    },

   
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width * 0.9,
        height: 50,
        margin: 10,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        borderStyle: 'dotted',
        backgroundColor:'rgba(255, 255, 255, 0.2)'
    
    },

    input: {
        alignSelf: 'center',
        fontSize: 20,
        width: '100%',
        height: 50,
        margin: 3,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor:'rgba(255, 255, 255, 0.5)',
        borderWidth: 0,
        borderRadius: 10,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        
    },

    inputFocused: {
        alignSelf: 'center',
        fontSize: 20,
        width: '100%',
        height: 56,
        margin: 0,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor:'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        borderWidth: 3, 
        borderColor:  '#778ca3' 
    },

    
    inputSmallContainer: {
        alignSelf: 'center',
        width: Dimensions.get('screen').width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'flex-start', 
    
    },

    orderheader: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        width: Dimensions.get('screen').width,
        height: 60,
        borderBottomColor: 'white',
        borderBottomWidth: 3,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor:'rgba(255, 255, 255, 0.3)',
        
    },

    modal: {
        height: 100,
        width: 100
    },

    textShadow: {
        fontFamily: 'custom', 
        fontSize: 25, 
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 7
    },

    initialInput: { 
        height:  Dimensions.get('screen').width * 0.1, 
        borderColor: 'gray', 
        borderWidth: 1, 
        paddingLeft: 10, 
        backgroundColor: 'white', 
        borderRadius: 10 
        
    }, 

    activeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#778ca3', 
        borderStyle: 'solid',
        height: Dimensions.get('screen').width * 0.1,
        margin: 10,
        borderColor: '#b2bec3',
        borderWidth: 2,
        borderRadius: 10
    
    },

    passiveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dfe6e9', 
        borderStyle: 'dotted',
        height: Dimensions.get('screen').width * 0.1,
        margin: 10,
        borderColor: '#dfe6e9',
        borderWidth: 2,
        borderRadius: 10
    }

    
                                        

})