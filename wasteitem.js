import React from 'react'
import { View,  Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'


const d = Dimensions.get('screen').width * 0.4

export default function WasteItem ({id, onPressWaste, uncheckWaste, item }) {
    return(
        <View style = {globalStyles.wasteItem}>
                            
                    <View style = {{
                                
                                borderWidth: 1,
                                borderColor: 'white',
                                height: d,
                                width: d,
                                borderRadius: d / 2,
                                alignContent: 'center',
                                justifyContent: 'center',
                                backgroundColor: item.selected ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.4)'}}>
                    <TouchableOpacity 
                                onLongPress = {() => uncheckWaste(id)}
                                onPress = {() => onPressWaste(id)}>
                                <Image source = {wasteImage.wasteTypes[id]}
                                style = {{height: d, width: d}}/>            
                    </TouchableOpacity>   

                    </View>

                    <View style = {{
                                padding: 10, 
                                alignItems: 'center',
                                alignContent: 'flex-end', 
                                backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                                width: '100%',
                                marginTop: 10,
                                }}>
                        <Text style = {{
                                fontFamily: 'custom',
                                fontSize: 18,
                                color: 'white',
                                textShadowColor: 'rgba(0, 0, 0, 0.4)',
                                textShadowOffset: {width: 2, height: 2},
                                textShadowRadius: 15
                                }}>
                            {' ' + item.type + ' '}
                        </Text>
                        <Text style = {{fontSize: 15, color: 'black'}}>
                            {item.price}
                        </Text>
                    </View>
                

            

            {/* <TouchableOpacity>
                <View style = {[globalStyles.wasteAbout, {backgroundColor:'rgba(255, 255, 255, 0.2)'}]}>
                    <Text style = {[globalStyles.text, {fontSize: 30}]}>
                        ?
                    </Text>
                </View>
            </TouchableOpacity> */}
        </View>

    )
}

const wasteImage = {
    wasteTypes: {
        '0': require('./assets/waste-glass-0.png'),
        '1': require('./assets/waste-glass-1.png'),
        '2': require('./assets/waste-glass-2.png'),
        '3': require('./assets/waste-glass-3.png'),
        '4': require('./assets/waste-plastic-0.png'),
        '5': require('./assets/waste-plastic-1.png'),
        '6': require('./assets/waste-plastic-2.png'),
        '7': require('./assets/waste-plastic-3.png'),
        '8': require('./assets/waste-plastic-4.png'),
        '9': require('./assets/waste-plastic-5.png'),
        '10': require('./assets/waste-paper-0.png'),
        '11': require('./assets/waste-paper-1.png'),
        '12': require('./assets/waste-paper-2.png')
        
    }
}