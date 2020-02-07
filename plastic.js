import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { globalStyles } from './globalstyle'
import WasteItem from './wasteitem'
import { wasteColors, plasticType } from './wastetab'

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
    color: wasteColors[1]
}


export default function Plastic( { navigation } ) {
  

    const wastePress = (id) => {
        values.type = plasticType[id-4].type
        values.id = plasticType[id-4].id
        navigation.navigate('Orderform', {values: values})
        }
  
    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[1],  paddingTop: 10}]}>
            <View style = {globalStyles.headerWastes}>
            <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5}]}>
                3
            </Text>
            <Text style = {[globalStyles.text, {paddingLeft: 12}]}>
                ПЛАСТИК
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>
            <FlatList
                numColumns = {2}
                data = {plasticType}
                keyExtractor = {item => item.id}
                renderItem = {({item}) => ( 
                
                <WasteItem
                    id = {item.id}
                    item = {item}
                    wastePress = {wastePress}
                />
                )}
            />
            </View>
           
        </View>
    )
 }

 