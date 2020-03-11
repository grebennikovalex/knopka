import React, { useState, useEffect }  from 'react'
import { View,  Text, FlatList, ImageBackground, ActivityIndicator } from 'react-native'
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
    color: wasteColors[0]
}

export default function Glass( { navigation } ) {

    const [glassType, setGlassType] = useState([])

    useEffect(() => {
        
                db.ref('/glassType').on('value', snapshot => {
                const glass = Object.values(snapshot.val())
                setGlassType(glass)
                })
    },[])    
    

    const wastePress = (id) => {
        values.type = glassType[id].type
        values.id = glassType[id].id
        values.price = glassType[id].price
        navigation.navigate('Orderform', {values: values})
    }
    
    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[0]}]}>
             <ImageBackground 
                    source = {require('./assets/knp_backG.png')}
                    style = {{alignItems: 'center', height: '100%', width: '100%'}}
                    imageStyle = {{resizeMode : 'repeat'}}>
            
            <LinearGradient
                        colors = {['transparent', wasteColors[0]]}
                        start = {[0, 0.85]}
                        end = {[0, 1.0]}>
            <View style = {globalStyles.headerWastes}>
                <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5}]}>
                    1
                </Text>
            
            <Text style = {[globalStyles.text, {paddingLeft: 10}]}>
                СТЕКЛОБОЙ
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>

            {!glassType.length ?

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
            }
            </View>
           
        </LinearGradient>
        </ImageBackground>
        </View>
    )
 }

