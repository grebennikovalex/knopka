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
        color: wasteColors[2]
    }


export default function Paper( { navigation } ) {

    const [paperType, setPaperType] = useState([])

    useEffect(() => {
        
                db.ref('/paperType').on('value', snapshot => {
                const paper = Object.values(snapshot.val())
                setPaperType(paper)
                })
    },[])    

                 
    const wastePress = (id) => {
        values.type = paperType[id-10].type
        values.id = paperType[id-10].id
        values.price = paperType[id-10].price
        navigation.navigate('Orderform', {values: values})
    }
       

    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[2] }]}>
            <ImageBackground 
                    source = {require('./assets/knp_backG.png')}
                    style = {{alignItems: 'center', height: '100%', width: '100%'}}
                    imageStyle = {{resizeMode : 'repeat'}}>
            <LinearGradient
                        colors = {['transparent', wasteColors[2]]}
                        start = {[0, 0.85]}
                        end = {[0, 1.0]}>
            <View style = {globalStyles.headerWastes}>
            <Text style = {[globalStyles.icon, {fontSize: 25, paddingBottom: 5}]}>
                2
            </Text>
            
            <Text style = {[globalStyles.text, {paddingLeft: 12}]}>
                МАКУЛАТУРА
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>

            {!paperType.length ?  

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
                    data = {paperType}
                    keyExtractor = {item => item.id}
                    renderItem = {({item}) => (
                    
                    <WasteItem
                        id = {item.id}
                        wastePress = {wastePress}                  
                        item = {item}
                    />
                    )}
                />}
           

          
            </View>
            </LinearGradient>
            </ImageBackground>  
        </View>
    )
 }

 