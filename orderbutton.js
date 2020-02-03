import React from 'react'
import { TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'



export default function OrderButton ({ showMeWastes, type }){

    

    return(

    <TouchableOpacity
    onPress = {showMeWastes}> 
    
    <View style = {{
        alignItems: 'center'
        }}>
        <Text style = {{fontSize: 80, fontFamily: 'knp', color: 'white', marginBottom: 10}}>
            0
        </Text>
        <Text style = {globalStyles.text}>
            ЗАКАЗАТЬ
        </Text>
        <Text style = {globalStyles.text}>
            ВЫВОЗ {type}
        </Text>

    
    </View>
    </TouchableOpacity>
    )

}
