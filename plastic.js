import React, { useState } from 'react'
import {View, Text, FlatList } from 'react-native'
import { globalStyles } from './globalstyle'
import WasteItem from './wasteitem'
import { wasteColors } from './tab'
import OrderButton from './orderbutton'

//import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Plastic( { navigation } ) {

    const [plasticType, setPlastic] = useState(
        [{ id: '0', type: 'ТИП 1', selected: false},
        { id: '1', type: 'ТИП 2', selected: false},
        { id: '2', type: 'ТИП 3', selected: false},
        { id: '3', type: 'ТИП 4', selected: false},
        { id: '4', type: 'ТИП 5', selected: false},
        { id: '5', type: 'ТИП 6', selected: false}]
    )

    const onPressWaste = (id) => setPlastic((placticType) => {
        return placticType.map(plastic => {
            if(plastic.id === id) {
                if(plastic.selected === false) plastic.selected = true
                else if(plastic.selected === true) plastic.selected = false
            } 
            
            return plastic
        })
    })

    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[1]}]}>
            <View style = {globalStyles.iconWrap}>
            <Text style = {[globalStyles.icon, {fontSize: 35}]}>
                3
            </Text>
            <Text style = {[globalStyles.text, {paddingLeft: 12}]}>
                ПЛАСТИК
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>
            <FlatList
                data = {plasticType}
                keyExtractor = {item => item.id}
                renderItem = {({item}) => (
                
                <WasteItem
                    id = {item.id}
                    onPressWaste = {onPressWaste}
                    item = {item}
                />
                )}
            />
            </View>
            <OrderButton/>  
        </View>
    )
 }

 