import React, { useState } from 'react'
import { View,  Text, FlatList, TouchableOpacity } from 'react-native'
import { globalStyles } from './globalstyle'
import WasteItem from './wasteitem'
import { wasteColors } from './tab'
import OrderButton from './orderbutton'


//import Swipeable from 'react-native-gesture-handler/Swipeable';



export default function Glass( { navigation } ) {

    const [glassType, setGlass] = useState(
        [{id: '0', type: 'ТИП 1', selected: false },
        {id: '1', type: 'ТИП 2', selected: false },
        { id: '2', type: 'ТИП 3', selected: false},
        {id: '3', type: 'ТИП 4', selected: false}]
    )

    
    const onPressWaste = (id) => setGlass((glassType) => {
        return glassType.map(glass => {
            if(glass.id === id) {
                if(glass.selected === false) glass.selected = true
                else if(glass.selected === true) glass.selected = false
            } 
            
            return glass
        })
    })
    


    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[0]}]}>
            <View style = {globalStyles.iconWrap}>
                <Text style = {[globalStyles.icon, {fontSize: 40}]}>
                    1
                </Text>
            
            <Text style = {[globalStyles.text, {paddingLeft: 10}]}>
                СТЕКЛО
            </Text>
            </View>
           <View style = {globalStyles.wasteListContainer}>
            <FlatList
                data = {glassType}
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
                        console.log('ВАМ НУЖНО ВЫВЕЗТИ СТЕКЛО ТИПА: ')
                        glassType.map(glass => {
                            if(glass.selected === true) {
                                console.log(glass.type)
                            }
                        })
                        
                    }}         
                />   
        </View>
    )
 }

