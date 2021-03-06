import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, ImageBackground, ActivityIndicator } from 'react-native'
import { globalStyles } from './globalstyle'
import WasteItem from './wasteitem'
import { wasteColors } from './wastetab'
import { LinearGradient } from 'expo-linear-gradient'
import { db } from './config'

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

    const [plasticType, setPlasticType] = useState([])

    useEffect(() => {
        
                db.ref('/plasticType').on('value', snapshot => {
                const plastic = Object.values(snapshot.val())
                setPlasticType(plastic)
                })
    },[])    
  

    const wastePress = (id) => {
        values.type = plasticType[id-4].type
        values.id = plasticType[id-4].id
        values.price = plasticType[id-4].price
        navigation.navigate('Orderform', {values: values})
        }
  
    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[1], alignItems: 'stretch'}]}>
            <ImageBackground 
                    source = {require('./assets/knp_backG.png')}
                    style = {{alignItems: 'center', height: '100%', width: '100%'}}
                    imageStyle = {{resizeMode : 'repeat'}}>
            <LinearGradient
                        colors = {['transparent', wasteColors[1]]}
                        start = {[0, 0.85]}
                        end = {[0, 1.0]}>
            <View style = {globalStyles.headerWastes}>
            <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5}]}>
                3
            </Text>
            <Text style = {[globalStyles.text, {paddingLeft: 12}]}>
                ПЛАСТИК
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>

            {!plasticType.length ? 

            <ActivityIndicator
                    animating={true}
                    size = 'large'
                    color = 'white'
                    style = {{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 200
                    }}/>
                :
                    
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
            }
            </View>
            </LinearGradient>
            </ImageBackground>   
        </View>
    )
 }

 