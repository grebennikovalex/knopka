import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { globalStyles } from './globalstyle'
import WasteItem from './wasteitem'
import { wasteColors } from './tab'
import OrderButton from './orderbutton'

//import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Paper( { navigation } ) {

    const [paperType, setPaper] = useState(
        [{ id: '0', type: 'ТИП 1', selected: false},
        { id: '1', type: 'ТИП 2', selected: false},
        { id: '2', type: 'ТИП 3', selected: false}]
    )

    const onPressWaste = (id) => setPaper((paperType) => {
        return paperType.map(paper => {
            if(paper.id === id) {
                if(paper.selected === false) paper.selected = true
                else if(paper.selected === true) paper.selected = false
            } 
            
            return paper
        })
    })

    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[2]}]}>
            <View style = {globalStyles.iconWrap}>
            <Text style = {[globalStyles.icon, {fontSize: 30}]}>
                2
            </Text>
            
            <Text style = {[globalStyles.text, {paddingLeft: 12}]}>
                БУМАГА
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>
            <FlatList
                data = {paperType}
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
            <OrderButton
            showMeWastes = {() => {
                console.log('ВАМ НУЖНО ВЫВЕЗТИ БУМАГУ ТИПА: ')
                paperType.map(paper => {
                    if(paper.selected === true) {
                        console.log(paper.type)
                    }
                })
                
            }}         />  
        </View>
    )
 }

 