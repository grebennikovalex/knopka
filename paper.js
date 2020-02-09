import React from 'react'
import { View, Text, FlatList, ImageBackground } from 'react-native'
import { globalStyles } from './globalstyle'
import WasteItem from './wasteitem'
import { wasteColors, paperType } from './wastetab'

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
        color: wasteColors[2]
    }

export default function Paper( { navigation } ) {
   
    const wastePress = (id) => {
        values.type = paperType[id-10].type
        values.id = paperType[id-10].id
        navigation.navigate('Orderform', {values: values})
    }
 
    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[2],  paddingTop: 10}]}>
            <ImageBackground 
            source = {require('./assets/knp_backG.png')}
            style = {{alignItems: 'center', height: '100%'}}
            imageStyle = {{resizeMode : 'repeat'}}>

            <View style = {globalStyles.headerWastes}>
            <Text style = {[globalStyles.icon, {fontSize: 25, paddingBottom: 5}]}>
                2
            </Text>
            
            <Text style = {[globalStyles.text, {paddingLeft: 12}]}>
                МАКУЛАТУРА
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>
            <FlatList
                numColumns = {2}
                data = {paperType}
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
            </ImageBackground>  
        </View>
    )
 }

 