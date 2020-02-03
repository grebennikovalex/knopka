import React from 'react'
import { View,  Text, ImageBackground } from 'react-native'
import { globalStyles } from './globalstyle'


export default function Orderheader( { type, id } ) {
    
    return(
    <ImageBackground 
            source = {headerImage.wasteTypes[id]}
            style={{ resizeMode: 'stretch' }}>

        <View style = {[globalStyles.orderheader, {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                        }]}>
        <Text style = {[globalStyles.text,
                        {color: 'white',  
                        textShadowColor: 'rgba(0, 0, 0, 0.8)',
                        textShadowOffset: {width: -1, height: 1},
                        textShadowRadius: 15}]}>
                { ' ВЫВОЗИМ: ' + type + ' '}
        </Text>
        </View>
    </ImageBackground> 
    
    )
}

const headerImage = {
    wasteTypes: {
        '0': require('./assets/glass-0.png'),
        '1': require('./assets/glass-1.png'),
        '2': require('./assets/glass-2.png'),
        '3': require('./assets/glass-3.png'),
        '4': require('./assets/plastic-0.png'),
        '5': require('./assets/plastic-1.png'),
        '6': require('./assets/plastic-2.png'),
        '7': require('./assets/plastic-3.png'),
        '8': require('./assets/plastic-4.png'),
        '9': require('./assets/plastic-5.png'),
        '10': require('./assets/paper-0.png'),
        '11': require('./assets/paper-1.png'),
        '12': require('./assets/paper-2.png')
        
    }
}