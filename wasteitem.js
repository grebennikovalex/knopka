import React from 'react'
import { View,  Text, TouchableOpacity } from 'react-native'
import { globalStyles } from './globalstyle'


export default function WasteItem ({id, onPressWaste, item}) {
    return(
        <TouchableOpacity 
            onPress = {() => onPressWaste(id)}>
        <View style = {[globalStyles.wasteItem, {backgroundColor: item.selected ? 'rgba(0, 0, 0, 0.2)' : 'transparent'}]}>
            <Text style = {globalStyles.text}>
                {item.type}
            </Text>
        </View>
        </TouchableOpacity>

    )
}