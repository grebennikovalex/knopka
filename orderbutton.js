import React from 'react'
import { TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'

export default function OrderButton (glassType){
    return(

    <TouchableOpacity> 
    
    <View style = {{
        alignItems: 'center', 
        justifyContent: 'center',
        height: Dimensions.get('screen').height * 0.35
        }}>
        <Text style = {{fontSize: 100, fontFamily: 'knp', color: 'white'}}>
            0
        </Text>
        <Text style = {globalStyles.text}>
            ВЫВЕЗТИ
        </Text>

    
    </View>
    </TouchableOpacity>
    )

}
