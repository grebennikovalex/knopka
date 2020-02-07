import React from 'react'
import { View,  Text, FlatList } from 'react-native'
import { globalStyles } from './globalstyle'
import WasteItem from './wasteitem'
import { wasteColors, glassType } from './wastetab'

let values = {
    name: '',
    phone: '+7',
    email: '',
    address: '',
    floor: '',
    quantity: '',
    key: '',
    date: '',
    type: '',
    lift: '',
    color: wasteColors[0]
}

export default function Glass( { navigation } ) {
    

    const wastePress = (id) => {
        values.type = glassType[id].type
        values.id = glassType[id].id
        navigation.navigate('Orderform', {values: values})
    }
    
    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[0], paddingTop: 10}]}>
            <View style = {globalStyles.headerWastes}>
                <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5}]}>
                    1
                </Text>
            
            <Text style = {[globalStyles.text, {paddingLeft: 10}]}>
                СТЕКЛОБОЙ
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>
            <FlatList
                numColumns = {2}
                data = {glassType}
                keyExtractor = {item => item.id}
                renderItem = {({item}) => (
                    
                <WasteItem
                    id = {item.id}
                    wastePress = {wastePress}
                    item = {item}
                />
                )}
            />
            </View>
           
        </View>
    )
 }

